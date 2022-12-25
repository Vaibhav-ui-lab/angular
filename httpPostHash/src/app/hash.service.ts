import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

const api = 'http://10.5.48.62:8080/';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  constructor(private http: HttpClient) { }

  getHash(){
    return this.http.get(api);
  }

  postHash(pass: string){
    return this.http.post(api,{
      "password": pass
    });
  }

}
