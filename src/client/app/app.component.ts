import { Component, HostBinding, HostListener, Renderer2, ElementRef, OnInit } from '@angular/core';

declare let window: any;
declare let document: any;

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {}

  public ngOnInit(): void {
    if (!window.isSsr) {
      this.onScroll();
    }
  }

  @HostBinding('class.ssr')
  public getClassSsr(): boolean {
    return window.isSsr;
  }

  @HostListener('window:scroll')
  public onScroll(): void {
    if (isNaN((window.pageYOffset || document.scrollTop)  - (document.clientTop || 0))) {
      this._renderer.removeClass(this._elementRef.nativeElement, 'scrolled');
    } else {
      this._renderer.addClass(this._elementRef.nativeElement, 'scrolled');
    }
  }
}
