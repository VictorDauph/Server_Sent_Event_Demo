import { ChangeDetectionStrategy, Component, OnChanges, OnInit } from '@angular/core';
import { SseServiceService } from '../sse-service.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/config/api.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-demo-component',
  templateUrl: './demo-component.component.html',
  styleUrls: ['./demo-component.component.scss']
})
export class DemoComponentComponent implements OnInit{

  dto:any={
    data:0
  }

  //message reçu par le stream Server Side Event
  message$:Observable<String>=new Observable();


  constructor(private http :HttpClient, private sse: SseServiceService, private apiService:ApiService){

  }

  ngOnInit(){
        //Cette méthode contient la logique permettant de gérer le stream sse et d'afficher les données via un observable
        this.message$=this.sse.createEventSource();
        /*
        this.sse.createEventSource().subscribe(
          (data)=>{
            console.log('message reçu : '+ data )
            this.message$= of(data);
          }
        );
        */
  }

  onClick(){
    this.apiService.postData(this.dto);
    this.dto.data++;
  }
}
