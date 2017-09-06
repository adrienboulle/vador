declare let document: any;

export type scrollType = {
  el?: HTMLElement,
  easingFunction?: Function,
  position?: HTMLElement|number,
  duration?: number,
  cb?: Function,
};

export function getWindowHeight(): number {
  return window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
}

export namespace ScrollHelper {
  'use strict';

  export const EASING_FUNCTIONS = {
    // no easing, no acceleration
    LINEAR: t => t,

    QUADRATIC: {
      // accelerating from zero velocity
      EASE_IN: t => t * t,

      // decelerating to zero velocity
      EASE_OUT: t => t * (2 - t),

      // acceleration until halfway, then deceleration
      EASE_IN_OUT: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    },

    CUBIC: {
      // accelerating from zero velocity
      EASE_IN: t => t * t * t,

      // decelerating to zero velocity
      EASE_OUT: t => (--t) * t * t + 1,

      // acceleration until halfway, then deceleration
      EASE_IN_OUT: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    },

    QUARTIC: {
      // accelerating from zero velocity
      EASE_IN: t => t * t * t * t,

      // decelerating to zero velocity
      EASE_OUT: t => 1 - (--t) * t * t * t,

      // acceleration until halfway, then deceleration
      EASE_IN_OUT: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    },

    QUINTIC: {
      // accelerating from zero velocity
      EASE_IN: t => t * t * t * t * t,

      // decelerating to zero velocity
      EASE_OUT: t => 1 + (--t) * t * t * t * t,

      // acceleration until halfway, then deceleration
      EASE_IN_OUT: t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
    },
  };

  export function scrollTo(
      {
        el = document.body,
        easingFunction = EASING_FUNCTIONS.QUADRATIC.EASE_IN_OUT,
        position = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - getWindowHeight(),
        duration = 500,
        cb,
      }: scrollType = {}): void {
    const initScroll = ((window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0));
    goScrollTo(el, initScroll, position, duration / 10, duration / 10, easingFunction, cb);
  }

  function goScrollTo(el: HTMLElement, initScroll: number, position: number|HTMLElement, durationInit: number, duration: number, easingFunction: Function, cb: Function): void {
    setTimeout(() => {
      if (duration < 0) {
        return typeof cb === 'function' ? cb() : null;
      }

      let val: any = position;

      if (typeof position !== 'number') {
        const headerHeight: number = document.querySelector('header').clientHeight;
        const elementMarginTopStr: string = ((<any> position).currentStyle || window.getComputedStyle(position)).marginTop;
        const elementMarginTop: number = Number(elementMarginTopStr.slice(0, -2));
        val = (position.getBoundingClientRect().top - el.getBoundingClientRect().top) - elementMarginTop + headerHeight;
      }

      el.scrollTop = initScroll + (val - initScroll) * easingFunction((durationInit - duration--) / durationInit);
      goScrollTo(el, initScroll, position, durationInit, duration, easingFunction, cb);
    }, 10);
  }
}
