app.controller('MainCtrl', function($scope, processService, $websocket) {
  $scope.detailPID = '';
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
  $scope.getDetailPID = function(process){
    $scope.detailPID = process.PID;
  }
  $scope.getDetail = function(){
    $scope.detail = $scope.processes.filter(function(data){
      return data.PID === $scope.detailPID
    });
    $scope.cpuData = { data: []};
    $scope.cpuData.data.push($scope.detail[0]['%CPU']);
    $scope.memData = { data: [], kb:[]};
    var mem = $scope.detail[0]['%MEM'];
    mem = mem.split("  ")
    $scope.memData.data.push(mem[0]);
    $scope.memData.kb.push(mem[1]);
  }


  $scope.$watch('processes', function(newVal, oldVal){
    $scope.getDetail()
  }, true);

  

});
