var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Service } from 'ajs/lib/api';
let TotoComponent = class TotoComponent {
    constructor(service) {
        this.service = service;
        this.val = service.value;
    }
};
TotoComponent = __decorate([
    Component({
        selector: 'toto',
        template: `
    <h2>H2 {{val}}</h2>
    <h3 ajs-innertext="val"></h3>
    <h4 ajs-innertext="service.value"></h4>
    <h5>{{service.value}}</h5>
  `,
    }),
    __metadata("design:paramtypes", [TotoService])
], TotoComponent);
export { TotoComponent };
let TotoService = class TotoService {
    constructor() {
        this.value = 'MY STR';
    }
};
TotoService = __decorate([
    Service()
], TotoService);
export { TotoService };
ajs.components = [
    TotoComponent,
];
ajs.services = [
    TotoService,
];
