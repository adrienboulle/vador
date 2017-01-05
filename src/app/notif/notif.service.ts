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
    if (remove && !div.hasAttribute('removed')) {
      div.setAttribute('removed', '');
      setTimeout(() => {
        window.document.getElementsByClassName('notif-container')[0].removeChild(div);
      }, 750);
    }
  }

  private capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  private createNotification(text: string, notifType: string) {
    const mainDiv: HTMLElement = window.document.createElement('div');
    mainDiv.classList.add('notif');
    mainDiv.classList.add(notifType);
    mainDiv.style.right = '-1000px';
    mainDiv.style.transitionTimingFunction = 'ease-out';
    mainDiv.style.transitionProperty = 'right';
    mainDiv.style.transitionDuration = '0s';
    mainDiv.innerText = this._sanitizer.sanitize(1, this.capitalizeFirstLetter(notifType) + ' :  ' + text);
    const crossDivContainet: HTMLElement = window.document.createElement('div');
    crossDivContainet.classList.add('kill-container');
    crossDivContainet.addEventListener('mouseover', () => {
      crossDivContainet.classList.remove('wiggle-end');

      if (!crossDivContainet.classList.contains('wiggle-right') && !crossDivContainet.classList.contains('wiggle-left'))
        crossDivContainet.classList.add('wiggle-right');
    });
    crossDivContainet.addEventListener('animationend', () => {
      if (crossDivContainet.classList.contains('wiggle-end')) {
        crossDivContainet.classList.remove('wiggle-right');
        crossDivContainet.classList.remove('wiggle-left');
        crossDivContainet.classList.remove('wiggle-end');
      } else if (crossDivContainet.classList.contains('wiggle-right')) {
        crossDivContainet.classList.remove('wiggle-right');
        crossDivContainet.classList.add('wiggle-left');
      } else {
        crossDivContainet.classList.add('wiggle-right');
        crossDivContainet.classList.remove('wiggle-left');
      }
    });
    crossDivContainet.addEventListener('mouseleave', () => {
      crossDivContainet.classList.add('wiggle-end');
    });
    crossDivContainet.addEventListener('animationend', () => console.log(1), false);
    const crossDiv: HTMLElement = window.document.createElement('div');
    crossDiv.classList.add('kill');
    const crossI: HTMLElement = window.document.createElement('i');
    crossI.classList.add('r-90');
    crossI.classList.add('com-icon-Down-11-solid');
    crossDiv.appendChild(crossI);
    crossDivContainet.appendChild(crossDiv);
    crossDivContainet.addEventListener('click', () => {
      this.hide(mainDiv, true);
    });
    mainDiv.appendChild(crossDivContainet);
    this.types.forEach(type => {
      if (type === notifType)
        return;

      mainDiv.classList.remove(type);
    });
    window.document.getElementsByClassName('notif-container')[0].appendChild(mainDiv);
    this.hide(mainDiv);
    setTimeout(() => {
      mainDiv.style.transitionDuration = '0.75s';
      mainDiv.style.right = null;
    }, 0);
    setTimeout(() => {
      this.hide(mainDiv, true);
    }, 500000);
  }
}
