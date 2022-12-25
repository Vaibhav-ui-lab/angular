import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

const apiMetric = 'http://10.5.48.62:8080/metric';
const apiImperial = 'http://10.5.48.62:8080/imperial'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient){}

  getData(){
    return this.http.get(apiMetric);
  }

  postData(u: string, f: number, h: number, w: number){
    if(u=="imperial"){
      return this.http.post(apiImperial,{
        "feet": f,
        "inches": h,
        "weight": w
      });
    }
    return this.http.post(apiMetric,{
      "height": h,
      "weight": w
    });
  }
}
