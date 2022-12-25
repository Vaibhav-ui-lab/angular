import { Component } from '@angular/core';
import {Md5} from "md5-typescript";
import { HashService } from './hash.service';

const imgBlank = "https://wallpapercave.com/wp/wp7632525.jpg";
const imgLoad = "assets/Spinner-1s-200px.svg"
const imgTick = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/512px-Eo_circle_green_checkmark.svg.png?20200417132424";
const imgCross = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/100px-Red_X.svg.png?20070510203255";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'httpPostHash';
  private _password!: string;
  private _md5!: string;
  private _sha1!: string;
  private _sha256!: string;
  img1 = imgBlank;
  img2 = imgBlank;
  img3 = imgBlank;

  private res!: any;

  get password(){
    return this._password;
  }

  set password(str: string){
    this._password = str;
  }

  get md5(){
    return this._md5;
  }

  set md5(hash: string){
    this._md5 = hash;
  }

  get sha1(){
    return this._sha1;
  }

  set sha1(hash: string){
    this._sha1 = hash;
  }

  get sha256(){
    return this._sha256;
  }

  set sha256(hash: string){
    this._sha256 = hash;
  }
  
  constructor(private hashService: HashService){}

  onSubmit(){
    this.img1 = imgLoad;
    this.img2 = imgLoad;
    this.img3 = imgLoad;
    var sha1 = require('simple-sha1');
    var sha256 = require('crypto-js/sha256');

    this._md5 = Md5.init(this._password);
    this._sha1 = sha1.sync(this._password);
    this._sha256 = sha256(this._password).toString();

    this.hashService.postHash(this._password)
    .subscribe((val) => {
      console.log(val);
      this.res = val;

      if(this._md5 === this.res["md5"]){
        this.img1 = imgTick;
      }else{
        this.img1 = imgCross;
        this._md5 = "";
      }

      if(this._sha1 === this.res["sha1"]){
        this.img2 = imgTick;
      }else{
        this.img2 = imgCross;
        this._sha1 = "";
      }

      if(this._sha256 === this.res["sha256"]){
        this.img3 = imgTick;
      }else{
        this.img3 = imgCross;  
        this._sha256 = "";
      }

    })
  }

}
