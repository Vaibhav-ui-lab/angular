import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://10.5.49.67:8080/';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  constructor(private http: HttpClient){}

  getElements(){
    return this.http.get(API);
  }

  postElements(n: string, s: string, atn: number, atw: number){
    return this.http.post(API,{
      "atomicNumber": atn,
      "symbol": s,
      "name": n,
      "atomicWeight": atw
    });
  }
  
}
