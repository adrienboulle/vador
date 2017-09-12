import { Component } from '@angular/core';

declare let window: any;
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';

@Component({
  selector: 'ajs',
  templateUrl: 'ajs.component.html',
})
export class AjsComponent {
  public code: { html: string, css: string, ts: string } = {
    html: '<app>\n' +
    '  <hello-cpm></hello-cpm>\n' +
    '</app>',
    css: 'app {\n' +
    '  background-color: #DBF5F4;\n' +
    '}',
    ts: 'import { Component } from \'../ajs_module/lib/api\';\n' +
    '\n' +
    '@Component({\n' +
    '  selector: \'lolo-cmp\',\n' +
    '  template: \'<div>LOLO {{lolo}}</div>\',\n' +
    '})\n' +
    'export class LoloComp {\n' +
    '  public lolo: string;\n' +
    '\n' +
    '  constructor() {\n' +
    '    this.lolo = \'trololo\';\n' +
    '  }\n' +
    '}\n',
  };
  public config: { html: any, css: any, ts: any } = {
    html: {
      lineNumbers: true,
      tabSize: 2,
      matchBrackets: true,
      lineWrapping: true,
      mode: 'text/html',
    },
    css: {
      lineNumbers: true,
      tabSize: 2,
      matchBrackets: true,
      lineWrapping: true,
      mode: 'text/css',
    },
    ts: {
      lineNumbers: true,
      tabSize: 2,
      matchBrackets: true,
      lineWrapping: true,
      mode: 'text/typescript',
    },
  };

  public get isSsr(): boolean {
    return !window.isSsr;
  }

  public onFocus(): void {

  }

  public onBlur(): void {
    console.log(this.code);
  }
}
