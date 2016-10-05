app.directive('d3Bars',function($parse){
  return {
    restrict: 'EA',
    scope:{
      data: "=",
      label: "@",
    },
    link: function(scope, iElement, iAttrs) {
      console.log('directive worked');
        var svg = d3.select(iElement[0])
            .append("svg")
            .attr("class","bar" + " " + scope.label)
            .attr("width", "200");
        window.onresize = function(){
          return scope.$apply();
        };
        scope.$watch(function(){
          return angular.element(window)[0].innerWidth;
        }, function(){
          return scope.render(scope.data);
        });

        scope.$watch('data', function(newData, oldData){
          return scope.render(newData);
        }, true);

        scope.render = function(data){
          d3.selectAll("svg."+scope.label+" > *").remove();

          var width, height, max;
          width = d3.select(iElement[0])[0][0].offsetWidth;
          height = 20;
          max = 200;
          svg.attr('height', height);

          svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .style({
              fill:"red"
            })
            .attr("height", 18)
            .attr("width", 1)
            .attr("x", 1)
            .attr("y", 1)
            .transition()
            .duration(10)
            .attr("width", function(d){
              console.log(d);
               return d * 2 / (max / width);
            });

          svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "white")
            .attr('y', 15)
            .attr('x', 2)
            .text(function(d){
              return scope.label;
            })


        }


    }
}
})
