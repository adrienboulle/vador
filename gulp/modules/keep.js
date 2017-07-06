const Transform = require('readable-stream/transform');
const readline = require('readline');
const path = require('path');

const TS_START_RE = /[ ]*\/\/ (KEEP|NGFACTORY)-START-([a-zA-Z_-]+:[a-zA-Z_-|]+)/;
const EJS_START_RE = /[ ]*<!--(KEEP|NGFACTORY)-START-([a-zA-Z_-]+:[a-zA-Z_-|]+)-->/;

const TS_END_RE = /\/\/ (KEEP|NGFACTORY)-END/;
const EJS_END_RE = /[ ]*<!--(KEEP|NGFACTORY)-END-->/;

module.exports = {
  all: gulp => () =>
    gulp.src(['.build/private/src/**/*.ts', '.build/private/src/**/*.ejs'])
    .pipe((() =>
        new Transform({
          objectMode: true,
          transform: (file, enc, callback) => {
            const lines = file.contents.toString().split(/(?:\r\n|\r|\n)/g);
            let newStr = '';

            let filter = false;
            let type;

            let startRe;
            let endRe;

            switch (path.extname(file.path)) {
              case '.ts':
                startRe = TS_START_RE;
                endRe = TS_END_RE;
                break;
              case '.ejs':
                startRe = EJS_START_RE;
                endRe = EJS_END_RE;
                break;
            }

            for (let i = 0; i < lines.length; i++) {
              const line = lines[i];
              const matches = line.match(startRe);

              if (matches) {
                type = matches[1];
                const keyVal = matches[2].split(':');
                const key = keyVal[0];
                const values = keyVal[1].split('|');

                if (type === 'KEEP' && values.indexOf(process.env[key]) === -1) {
                  filter = true;
                } else if (values.indexOf(process.env[key]) !== -1) {
                  type = undefined;
                }
              }

              let newLine = line;

              switch (type) {
                case 'NGFACTORY':
                  newLine = line.replace(/(NgFactory|\.ngfactory)/g, '').replace('renderModuleFactory', 'renderModule');
                  break;
              }

              if (filter === false) {
                newStr += newLine;
              }

              if (endRe.test(newLine)) {
                filter = false;
              }

              if (i !== lines.length - 1) {
                newStr += '\n';
              }
            }

            file.contents = new Buffer(newStr);
            callback(null, file);
          },
        })
    )())
    .pipe(gulp.dest('.build/private/src')),
};
