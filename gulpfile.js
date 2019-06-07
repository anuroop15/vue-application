const fs = require("fs");
const path = require('path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

const { src, dest, series } = require("gulp");
var ejs = require("gulp-ejs")

const loadEnv = (mode) => {
    const basePath = path.resolve('./', `.env${mode ? `.${mode}` : ``}`)
    const localPath = `${basePath}.local`

    const load = path => {
      try {
        const env = dotenv.config({ path, debug: process.env.DEBUG })
        dotenvExpand(env)
      } catch (err) {
        // only ignore error if file is not found
        if (err.toString().indexOf('ENOENT') < 0) {
          // eslint-disable-next-line no-console
          console.log(err)
        }
      }
    }

    load(localPath)
    load(basePath)

    // by default, NODE_ENV and BABEL_ENV are set to "development" unless mode
    // is production or test. However the value in .env files will take higher
    // priority.
    if (mode) {
      // always set NODE_ENV during tests
      // as that is necessary for tests to not be affected by each other
      const shouldForceDefaultEnv = (
        process.env.VUE_CLI_TEST &&
        !process.env.VUE_CLI_TEST_TESTING_ENV
      )
      const defaultNodeEnv = (mode === 'production' || mode === 'test')
        ? mode
        : 'development'
      if (shouldForceDefaultEnv || process.env.NODE_ENV == null) {
        process.env.NODE_ENV = defaultNodeEnv
      }
      if (shouldForceDefaultEnv || process.env.BABEL_ENV == null) {
        process.env.BABEL_ENV = defaultNodeEnv
      }
    }
  }



const deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const getFileNameRecursive = function(path, files){
    if(fs.existsSync(path)){
        files = files || []
        fs.readdirSync(path).forEach(function(file) {
            if(fs.lstatSync(`${path}/${file}`).isDirectory()){
                getFileNameRecursive(`${path}/${file}`, files)
            }else {
                /.manifest.js/.test(file)? files.push({
                  path:(`${path}/${file}`).replace(/dist-virginia\//,''),
                  id: file.replace(/.manifest.js/,'')
                }): null
            }
        })
    }
    return files;
}

async function loadEnvironmentLocal(){
    await loadEnv('local');
    await Promise.resolve("done");
}

async function loadEnvironmentPro(){
    await loadEnv('production');
    await Promise.resolve("done");
}

async function renderIndexF2(){
    let apps = await getFileNameRecursive("./dist-virginia/apps");
    return src("f2/index.html")
    .pipe(ejs({
        APPS:apps
    }))
    .pipe(dest("dist-virginia/"))
}

async function clean() {
  await deleteFolderRecursive("./dist-virginia");
  await Promise.resolve("done");
}

function moveFromDist() {
  let options = {
    ignore: ["dist/*.html", "dist/**/index.*"]
  };
  return src("dist/**/*", options).pipe(dest("dist-virginia/"));
}

function moveFromF2() {
  return src("f2/**/*").pipe(dest("dist-virginia"));
}

function renderF2App(){
    return src("f2/apps/**/*.manifest.js")
    .pipe(ejs({
        BASE_URL: process.env.VUE_APP_BASE_URL
    }))
    .pipe(dest("dist-virginia/apps"))
}

/** To run default task (it will use .env.producion)
 * npm run gulp 
 */
exports.default = series(loadEnvironmentPro, clean, moveFromDist, moveFromF2, renderF2App, renderIndexF2);
/** To run local task (it will use .env.local)
 * note: /env.local is ignore by git
 * npm run gulp local
 */
exports.local = series(loadEnvironmentLocal, clean, moveFromDist, moveFromF2, renderF2App, renderIndexF2)