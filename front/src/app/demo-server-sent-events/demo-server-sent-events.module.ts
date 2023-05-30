import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponentComponent } from './demo-component/demo-component.component';



@NgModule({
  declarations: [
    DemoComponentComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DemoComponentComponent
  ]
})
export class DemoServerSentEventsModule { }
