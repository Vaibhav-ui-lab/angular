import { Component } from '@angular/core';
import { StatsService } from './stats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'httpPostStats';
  private _length!: number;
  private _width!: number;
  private _height!: number;
  private _long!: number;
  private _secLong!: number;
  private _short!: number;
  private _girth!: number;
  private _volume!: number;
  private res!: any;

  get length(){
    return this._length;
  }

  set length(l: number){
    this._length = l;
  }

  get width(){
    return this._width;
  }

  set width(w: number){
    this._width = w;
  }

  get height(){
    return this._height;
  }

  set height(h: number){
    this._height = h;
  }

  get long(){
    return this._long;
  }

  get short(){
    return this._short
  }

  get secLong(){
    return this._secLong;
  }

  get girth(){
    return this._girth;
  }

  get volume(){
    return this._volume;
  }

  constructor(private statsService: StatsService){}

  onClick(){
    this.statsService.postStats(this._length,this._width,this._height)
    .subscribe((val) => {
      this.res = val;
      this._long = this.res["longest"];
      this._short = this.res["shortest"];
      this._secLong = this.res["middle"];
      this._girth = this.res["girth"];
      this._volume = this.res["volume"];

    })
  }

}
