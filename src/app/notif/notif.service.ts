import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

declare let window: any;

@Injectable()
export class NotifService {
  public types: string[] = [
    'info',
    'warn',
    'error',
  ];

  constructor(private _sanitizer: DomSanitizer) {}

  public show(text: string, notificationType: string = this.types[0]) {
    this.createNotification(text, notificationType);
  }

  public hide(div: HTMLElement, remove: boolean = false) {
    div.style.transitionTimingFunction = 'ease-in';
    div.style.right = '-' + (10 + div.clientWidth) + 'px';
    if (remove) {
      setTimeout(() => {
        window.document.body.removeChild(div);
      }, 750);
    }
  }

  private capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  private createNotification(text: string, notifType: string) {
    const div: HTMLElement = window.document.createElement('div');
    div.classList.add('notif');
    div.style.right = '-1000px';
    div.style.transitionTimingFunction = 'ease-out';
    div.style.transitionProperty = 'right';
    div.style.transitionDuration = '0s';
    div.addEventListener('click', () => {
      this.hide(div, true);
    });
    div.classList.add(notifType);
    this.types.forEach(type => {
      if (type === notifType)
        return;

      div.classList.remove(type);
    });
    const span: HTMLElement = window.document.createElement('span');
    const innerSpan = this._sanitizer.sanitize(1, this.capitalizeFirstLetter(notifType) + ' :  ' + text);
    span.innerHTML = innerSpan;
    div.appendChild(span);
    window.document.body.appendChild(div);
    this.hide(div);
    setTimeout(() => {
      div.style.transitionDuration = '0.75s';
      div.style.right = null;
    }, 0);
    setTimeout(() => {
      this.hide(div, true);
    }, 2500);
  }
}
