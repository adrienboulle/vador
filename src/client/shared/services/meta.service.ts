import { Injectable, Renderer2, ViewEncapsulation, RendererFactory2 } from '@angular/core';
import { PlatformState } from '@angular/platform-server';

import { RendererTools } from '../tools/RendererTools';

export const metaDescriptions = {
  description: {
    tagName: 'meta',
    dataType: 'attributes',
    mainAttribute: 'name',
    attributes: {
      name: 'type',
      description: 'value',
    },
  },
  robots: {
    tagName: 'meta',
    dataType: 'attributes',
    mainAttribute: 'name',
    attributes: {
      name: 'type',
      robots: 'value',
    },
  },
  charset: {
    tagName: 'meta',
    dataType: 'attributes',
    mainAttribute: 'charset',
    attributes: {
      charset: 'value',
    },
  },
  keywords: {
    tagName: 'meta',
    dataType: 'attributes',
    mainAttribute: 'name',
    attributes: {
      name: 'type',
      description: 'value',
    },
  },
  author: {
    tagName: 'meta',
    dataType: 'attributes',
    mainAttribute: 'name',
    attributes: {
      name: 'type',
      description: 'value',
    },
  },
  copyright: {
    tagName: 'meta',
    dataType: 'attributes',
    mainAttribute: 'name',
    attributes: {
      name: 'type',
      description: 'value',
    },
  },
  title: {
    tagName: 'title',
    dataType: 'innerText',
    innerText: 'value',
  },
  canonical: {
    tagName: 'link',
    dataType: 'attributes',
    mainAttribute: 'href',
    attributes: {
      rel: 'canonical',
      href: 'value',
    },
  },
};

@Injectable()
export class MetaService {
  private _renderer: Renderer2;

  constructor(private _state: PlatformState, private _rendererFactory: RendererFactory2) {}

  public setMeta(metaDef: any[]) {
    const document: any = this._state.getDocument();
    const headNode: any = this._getHead(document);
    this._renderer = this._renderer || this._rendererFactory.createRenderer(document, {
      id: '-1',
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {},
    });

    if (!headNode) {
      throw new Error('document has no head tag');
    }

    for (let meta of metaDef) {
      const metaTagDescription = metaDescriptions[meta.type];
      const metaTagName = metaTagDescription.tagName;
      const metaTag = this._getMeta(headNode, metaTagName, meta.value, metaTagDescription);

      switch (metaTagDescription.dataType) {
        case 'attributes':
          Object.keys(metaTagDescription.attributes).forEach(attrName => {
            let attrValue = metaTagDescription.attributes[attrName];

            if (metaTagDescription.attributes[attrName] === 'value') {
              attrValue = meta.value;
            }

            if (metaTagDescription.attributes[attrName] === 'type') {
              attrValue = meta.type;
            }

            this._renderer.setAttribute(metaTag, attrName, attrValue);
          });
          break;
        case 'innerText':
          this._renderer.setValue(metaTag, meta.value);
          break;
      }
    }
  }

  private _getMeta(headNode: any, tagName: string, value: string, metaTagDescription: any): any {
    const metaTags = [];

    for (let i: number = 0; i < headNode.childNodes.length; i++) {
      const child = headNode.childNodes[i];

      if (this._isTag(child, metaTagDescription.tagName)) {
        if (!metaTagDescription.mainAttribute
            || (metaTagDescription.mainAttribute && RendererTools.getAttribute(child, metaTagDescription.mainAttribute) === value)) {
          metaTags.push(child);
        }
      }
    }

    if (metaTags.length === 0) {
      const el = this._renderer.createElement(tagName);
      this._renderer.appendChild(headNode, el);

      return el;
    }

    if (metaTags.length > 1) {
      for (let i: number = 1; i < metaTags.length; i++) {
        this._renderer.removeChild(headNode, metaTags[i]);
      }
    }

    return metaTags[0];
  }

  private _isTag(el: any, tagName: string): boolean {
    return el.type === 'tag' && el.name === tagName;
  }

  private _getHead(document: any): any {
    for (let i: number = 0; i < document.childNodes.length; i++) {
      const child = document.childNodes[i];

      if (this._isTag(child, 'html')) {
        for (let i: number = 0; i < child.childNodes.length; i++) {
          const child2 = child.childNodes[i];

          if (this._isTag(child2, 'head')) {
            return child2;
          }
        }
      }
    }
  }
}
