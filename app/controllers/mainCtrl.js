app.controller('MainCtrl', function($scope, processService, $websocket) {
  $scope.processes = processService.getData().items;;
  processService.onChange(function(data) {
    $scope.processes = data.items;
    $scope.$apply();
  });

  $scope.detailPID = 1;


  $scope.propertyName = 'PID';
  $scope.reverse = true;
  $scope.sortBy = function(propertyName){
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };
  $scope.kill = function(process){
    processService.killProcess(process.PID)
  }
  $scope.getDetail = function(process, index){
    $scope.selectedRow = index;
    $scope.detailPID = process.PID;
    processService.monitorDetail(function(data){
      if(data.pid === $scope.detailPID){
        $scope.detail =data;
      }

    },process.PID)
  }

  $scope.selectedRow = null;
});
