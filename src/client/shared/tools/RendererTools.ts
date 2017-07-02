declare let window: any;

export namespace RendererTools {
  'use strict';

  export function hasAttribute(el: any, attribute: string): boolean {
    if (typeof el.hasAttribute === 'function') {
      return el.hasAttribute(attribute);
    }

    return el.attribs && !!el.attribs[attribute];
  }

  export function getAttribute(el: any, attribute: string): string {
    if (RendererTools.hasAttribute(el, attribute)) {
      if (typeof el.getAttribute === 'function') {
        return el.getAttribute(attribute);
      }

      return el.attribs[attribute];
    }
  }
}
