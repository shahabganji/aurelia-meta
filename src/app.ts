import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { charset, viewport } from 'resources/aurelia-meta/router-extend';
import { computedFrom } from 'aurelia-binding';

export class App {

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
      } , 

      {
        route: 'nested', name: 'nested', moduleId: PLATFORM.moduleName('./routes/nested/configuration'),
        nav: true, title: 'Nested',
        meta: [
          { property: 'nested:about', content: 'This is a nested route' }
        ]
      }

    ]);

    config.addMeta([charset, viewport]);
    this.router.addMeta([{ name: 'author', content: "shahabganji" }]);

  }

  @computedFrom('router.currentInstruction')
  get activeRoute() {
    return this.router.currentInstruction.getAllInstructions().flatMap(inst=> inst.config.meta);
  }

}
