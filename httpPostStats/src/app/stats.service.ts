import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

const api = 'http://10.5.49.133:8080/box';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient){}

  getStats(){
    return this.http.get(api);
  }

  postStats(l: number, w: number, h: number){
    return this.http.post(api,{
      "length": l,
      "width": w,
      "height": h
    });
  }
}
