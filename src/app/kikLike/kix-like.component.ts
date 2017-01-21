import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'kix-like',
  host: {
    '(document:keyup)': 'onKeyUp($event)',
  },
  templateUrl: 'kix-like.component.html',
})
export class KixLikeComponent {
  public groups: string[];
  private cursorWidthsDelta: number[];
  private pos: number;
  private movingTimeout: any;

  constructor() {
    this.groups = ['Random text to test'];
  }

  public onKeyUp(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isPrintable =
        (keyCode > 47 && keyCode < 58)   || // number keys
        keyCode === 32 || keyCode === 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keyCode > 64 && keyCode < 91)   || // letter keys
        (keyCode > 95 && keyCode < 112)  || // numpad keys
        (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
        (keyCode > 218 && keyCode < 223);   // [\]' (in order)

    const idx = this.groups.length - 1;

    if (idx < 0)
      this.groups.push('');

    if (isPrintable) {
      const tmpSpan = document.createElement('span');
      const outside = document.getElementById('outside');
      outside.appendChild(tmpSpan);
      tmpSpan.innerText = event.key;

      this.groups[this.groups.length - 1] = [this.groups[this.groups.length - 1].slice(0, this.pos + 1), event.key, this.groups[this.groups.length - 1].slice(this.pos + 1)].join('');
      this.cursorWidthsDelta.splice(this.pos + 1, 0, tmpSpan.offsetWidth);
      this.goRight();
      outside.removeChild(tmpSpan);
    }

    if (keyCode === 8) {
      this.goLeft();
      this.groups[this.groups.length - 1] = this.groups[this.groups.length - 1].slice(0, this.pos + 1) + this.groups[this.groups.length - 1].slice(this.pos + 2);
      this.cursorWidthsDelta.splice(this.pos + 1, 1);
    }

    if (keyCode === 37) {
      this.goLeft();
      document.getElementById('cursor').classList.add('plain');
      clearTimeout(this.movingTimeout);
      this.movingTimeout = setTimeout(() => {
        document.getElementById('cursor').classList.remove('plain');
      }, 500);
    }

    if (keyCode === 39) {
      this.goRight();
      document.getElementById('cursor').classList.add('plain');
      clearTimeout(this.movingTimeout);
      this.movingTimeout = setTimeout(() => {
        document.getElementById('cursor').classList.remove('plain');
      }, 500);
    }
  }

  public handleCursor(event: MouseEvent): void {
    const txt: string = event.srcElement['innerText'];
    const posX = event.offsetX;
    const tmpSpan = document.createElement('span');
    const outside = document.getElementById('outside');
    outside.appendChild(tmpSpan);
    let lastWidthBefore = 0;
    let lastWidthAfter = 0;
    let posBefore = 0;
    this.cursorWidthsDelta = [];
    const cursorWidths: number[] = [];
    let prevWidth: number = 0;

    for (let i = 0; i < txt.length; i++) {
      tmpSpan.innerText = tmpSpan.innerText + txt[i];
      this.cursorWidthsDelta.push(tmpSpan.offsetWidth - prevWidth);
      prevWidth = tmpSpan.offsetWidth;
      cursorWidths.push(tmpSpan.offsetWidth);
    }

    for (let i = 0; i < cursorWidths.length; i++) {
      if (cursorWidths[i] > posX) {
        lastWidthAfter = cursorWidths[i];
        break;
      }

      posBefore = i;
      lastWidthBefore = cursorWidths[i];
    }

    const deltaBefore = posX - lastWidthBefore;
    const deltaAfter = lastWidthAfter - posX;
    const newWidth = deltaAfter > deltaBefore ? lastWidthBefore : lastWidthAfter;
    this.pos = deltaAfter > deltaBefore ? posBefore : posBefore + 1;

    (<HTMLElement> document.getElementsByClassName('cursor')[0]).style.left = newWidth + event.srcElement.getBoundingClientRect().left - 1 + 'px';
    (<HTMLElement> document.getElementsByClassName('cursor')[0]).style.top = event.srcElement.getBoundingClientRect().top - 1 + 'px';
    outside.removeChild(tmpSpan);
  }

  private goLeft(): void {
    this.pos = Math.max(this.pos - 1, 0);
    const curWidthPx = (<HTMLElement> document.getElementsByClassName('cursor')[0]).style.left;
    const curWidth = this.getNumberFromPxStr(curWidthPx);

    (<HTMLElement> document.getElementsByClassName('cursor')[0]).style.left = curWidth - this.cursorWidthsDelta[this.pos + 1] + 'px';
  }

  private goRight(): void {
    this.pos = Math.min(this.pos + 1, this.cursorWidthsDelta.length);
    const curWidthPx = (<HTMLElement> document.getElementsByClassName('cursor')[0]).style.left;
    const curWidth = this.getNumberFromPxStr(curWidthPx);

    (<HTMLElement> document.getElementsByClassName('cursor')[0]).style.left = curWidth + this.cursorWidthsDelta[this.pos] + 'px';
  }

  private getNumberFromPxStr(pxStr: string): number {
    return pxStr.indexOf('px') !== -1 ? Number(pxStr.slice(0, -2)) : 0;
  }
}
