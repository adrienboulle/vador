var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
export var AppComponent = (function () {
    function AppComponent() {
        this.showHeading = true;
        this.heroes = ['Magneta', 'Bombasto', 'Magma', 'Tornado'];
    }
    AppComponent.prototype.toggleHeading = function () {
        this.showHeading = !this.showHeading;
    };
    AppComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: 'my-app',
            template: "\n    <button (click)=\"toggleHeading()\">Toggle Heading</button>\n    <h1 *ngIf=\"showHeading\">Hello Angular</h1>\n    \n    <h3>List of Heroes</h3>\n    <div *ngFor=\"let hero of heroes\">{{hero}}</div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map