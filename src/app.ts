import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { charset, viewport } from 'resources/demo/router-extend';
import { MetaServiceHandler } from 'resources/demo/meta-service-handler';

export class App {
  message = 'Hello World!';

  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {

    this.router = router;

    config.title = 'Title';
    config.map([
      {
        route: '', name: 'home', moduleId: PLATFORM.moduleName('./routes/home'),
        nav: true, title: 'Home',
        meta: [
          {
            name: 'home', content: 'This is a Home page'
          },
          {
            property: 'og:title' , content:'This is a facebook compatible meta tag'
          }
        ]
      },
      {
        route: 'about', name: 'about', moduleId: PLATFORM.moduleName('./routes/about'),
        nav: true, title: 'About',
        meta: [
          { name: 'about', content: 'This is an about page' },
          { name: 'developer', content: 'Shahab' },
          { name: 'developer', content: 'Hamed' }
        ]
      }
    ]);

    config.addMeta([charset, viewport]);
    this.router.addMeta([{ name: 'author', content: "shahabganji" }]);

  }
}
