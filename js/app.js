angular.module('app', ['ui.bootstrap'])

	.controller('MainController', function($scope, $modal, $interval) {

		$scope.timer1 = 50;
		$scope.timer2 = 30;
		$scope.timer3 = 20;

		$scope.onStart = function(time) {
			window.alert('started at ' + time);
		};

		$scope.showModal = function() {
			$modal.open({
				templateUrl: 'views/myModal.html',
				controller: 'ModalController'
			}).result.then(function(user) {
				$scope.user = user;
			});
		};
	})

	.controller('ModalController', function($scope, $modalInstance) {
		$scope.cancel = function() {
			$modalInstance.dismiss();
		};

		$scope.save = function() {
			var user = {
				first_name: 'Ryan',
				last_name: 'Eballar'
			};

			$modalInstance.close(user);
		};
	})

	.run(function($templateCache) {
		$templateCache.put('tuts-timer.html', [
			'{{label}}',
			'<div class="btn btn-default" ng-click="start()">Start</div>',
			'<div class="btn btn-default" ng-click="pause()">Pause</div>',
			'<div class="btn btn-default" ng-click="end()">End</div>',
			'{{time}}'
		].join(''));
	})

	.directive('tutsTimer', function() {
		return {
			restrict: 'E',
			templateUrl: 'tuts-timer.html',
			scope: {
				time: '=',
				onStart: '&',
				label: '@'
			},
			controller: function($scope, $interval) {
				var intervalPromise;

				$scope.start = function() {
					$scope.pause();
					$scope.onStart({
						time: $scope.time
					});
					intervalPromise = $interval(function() {
						$scope.time++;
					}, 100);
				};
				
				$scope.pause = function() {
					$interval.cancel(intervalPromise);
				};

				$scope.end = function() {
					$scope.pause();	
					$scope.time = 0;
				};
			}
		};
	});