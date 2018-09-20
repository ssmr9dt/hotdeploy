const hotreload = require("@ssmr9dt/hotreload"),
      glob = require("glob"),
      path = require("path"),
      fs   = require("fs");


module.exports = function(dir, cb) {
  if (dir.length-1 !== dir.lastIndexOf("/")) { // required fix - for windows
    dir += "/";
  }
  var reload = function(filename, cb) {
    const key = path.basename(filename,path.extname(filename));
    hotreload(filename, function(error, module){
      cb(key, module);
    });
  };
  glob(dir + "/*", {"nodir": true}, function(err, files){
    if (!!err) { return; }
    files.forEach(function(element, index, array){
      reload(element, cb);
    });
  });
  
  fs.watch(dir, function(event, filename){
    var abspath = dir+filename; // required fix - smart
    reload(abspath, cb);
  });
  
  // if (!!iID) {
  //   clearInterval(iID);
  //   iID = null;
  // }
  
  // iID = setInterval(function(){
  //   glob(pattern, function(err, files){
  //     if (!!err) { return; }
  //     files.forEach(function(element, index, array){
  //       var key = path.basename(element,path.extname(element));
  //       cfiles[key] = { "path": element, "watch": false };
  //     });
  //   });
    
  //   for (var key in cfiles) {
  //     if (cfiles[key].watch === true) { continue; }
  //     fs.watch(cfiles[key].path, function(event, filename){
  //       hotreload(cfiles[key].path, function(error, module){
  //         console.log(event, filename);
  //         cb(key, module);
  //         if (!!!module) {
  //           cfiles[key] = null;
  //         }
  //       });
  //     });
  //     cfiles[key].watch = true;
  //   }
  // },ms);
};
