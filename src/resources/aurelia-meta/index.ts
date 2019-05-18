import { FrameworkConfiguration } from 'aurelia-framework';
import { AureliaMetaService } from './aurelia-meta-service';


export function configure(config: FrameworkConfiguration) {

  config.container.registerSingleton(AureliaMetaService);

  config.container.get(AureliaMetaService);

  // config.globalResources();
}
