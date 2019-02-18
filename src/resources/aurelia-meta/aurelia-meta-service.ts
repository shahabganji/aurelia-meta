
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
  private canceledSubscription: Subscription;

  private static PROCESSING_ROUTE_EVENT: string = "router:navigation:processing";
  private static CANCELED_ROUTE_EVENT: string = "router:navigation:canceled";

  constructor(private ea: EventAggregator, private router:Router) {
    this.start();
  }

  start() {

    // prevents multiple subscription
    if (this.processingSubscription && this.canceledSubscription) {
      return;
    }

    this.processingSubscription = this.ea.subscribe(AureliaMetaService.PROCESSING_ROUTE_EVENT, (payload) => {

      const prevRoute: NavigationInstruction = payload.instruction.previousInstruction;
      const nextRoute: NavigationInstruction = payload.instruction;

      console.log("**************************************************");
      console.log(prevRoute);
      console.log(nextRoute);
      console.log("**************************************************");

      if (prevRoute) {
        const prevTags: Array<INamedMetaTag | IPropertyMetaTag> = prevRoute.config.meta;
        if (prevTags) {
          MetaServiceHelper.removeMetaTags(prevTags);
        }
      }

      const nextTags: Array<INamedMetaTag | IPropertyMetaTag> = nextRoute.config.meta;
      if (nextTags) {
        MetaServiceHelper.addMetaTags(nextTags);
      }

    });

    this.canceledSubscription = this.ea.subscribe(AureliaMetaService.CANCELED_ROUTE_EVENT, (payload) => {

      const canceled: NavigationInstruction = payload.instruction;

      const cancel: Array<INamedMetaTag | IPropertyMetaTag> = canceled.config.meta;

      if (cancel) {
        MetaServiceHelper.removeMetaTags(cancel);
      }

    });

  }

  stop() {

    this.canceledSubscription.dispose();
    this.processingSubscription.dispose();

    this.canceledSubscription = null;
    this.processingSubscription = null;

    delete this.canceledSubscription;
    delete this.processingSubscription;
  }

  addTag(tag:INamedMetaTag | IPropertyMetaTag | ICharSetMetaTag | IHttpEquivMetaTag){
    MetaServiceHelper.addMetaTags([tag]);
  }
  addTags(tags: Array<INamedMetaTag | IPropertyMetaTag | ICharSetMetaTag | IHttpEquivMetaTag>) {
    MetaServiceHelper.addMetaTags(tags);
  }
  removeTag(tag:INamedMetaTag | IPropertyMetaTag | ICharSetMetaTag | IHttpEquivMetaTag){
    MetaServiceHelper.removeMetaTags([tag]);
  }
  removeTags(tags: Array<INamedMetaTag | IPropertyMetaTag | ICharSetMetaTag | IHttpEquivMetaTag>) {
    MetaServiceHelper.removeMetaTags(tags);
  }

}