const hotreload = require("@ssmr9dt/hotreload"),
      glob = require("glob"),
      path = require("path");

module.exports = function(pattern, cb) {
  glob(pattern, function(err, files){
    if (!!err) { return; }
    files.forEach(function(element, index, array){
      var key = path.basename(element,path.extname(element));
      hotreload(element, function(error, module){
        cb(key, module);
      });
    });
  });
};
