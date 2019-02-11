import { INamedMetaTag, IPropertyMetaTag, ICharSetMetaTag, IHttpEquivMetaTag } from "./router-extend";

export class MetaServiceHelper {

  public static addMetaTags(tags: Array<INamedMetaTag | IPropertyMetaTag | ICharSetMetaTag | IHttpEquivMetaTag>) {

    const head = <HTMLHeadElement>document.getElementsByTagName('head')[0];

    tags.forEach((tag: any) => {

      const meta = document.createElement('meta');
      if (tag["charset"]) {

        const charset = <ICharSetMetaTag>tag;
        meta.setAttribute('charset', charset.charset);
        head.appendChild(meta);

        return;
      }
      else if (tag["httpEquiv"]) {

        const http_equiv = <IHttpEquivMetaTag>tag;

        meta.setAttribute('http-equiv', http_equiv.httpEquiv);

      } else if (tag["property"]) {

        const named = <IPropertyMetaTag>tag;

        meta.setAttribute('property', named.property);

      } else {

        const named = <INamedMetaTag>tag;

        meta.setAttribute('name', named.name);
      }

      meta.setAttribute('content', tag.content ? tag.content : "");

      head.appendChild(meta);

    });

  }

  public static removeMetaTags(tags: Array<INamedMetaTag | IPropertyMetaTag | ICharSetMetaTag | IHttpEquivMetaTag>) {

    const head = <HTMLHeadElement>document.getElementsByTagName('head')[0];

    tags.forEach(tag => {

      let isNamed = ("name" in tag);

      let current = undefined;
      if (isNamed) current = <INamedMetaTag>tag;
      else current = <IPropertyMetaTag>tag;

      let meta = isNamed
        ? head.querySelectorAll(`meta[name="${current.name}"]`)
        : head.querySelectorAll(`meta[property="${current.property}"]`)

      if (meta) {
        meta.forEach(m => m.remove());
      }

    });
  }

}
