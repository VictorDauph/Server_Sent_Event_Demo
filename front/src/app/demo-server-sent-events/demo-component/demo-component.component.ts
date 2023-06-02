import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  constructor(private http :HttpClient, public sse: SseServiceService, private apiService:ApiService,private cd: ChangeDetectorRef){

  }

  ngOnInit(){
        //Cette méthode provoque la souscription au stream server side. Les données sont diffusées par l'observable chaud message$
        this.sse.createEventSource();

        //méthode, sans doute un peu roots, pour détecter et afficher les informations envoyées par le stream en temps réel sans action de l'utilisateur.
        setInterval(()=>{this.cd.detectChanges }, 250);
  }

  onClick(){
    this.apiService.postData(this.dto);
    this.dto.data++;
  }
}
