import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';

const api = 'http://10.5.49.37:8080/bmi';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient){}

  getData(){
    return this.http.get(api);
  }

  postData(hu: string, h: number, wu: string, w: number){
    return this.http.post(api,{
      "height": h,
      "heightUnit": hu,
      "weight": w,
      "weightUnit": wu
    });
  }
}
