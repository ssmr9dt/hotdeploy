const hotdeploy = require(__dirname + "/../hotdeploy.js");

var commands = {};

// 1. node test/example.js
// 2. echo "module.exports = function(){console.log(\"execute red.js\")};" > server.d/red.js

hotdeploy(__dirname + "/server.d", function(key, module){
  console.log("Reload", key);
  commands[key] = module || null;
});

(function _Exec(){
  setTimeout(_Exec, 1000);
  
  for (var key in commands) {
    if (!!!commands[key] || typeof(commands[key]) !== "function") {
      continue;
    }
    commands[key]();
  }
})();


