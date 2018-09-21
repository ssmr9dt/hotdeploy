# hotdeploy

Hotdeploy can update and apply the file being read with require during execution.

hotdeployは実行中にrequireで読んでいるファイルを更新と適用が行えます。

## Usage

```bash
npm i ssmr9dt/hotdeploy
```

Please reference test/example.js

```javascript
const hotdeploy = require("@ssmr9dt/hotdeploy.js");
var commands = {};

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
```

```bash
echo "module.exports = function(){console.log(\"execute red.js\")};" > server.d/red.js
```

