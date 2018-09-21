const hotdeploy = require(__dirname + "/../hotdeploy.js");

var commands = {};

hotdeploy(__dirname + "/server.d", function(key, module){
  console.log("Reload", key);
  commands[key] = module || null;
});

setTimeout(function(){
  hotdeploy(__dirname + "/server.d2", function(key, module){
    console.log("Reload", key, "from no2");
    commands[key] = module || null;
  });
},5000);

(function _Exec(){
  setTimeout(_Exec, 1000);
  
  for (var key in commands) {
    if (!!!commands[key] || typeof(commands[key]) !== "function") {
      continue;
    }
    commands[key]();
  }
})();




