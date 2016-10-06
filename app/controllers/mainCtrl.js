app.controller('MainCtrl', function($scope, processService, $websocket) {
  $scope.processes = processService.getData().items;;

  processService.onChange(function(data) {
    $scope.processes = data.items;
    $scope.$apply();
  });

  $scope.detailPID = 1;

  $scope.propertyName = 'PID';
  $scope.reverse = false;
  $scope.sortBy = function(propertyName){
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  $scope.kill = function(process){
    processService.killProcess(process)
  }
  $scope.getDetailPID = function(process){
    $scope.detailPID = process.PID;
  }
  $scope.getDetail = function(){
    $scope.detail = $scope.processes.filter(function(data){
      return data.PID === $scope.detailPID
    });

    $scope.detailData = {
      cpu: [],
      mem: {
        prc:[],
        kb: []
      },
      user: '',
      cmd: ''
    };

    var mem = $scope.detail[0]['%MEM'];
    mem = mem.split("  ")

    $scope.detailData.cpu.push($scope.detail[0]['%CPU']);
    $scope.detailData.mem.prc.push(mem[0]);
    $scope.detailData.mem.kb.push(mem[1]);
    $scope.detailData.user = $scope.detail[0]['USER'];
    $scope.detailData.cmd = $scope.detail[0]['COMMAND'];

  }

  $scope.$watch('processes', function(newVal, oldVal){
    $scope.getDetail()
  }, true);
  
});
