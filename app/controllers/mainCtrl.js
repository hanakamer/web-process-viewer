app.controller('MainCtrl', function($scope, processService, $websocket) {
  $scope.processes = processService.getData().items;;
  processService.onChange(function(data) {
    $scope.processes = data.items;
    $scope.$apply();
  });

  $scope.propertyName = 'PID';
  $scope.reverse = true;
  $scope.sortBy = function(propertyName){
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };
});
