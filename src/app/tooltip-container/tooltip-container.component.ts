import { Component, Input, OnInit } from '@angular/core';
import { TooltipPositioning } from '../models/tooltip-positioning';

@Component({
  selector: 'app-tooltip-container',
  templateUrl: './tooltip-container.component.html',
  styleUrls: ['./tooltip-container.component.scss']
})
export class TooltipContainerComponent implements OnInit {

  @Input('text')
  public text: string;

  @Input('position')
  public position: TooltipPositioning;

  protected positionString: string;

  protected visibility: boolean;

  constructor() {
    this.visibility = false;
  }

  ngOnInit() {
    this.positionString = this.getPositionString(this.position);
  }

  changePlacement(position: TooltipPositioning) {
    this.position = position;
    this.positionString = this.getPositionString(this.position);
  }

  private getPositionString(position: TooltipPositioning): string {
    return (TooltipPositioning[position]).toLowerCase();
  }

  setVisibility(visibility: boolean) {
    this.visibility = visibility;
  }

}
