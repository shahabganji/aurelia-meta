import * as gulp from "gulp";
import {
  pluginMarkupAMD,
  pluginMarkupCommon,
  pluginMarkupES2015,
  pluginMarkupSystem
} from "./process-markup";
import {
  pluginCSSAMD,
  pluginCSSCommon,
  pluginCSSES2015,
  pluginCSSSystem,
  pluginScssAMD,
  pluginScssCommon,
  pluginScssES2015,
  pluginScssSystem
} from "./process-css";
import {
  transpilePluginCommon,
  transpilePluginAMD,
  transpilePluginSystem,
  transpilePluginES2015
} from "./transpile";
import * as del from "del";
// @ts-ignore
import * as project from "../aurelia.json";


var path = require('path');
var gulpCopy = require("gulp-copy");


function clean() {
  return del(project.plugin.output);
}


function copyREADME() {

  const files = project.plugin.source.files.map(file => {
    return path.join(__dirname, '..', '..', file);
  });

  const dist = path.join(__dirname, '..', '..', project.plugin.output);

  files.forEach(file => {
    console.log('\x1b[34m%s\x1b[37m%s\x1b[34m%s\x1b[37m%s\x1b[0m','Copy file ', file, ' to ', dist)
    gulp.src(file).pipe(gulpCopy(dist, { prefix: 2 }));
    console.log( '\x1b[32m%s\x1b[37m%s\x1b[32m%s\x1b[0m' , 'File ', file, ' copied');
  });
}

export default gulp.series(
  clean,
  gulp.parallel(
    pluginMarkupAMD,
    pluginCSSAMD,
    transpilePluginAMD,
    pluginScssAMD,

    pluginMarkupCommon,
    transpilePluginCommon,
    pluginCSSCommon,
    pluginScssCommon,

    pluginMarkupES2015,
    transpilePluginES2015,
    pluginCSSES2015,
    pluginScssES2015,

    pluginCSSSystem,
    pluginMarkupSystem,
    transpilePluginSystem,
    pluginScssSystem
  )
);
