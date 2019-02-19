import { autoinject } from "aurelia-framework";
import { AureliaMetaService } from "resources/aurelia-meta/aurelia-meta-service";

@autoinject()
export class HomeRouteComponent{

  message: string = "Hello world!";

  constructor(private aureliaMetaService: AureliaMetaService) {
    
  }

  activate() {
    this.aureliaMetaService.addTag({
      name: 'author' , content:'Saeed Ganji'
    });
  }

  deactivate() {
    this.aureliaMetaService.removeTag({
      name: 'author' , content:'Saeed Ganji'
    })
  }

}
