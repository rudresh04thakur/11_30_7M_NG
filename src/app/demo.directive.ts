import { Directive, ElementRef, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appDemo]'
})
export class DemoDirective {

  constructor(private _ef: ElementRef, private _tmp: TemplateRef<any>, private _vc: ViewContainerRef) { }
  @Input('appDemo') set loop(num: number) {
    for (var i = 0; i < num; i++) {
      this._vc.createEmbeddedView(this._tmp);
    }
  }
}
