import { Component, HostBinding, HostListener, Renderer2, ElementRef, OnInit, ViewChild } from '@angular/core';

declare let window: any;
declare let document: any;

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  private _headerHeight: number;
  private _scrollTimeout: any;
  private _isInit: boolean = false;

  @ViewChild('header')
  private _header: ElementRef;

  constructor(private _renderer: Renderer2) {}

  public ngOnInit(): void {
    if (!window.isSsr) {
      this._headerHeight = this._header.nativeElement.clientHeight;
      this.onScroll();
    }
  }

  @HostBinding('class.ssr')
  public getClassSsr(): boolean {
    return window.isSsr;
  }

  @HostListener('window:scroll')
  public onScroll(): void {
    let scroll = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0) || 0;

    if (this._isInit && scroll !== 0) {
      this._renderer.removeClass(this._header.nativeElement, 'smooth-height');
    }

    this._renderer.setStyle(this._header.nativeElement, 'height', Math.max(0, this._headerHeight - scroll) + 'px');

    clearTimeout(this._scrollTimeout);
    this._scrollTimeout = setTimeout(() => {
      this._isInit = true;
      this._renderer.addClass(this._header.nativeElement, 'smooth-height');
    }, 200);
  }
}
