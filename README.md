# aurelia-meta

A plugin on top of `aurelia-router` to handle meta tags of your application, both automatically and manually.

## Usage

1. Install the plugin
```shell
yarn install aurelia-meta
```

2. Make Aurelia aware of your application
```ts
aurelia.use.plugin('aurelia-meta');
```
* Bear in mind to use `PLATFORM.moduleName` if you use `webpack`

3. It's ready to use, just add your meta tags to your routes as a property, no matter its a parent or child route

```ts
config.map([
      {
        route: '',
        name: 'home',
        moduleId: PLATFORM.moduleName('./routes/home'),
        nav: true,
        title: 'Home',

        meta: [
          {
            name: 'home', content: 'This is a Home page'
          },
          {
            property: 'og:title' , content:'Home'
          },
          {
            property: 'og:description' , content:'Aurelia meta is a plugin for Aurelia'
          }
        ]
      },
  ...
]);
```

* If you want to add meta tags manually and not necessarily on route changes, use one of these services: **Router**, **AureliaMetaService** and use the appropriate methods for your purpose.

```ts
import { autoinject } from "aurelia-framework";
import { AureliaMetaService } from "aurelia-meta";

@autoinject()
export class HomeRouteComponent{

  message: string = "Hello world!";

  constructor(private aureliaMetaService: AureliaMetaService) { }

  activate() {
    this.aureliaMetaService.addTag({
      name: 'author' , content:'Saeed Ganji'
    });
  }
  
  deactivate() {
    this.aureliaMetaService.removeTag({
      name: 'author' , content:'Saeed Ganji'
    })
  }
}
```

* Keep in mind that you are responsible to remove tags that you have added manually, the plugin only automatically handles tags defined on the routes.
