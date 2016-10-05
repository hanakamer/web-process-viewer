app.directive('circleArea', function($parse){
  console.log('chart directive worked');

  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {data: '=chartData'},
    link: function(scope, element, attrs){
      var colors = ["#00ACE4", "#00D8A5", "#9b59b6", "#F1B719", "#e74c3c"]
      var chart = new Fancychart(200, 120, colors, '#e5e5e5');
      var data = scope.data;

      function drawChart(data){
        d3.select(" #circleChart svg").remove();
        chart.circles("#circleChart", data, colors[4]);
      };
      drawChart(data);
      scope.$watch('data', function(newValue){
        drawChart(newValue);
      }, true);


    }
  }
  return directiveDefinitionObject;
})
