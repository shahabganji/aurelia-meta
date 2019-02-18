import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";

export class NestedRoutes{

  
  router: Router;
  
  configureRouter(config: RouterConfiguration, router: Router): void {

    this.router = router;

    config.map([
      {
        route: '', name: 'default', moduleId: PLATFORM.moduleName('./default'),
        nav: true, title: 'Default',
        meta: [
          {
            name: 'default', content: 'This is a Default page for nested routes'
          }
        ]
      },
      {
        route: 'page2', name: 'page2', moduleId: PLATFORM.moduleName('./page2'),
        nav: true, title: 'Page 2',
        meta: [
          {
            name: 'page2', content: 'Page 2 is very important'
          }
        ]
      }
    ]);
  }
  
}
