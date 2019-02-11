import { FrameworkConfiguration } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { DemoElement } from './demo-element';


export function configure(config: FrameworkConfiguration) {
  // use static class for all resources.
  // need to use decorators on all definitions
  // check https://github.com/aurelia/templating/blob/master/src/decorators.js
  config.globalResources([
    DemoElement
  ]);
}
