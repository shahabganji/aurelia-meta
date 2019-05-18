import { FrameworkConfiguration } from 'aurelia-framework';
import { configure as demoConfigure} from './aurelia-meta/index';

export * from './aurelia-meta/aurelia-meta-service';
export * from './aurelia-meta/router-extend'

export function configure(config: FrameworkConfiguration) {

  demoConfigure(config);

}
