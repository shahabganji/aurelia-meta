import {bindable, customElement} from 'aurelia-framework';

@customElement('demo-element')
export class DemoElement {
  @bindable value;
}
