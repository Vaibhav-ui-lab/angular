import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const API = 'http://192.168.0.3:8080/';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private router: Router){}

  getUser(){
    return JSON.parse(localStorage.getItem("user") || "User");
  }

  setUser(str: string){
    localStorage.setItem("user",JSON.stringify(str));
  }

  getData(){
    return JSON.parse(localStorage.getItem("data") || "[]");
  }

  setData(data: any){
    localStorage.setItem("data",JSON.stringify(data));
  }

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

  logUser(user: string, pwd: string): any{
    this.http.post(API+'login',{
    "password": pwd,
    "username": user
    })
    .subscribe(() => {},
    (error) => {
      // console.log(error)
      if(error["status"] === 404){
        alert("Username not registered.")
      } else if(error["status"] === 417){
        alert("Invalid Password")
      } else if(error["status"] === 302){
        this.setData(error["error"]);
        this.userLogged(true);
        this.router.navigate(['/dashboard']);
      }
    });
  }

  regUser(username: string, password: string){
    return this.http.post(API+'register',{
      "password": password,
      "username": username
    });
  }

  userLogged(bool: boolean) {
    localStorage.setItem("bool",JSON.stringify(bool));
  }

  isUserLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem("bool") || "false");
  }
  
}
