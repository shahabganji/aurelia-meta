
import { autoinject, singleton, inject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { NavigationInstruction, Router } from 'aurelia-router';
import { INamedMetaTag, ICharSetMetaTag, IHttpEquivMetaTag, IPropertyMetaTag } from './router-extend';
import './router-extend';
import { MetaServiceHelper } from './meta-service-helper';



@inject(EventAggregator, Router)
@singleton()
export class AureliaMetaService {

  private processingSubscription: Subscription;
  private completeSubscription: Subscription;

  private static PROCESSING_ROUTE_EVENT: string = "router:navigation:processing";

  private static COMPLETE_ROUTE_EVENT: string = "router:navigation:complete";

  constructor(private ea: EventAggregator, private router: Router) {
    this.start();
  }


  // #region for my own further reference

  // private getTags(route: NavigationInstruction): Array<INamedMetaTag | IPropertyMetaTag> {

  //   let nextTags: Array<INamedMetaTag | IPropertyMetaTag> = [];

  //   if (Object.keys(route.viewPortInstructions).length) {
  //     for (let viewport in route.viewPortInstructions) {
  //       if (route.viewPortInstructions[viewport].childNavigationInstruction) {

  //         const tags = this.getTags(route.viewPortInstructions[viewport].childNavigationInstruction);
  //         if (tags) {
  //           tags.forEach(tag => nextTags.push(tag));
  //         }
  //       }
  //     }
  //   }

  //   if( route.config.meta && route.config.meta.length ){
  //     route.config.meta.forEach(meta => nextTags.push(meta));
  //   }

  //   return nextTags;
  // }

  // #endregion


  private registerCompleteRouteEvent() {
    this.completeSubscription = this.ea.subscribe(AureliaMetaService.COMPLETE_ROUTE_EVENT, (payload) => {
      if (payload.result.completed) {
        const tags = payload.instruction.getAllInstructions().flatMap(inst => inst.config.meta);
        MetaServiceHelper.addMetaTags(tags);
      }
    });
  }
  private registerProcessingRouteEvent(): void {
    this.processingSubscription = this.ea.subscribe(AureliaMetaService.PROCESSING_ROUTE_EVENT, (payload) => {
      const prevInstruction: NavigationInstruction = payload.instruction.previousInstruction;
      if (prevInstruction) {
        const prevTags = prevInstruction.getAllInstructions().flatMap(inst => inst.config.meta);
        if (prevTags) {
          MetaServiceHelper.removeMetaTags(prevTags);
        }
      }
    });
  }

  start() {

    if (this.processingSubscription && this.completeSubscription) {
      return;
    }

    this.registerCompleteRouteEvent();

    this.registerProcessingRouteEvent();

  }

  stop() {

    this.completeSubscription.dispose();
    this.processingSubscription.dispose();

    this.completeSubscription = null;
    this.processingSubscription = null;

    delete this.completeSubscription;
    delete this.processingSubscription;
  }

  addTag(tag: INamedMetaTag | IPropertyMetaTag | ICharSetMetaTag | IHttpEquivMetaTag) {
    MetaServiceHelper.addMetaTags([tag]);
  }
  addTags(tags: Array<INamedMetaTag | IPropertyMetaTag | ICharSetMetaTag | IHttpEquivMetaTag>) {
    MetaServiceHelper.addMetaTags(tags);
  }
  removeTag(tag: INamedMetaTag | IPropertyMetaTag | ICharSetMetaTag | IHttpEquivMetaTag) {
    MetaServiceHelper.removeMetaTags([tag]);
  }
  removeTags(tags: Array<INamedMetaTag | IPropertyMetaTag | ICharSetMetaTag | IHttpEquivMetaTag>) {
    MetaServiceHelper.removeMetaTags(tags);
  }

}
