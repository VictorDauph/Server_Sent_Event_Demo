import { Component } from '@angular/core';
import { SseServiceService } from '../sse-service.service';

@Component({
  selector: 'app-demo-component',
  templateUrl: './demo-component.component.html',
  styleUrls: ['./demo-component.component.scss']
})
export class DemoComponentComponent {

  sse: SseServiceService= new SseServiceService; 

  constructor(){
    this.sse.subscribe()
  }
}
