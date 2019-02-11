import { RouterConfiguration, Router } from 'aurelia-router';
import { MetaServiceHelper } from './meta-service-helper';

export const charset: ICharSetMetaTag = {
  charset: 'utf-8'
}

export const viewport: INamedMetaTag = {
  name: "viewport",
  content: "width=device-width, initial-scale=1.0"
}

export interface ICharSetMetaTag {
  charset: string;
}

export interface IHttpEquivMetaTag {
  httpEquiv: string;
  content: string;
}

export interface INamedMetaTag {
  name: string;
  content: string;
}

export interface IPropertyMetaTag {
  property: string;
  content: string;
}


declare module 'aurelia-router' {

  export interface RouteConfig {
    meta?: Array<INamedMetaTag | IPropertyMetaTag>;
  }

  export interface RouterConfiguration {
    addMeta(tags: Array<INamedMetaTag | IPropertyMetaTag | ICharSetMetaTag | IHttpEquivMetaTag>);
    removeMeta(tags: Array<INamedMetaTag | IPropertyMetaTag | ICharSetMetaTag | IHttpEquivMetaTag>);
  }

  export interface Router {
    addMeta(tags: Array<INamedMetaTag | IPropertyMetaTag | ICharSetMetaTag | IHttpEquivMetaTag>);
    removeMeta(tags: Array<INamedMetaTag | IPropertyMetaTag | ICharSetMetaTag | IHttpEquivMetaTag>);
  }

}

RouterConfiguration.prototype.addMeta = function (tags: Array<INamedMetaTag | ICharSetMetaTag | IHttpEquivMetaTag>) {
  MetaServiceHelper.addMetaTags(tags);
}

Router.prototype.addMeta = function (tags: Array<INamedMetaTag | ICharSetMetaTag | IHttpEquivMetaTag>) {
  MetaServiceHelper.addMetaTags(tags);
}

RouterConfiguration.prototype.removeMeta = function (tags: Array<INamedMetaTag | ICharSetMetaTag | IHttpEquivMetaTag>) {
  MetaServiceHelper.removeMetaTags(tags);
}

Router.prototype.removeMeta = function (tags: Array<INamedMetaTag | ICharSetMetaTag | IHttpEquivMetaTag>) {
  MetaServiceHelper.removeMetaTags(tags);
}
