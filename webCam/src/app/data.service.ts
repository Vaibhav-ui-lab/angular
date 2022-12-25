import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://10.5.50.95:8080/genderDetector';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  postData(data: any){
    return this.http.post(API,data);
  }


}
