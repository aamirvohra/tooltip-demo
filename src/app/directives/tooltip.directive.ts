import {
  ComponentFactoryResolver,
  Directive,
  HostListener,
  Input, OnDestroy, OnInit,
  ViewContainerRef
} from '@angular/core';

import { TooltipPositioning } from '../models/tooltip-positioning';
import { TooltipContainerComponent } from '../tooltip-container/tooltip-container.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit, OnDestroy {

  private compRef: any;
  private compRefInstance: TooltipContainerComponent;


  private readonly ESCAPE_KEYCODE: number = 27;

  @Input('text')
  protected text: string;

  @Input('position')
  protected position: TooltipPositioning = TooltipPositioning.TOP;

  private tooltipVisibility: BehaviorSubject<boolean>;

  constructor (private componentFactoryResolver: ComponentFactoryResolver,
               private vcr: ViewContainerRef) {
    this.tooltipVisibility = new BehaviorSubject(false);
  }

  ngOnInit() {
    this.initTooltipContainer();
  }

  ngOnDestroy() {
    this.compRef.destroy();
  }

  private initTooltipContainer() {
    const component = this.componentFactoryResolver.resolveComponentFactory(TooltipContainerComponent);
    this.compRef = this.vcr.createComponent(component);

    this.compRefInstance = (<TooltipContainerComponent>this.compRef.instance);
    this.compRefInstance.text = this.text;
    this.compRefInstance.position = this.position;
  }

  @HostListener('click')
  protected onClick() {
    if (this.tooltipVisibility.value) {
      return;
    }

    this.show();
  }

  @HostListener('keydown', ['$event'])
  protected onEsc(event) {
    if (event.keyCode !== this.ESCAPE_KEYCODE) {
      return;
    }

    this.hide();
  }

  @HostListener('blur')
  protected onBlur() {
    this.hide();
  }

  @HostListener('window:scroll', [])
  private onWindowScroll() {
    if (window.pageYOffset > 50) {
      this.compRefInstance.changePlacement(TooltipPositioning.BOTTOM);
    } else if (window.pageYOffset < 50) { // additional bonus to reset position on scrolling up
      this.compRefInstance.changePlacement(TooltipPositioning.TOP);
    }
  }

  private show() {
    this.tooltipVisibility.next(true);
    this.compRefInstance.setVisibility(true);
  }

  private hide() {
    this.tooltipVisibility.next(false);
    this.compRefInstance.setVisibility(false);
  }


}
