angular
.module('processApp')
.service('processService', function () {
  self = this;
  // var socket = io.connect('http://192.81.220.97:3000');
  var socket = io.connect('http://localhost:3000');

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
      item.PID =  parseInt(item.PID);
      return item;
    });
    self.setData({ items : data });
  });

  this.killProcess = function(pid){
    socket.emit('kill', pid)
  }
  this.monitorDetail =function(cb,pid){
    socket.emit('detail', pid)
    socket.on('detail', function(data){
       cb(data);
    })
  }
  // function mockGenerator() {
  //   var newItems = [];
  //
  //   for (var i = 0; i <= Math.random() * 100; i++) {
  //     newItems.push(
  //       generateRandomProcess()
  //     );
  //   }
  //
  //   this.setData({ items : newItems });
  //
  //   setTimeout(
  //     mockGenerator.bind(this),
  //     Math.random() * 20000
  //   );
  // }
  //
  // function generateRandomProcess() {
  //   var users = ['root','system'];
  //   var commands = ['firefox', 'chrome', 'gnome-terminal','init'];
  //
  //   return {
  //     pid: Math.floor((Math.random() * 100) + 1),
  //     CPU: Math.floor((Math.random()) + 1),
  //     user: users[ Math.floor(Math.random() * users.length) ],
  //     command: commands[ Math.floor(Math.random() * commands.length) ],
  //   };
  // }
  //
  // mockGenerator.call(this);
});
