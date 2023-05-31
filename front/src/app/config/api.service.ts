import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  postData(data:any){
    console.log("posting data")
    return this.http.post(this.baseURL+'test/SSE/emit',data).subscribe(res=> {return res})
  }
}
