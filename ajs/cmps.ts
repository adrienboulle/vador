declare let ajs: any;

import { Component, Service } from 'ajs/lib/api';

@Component({
  selector: 'toto',
  template: `
    <h2>H2 {{val}}</h2>
    <h3 ajs-innertext="val"></h3>
    <h4 ajs-innertext="service.value"></h4>
    <h5>{{service.value}}</h5>
  `,
})
export class TotoComponent {
  public val: string;

  constructor(public service: TotoService) {
    this.val = service.value;
  }
}

@Service()
export class TotoService {
  public value: string = 'MY STR';
}

ajs.components = [
  TotoComponent,
];
ajs.services = [
  TotoService,
];
