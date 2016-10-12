angular
.module('processApp')
.service('processService', function () {
  self = this;
  var socket = io.connect('http://192.81.220.97:3000');
  // var socket = io.connect('http://localhost:3000');

  var _listeners = [];

  var _data = {
    items : [],
  };

  var _detail ={};

  this.onChange = function(fn) {
    _listeners.push(fn);
  }

  this.setData = function(data) {
    _data = data;

    _listeners.forEach(function(listener) {
      listener(data);
    });
  }

  this.getData = function() {
    return _data;
  }

  socket.on('data', function(data){
    data = data.map(function(item){
      console.log(item);
      item.PID =  parseInt(item.PID[1]);
      item.USER = item.USER[0];
      item['%CPU'] = item['%CPU'][0];
      item['%MEM'] = item['%MEM'][0];
      item.COMMAND = item.COMMAND.join(' ');
      item.TIME = item.TIME[0];
      return item;
    });
    self.setData({ items : data });
  });

  this.killProcess = function(process){
    socket.emit('kill', process)
  }
  socket.on('msg', function(msg){
    console.log("msg " + msg);
  })

});
