import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { TooltipContainerComponent } from './tooltip-container/tooltip-container.component';


@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective,
    TooltipContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [
    TooltipContainerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
