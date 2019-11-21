import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[myScrollVanish]',
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class ExpandableHeaderDirective {

  @Input('toolbarUno') toolbarUno: any;

  constructor(private element: ElementRef, private renderer: Renderer2, private domCtrl: DomController) { }

  ngOnInit() {
    this.toolbarUno = this.toolbarUno.el;
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.toolbarUno, 'transition', 'margin-top 300ms');
    })
  }
  onContentScroll(event: any) {
    if (event.detail.scrollTop > 30) {
      this.renderer.setStyle(this.toolbarUno, "margin-top", `-${this.toolbarUno.clientHeight}px`);
    } else {
      this.renderer.setStyle(this.toolbarUno, "margin-top", "0");
    }
  }

}
