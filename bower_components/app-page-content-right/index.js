var readline = require('readline');
var fs = require('fs');
var clc = require('cli-color');
var replace = require("replace");
var FP = require('filepath');
const del = require('del');


console.log(clc.green("============================================="));

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
  //process.stdout.write('data: ' + chunk);
});

function ask(question, format, callback) {
  var stdin = process.stdin, stdout = process.stdout;

  stdin.resume();
  stdout.write(question + ": ");

  stdin.once('data', function (data) {
    data = data.toString().trim();

    if (format.test(data)) {
      console.log("Name of component: ", data);
      console.log(clc.green(data + " is a correct name \n"));
      callback(data);
    } else {
      console.log(clc.red("Name of component: ", data));
      console.log(clc.red("the name must be separated by - \n"));
      console.log(clc.red("Please enter a new name (example: component-modal-fade)"));
      ask(question, format, callback);
    }
  });
}

// Se le pregunta al usuario por el nombre del componente
ask(">> What's the name of your component?", /^.+-.+$/, function (componentName) {
  replaceFiles(componentName);
});

// Se sustituye en el archivo index.html component-name por el nombre del componente
  function replaceFiles(name) {
  console.log(clc.green("Creating component " + name));

  // Se reemplaza el nombre del archivo component-name.html por el nombre del componente
  fs.rename('./component-name.html', './' + name + '.html', function (err) {
    if (err) console.log('ERROR: ' + err);
  });
  // Se reemplaza el nombre del archivo component-name.scss por el nombre del componente
  fs.rename('./component-name.scss', './' + name + '.scss', function (err) {
    if (err) console.log('ERROR: ' + err);
  });
  // Se reemplaza el nombre del archivo component-name-styles.html por el nombre del componente
  fs.rename('./component-name-styles.html', './' + name + '-styles.html', function (err) {
    if (err) console.log('ERROR: ' + err);
  });
  // Se reemplaza el nombre del archivo dist/css/component-name.css por el nombre del componente
  fs.rename('./dist/css/component-name.css', './dist/css/' + name + '.css', function (err) {
    if (err) console.log('ERROR: ' + err);
  });
  // Se reemplaza el nombre del archivo component-name.js por el nombre del componente
  fs.rename('./component-name.js', './' + name + '.js', function (err) {
    if (err) console.log('ERROR: ' + err);
  });
  

  // Se reemplaza en todos los sitios donde aparece component-name por el nombre del componente
  replace({
    regex: "component-name",
    replacement: name,
    paths: ['./index.html', './'+name+'.html', './'+name+'.scss', './'+name+'-styles.html', './'+name+'.js', './bower.json', './demo/index.html', './README.md', 'gulpfile.js'],
    recursive: true,
    silent: false,
  });
  del(['./.git']).then(paths => {
      console.log('Deleted git files', paths.join('\n'));
  });
  console.log("--------------------------------------------- \n");
  console.log(clc.green("the component " + name + "  has been created succesfully"));

  process.exit();
}