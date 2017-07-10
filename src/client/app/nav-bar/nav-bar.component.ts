import { Component, Directive, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { RendererTools } from '../../shared/tools/RendererTools';

declare let window: any;

@Directive({
  selector: '[link]',
})
export class Link {
  constructor(public elementRef: ElementRef) {}
}

@Component({
  selector: 'nav-bar',
  templateUrl: 'nav-bar.component.html',
})
export class NavBarComponent implements OnInit {
  @ViewChild('linkOverlay')
  private _linkOverlay: ElementRef;

  @ViewChild('linksContainer')
  private _linksContainer: ElementRef;

  @ViewChildren(Link)
  private _activeLinks: QueryList<Link>;

  private _activeLink: ElementRef;

  constructor(private _renderer: Renderer2, router: Router) {
    if (window.isSsr) {
      return;
    }

    router.events
    .filter(event => event instanceof NavigationEnd)
    .delay(0)
    .mergeMap(() => this._activeLinks.filter(link => RendererTools.hasClass(link.elementRef.nativeElement, 'active')))
    .subscribe((activatedLink) => {
      this._activeLink = activatedLink.elementRef;

      const left = activatedLink.elementRef.nativeElement.offsetLeft;
      const width = activatedLink.elementRef.nativeElement.offsetWidth;
      this._renderer.setStyle(this._linkOverlay.nativeElement, 'left', left + 'px');
      this._renderer.setStyle(this._linkOverlay.nativeElement, 'width', width + 'px');
      this._renderer.addClass(this._linkOverlay.nativeElement, 'in');
      this._unSlide();
    });
  }

  public ngOnInit(): void {
    this._renderer.listen(this._linksContainer.nativeElement, 'mousemove', (event: MouseEvent) => {
      if (!this._activeLink) {
        return;
      }

      let classToAdd: string;
      const toRight = event.clientX - this._activeLink.nativeElement.getBoundingClientRect().right;
      const toLeft = event.clientX - this._activeLink.nativeElement.getBoundingClientRect().left;

      if (toRight > 0) {
        classToAdd = 'slide-right';
      } else if (toLeft < 0) {
        classToAdd = 'slide-left';
      }

      if (classToAdd) {
        this._renderer.addClass(this._linkOverlay.nativeElement, classToAdd);
      } else {
        this._unSlide();
      }
    });
    this._renderer.listen(this._linksContainer.nativeElement, 'mouseleave', () => this._unSlide());
  }

  private _unSlide(): void {
    this._renderer.removeClass(this._linkOverlay.nativeElement, 'slide-right');
    this._renderer.removeClass(this._linkOverlay.nativeElement, 'slide-left');
  }
}
