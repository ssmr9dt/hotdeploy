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

(function _Exec(){
  setTimeout(_Exec, 1000);
  
  hotdeploy(__dirname + "/server.d/*.js", function(key, module){
    console.log("Reload ",key);
    commands[key] = module || null;
  });
  
  for (var key in commands) {
    commands[key]();
  }
})();
```

```bash
echo "module.exports = function(){console.log(\"execute red.js\")};" > server.d/red.js
```

