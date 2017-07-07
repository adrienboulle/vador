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

  export function hasClass(el: any, className: string): boolean {
    if (!window.isSsr) {
      return el.classList.contains(className);
    }

    return classList(el).indexOf(className) > -1;
  }

  export function classList(el: any): string[] {
    if (!window.isSsr) {
      throw new Error('Use el.classList');
    }

    let classAttrValue: any = null;
    const attributes = el.attribs;

    if (attributes && attributes.class) {
      classAttrValue = attributes.class;
    }

    return classAttrValue ? classAttrValue.trim().split(/\s+/g) : [];
  }
}
