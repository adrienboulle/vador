"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("ajs/lib/api");
let TotoComponent = class TotoComponent {
    constructor(service) {
        this.service = service;
        this.val = service.value;
    }
};
TotoComponent = __decorate([
    api_1.Component({
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
exports.TotoComponent = TotoComponent;
let TotoService = class TotoService {
    constructor() {
        this.value = 'MY STR';
    }
};
TotoService = __decorate([
    api_1.Service()
], TotoService);
exports.TotoService = TotoService;
ajs.components = [
    TotoComponent,
];
ajs.services = [
    TotoService,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21wcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNtcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxxQ0FBaUQ7QUFXakQsSUFBYSxhQUFhLEdBQTFCO0lBR0UsWUFBbUIsT0FBb0I7UUFBcEIsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQUNyQyxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDM0IsQ0FBQztDQUNGLENBQUE7QUFOWSxhQUFhO0lBVHpCLGVBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxNQUFNO1FBQ2hCLFFBQVEsRUFBRTs7Ozs7R0FLVDtLQUNGLENBQUM7cUNBSTRCLFdBQVc7R0FINUIsYUFBYSxDQU16QjtBQU5ZLHNDQUFhO0FBUzFCLElBQWEsV0FBVyxHQUF4QjtJQURBO1FBRVMsVUFBSyxHQUFXLFFBQVEsQ0FBQztJQUNsQyxDQUFDO0NBQUEsQ0FBQTtBQUZZLFdBQVc7SUFEdkIsYUFBTyxFQUFFO0dBQ0csV0FBVyxDQUV2QjtBQUZZLGtDQUFXO0FBSXhCLEdBQUcsQ0FBQyxVQUFVLEdBQUc7SUFDZixhQUFhO0NBQ2QsQ0FBQztBQUNGLEdBQUcsQ0FBQyxRQUFRLEdBQUc7SUFDYixXQUFXO0NBQ1osQ0FBQyJ9