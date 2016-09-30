var app = angular.module('processApp',['ngWebSocket']);
app.filter('num', function() {
    return function(input) {
      return parseInt(input);
    };
});
