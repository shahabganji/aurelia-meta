import { FrameworkConfiguration } from 'aurelia-framework';
import { configure as demoConfigure} from './demo/index';
import { MetaServiceHandler } from './demo/meta-service-handler';


export function configure(config: FrameworkConfiguration) {

  config.container.registerSingleton(MetaServiceHandler);

  config.container.get(MetaServiceHandler);

  demoConfigure(config);
}
