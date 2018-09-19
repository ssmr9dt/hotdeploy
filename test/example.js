const hotdeploy = require(__dirname + "/../hotdeploy.js");

var commands = {};

// 1. cd test/
// 2. node example.js
// 3. echo "module.exports = function(){console.log(\"execute red.js\")};" > server.d/red.js

(function _Exec(){
  setTimeout(_Exec, 1000);
  
  hotdeploy(__dirname + "/server.d/*.js", function(key, module){
    console.log("Reload ",key);
    commands[key] = module || null;
  });
  
  for (var key in commands) {
    if (!!!commands[key] || typeof(commands[key]) !== "function") {
      continue;
    }
    commands[key]();
  }
})();


