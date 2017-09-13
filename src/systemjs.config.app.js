System.config({
  paths: {
    // paths serve as alias
    'npm:': '/js/node_modules/',
  },

  // map tells the System loader where to look for things
  map: {
    // our app is within the app folder
    app: '/src/client/app/app.js',

    // angular bundles
    '@angular/animations': 'npm:@angular/animations/bundles/core.umd.js',
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

    // other libraries
    rxjs: 'npm:rxjs',
    tslib: 'npm:tslib/tslib.js',
    'ng2-codemirror': 'npm:ng2-codemirror/lib',
    'codemirror/mode': 'npm:codemirror/mode',
    codemirror: 'npm:codemirror/lib',
    'angular-2-local-storage': 'npm:angular-2-local-storage/dist',
  },

  // packages tells the System loader how to load when no filename and/or no extension
  packages: {
    '/src': {
      defaultExtension: 'js',
    },
    '/js': {
      defaultExtension: 'js',
    },
    '/js/node_modules/ng2-codemirror/lib': {
      main: 'index.js',
    },
    '/js/node_modules/codemirror/lib': {
      main: 'codemirror.js',
    },
    '/js/node_modules/angular-2-local-storage/dist': {
      main: 'index.js',
      defaultExtension: 'js',
    },
  },
});

System.import('app')
.then(undefined, console.error.bind(console));
