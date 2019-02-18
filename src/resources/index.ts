import { FrameworkConfiguration } from 'aurelia-framework';
import { configure as demoConfigure} from './aurelia-meta/index';

export function configure(config: FrameworkConfiguration) {

  demoConfigure(config);

}
