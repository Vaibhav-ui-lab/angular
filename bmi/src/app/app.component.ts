import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bmi';
  private _height!: number;
  private _weight!: number;
  // private _bmi = 0;
  _measureSys = 'imperial';

  get measureSys(){
    return this._measureSys;
  }

  set measureSys(str: string){
    if(str == 'imperial'){
      this._measureSys = 'imperial';
      if(this._height != null || this._weight != null){
        this._height /= 2.54;
        this._weight /= 0.4536;
      }
    }else{
      this._measureSys = 'metric';
      if(this._height != null || this._weight != null){
        this._height *= 2.54;
        this._weight *= 0.4536;
      }
    }
  }

  get height() {
    return this._height;
  }

  set height(h: number) {
    this._height = h;
  }

  get weight() {
    return this._weight;
  }

  set weight(w: number) {
    this._weight = w;
  }

  get bmi() {
    if (this._height == null || this._weight == null) {
      return 0;
    }
    if(this._measureSys=='imperial'){
      return 703 * (this._weight / (this._height * this._height));
    }
    return (this._weight / (this._height * this._height)) * 10000;
    
  }

  get heightUnit(){
    if(this._measureSys=='imperial'){
      return 'inches';
    }
    return 'centimeters';
  }

  get weightUnit(){
    if(this._measureSys=='imperial'){
      return 'pounds';
    }
    return 'kilograms';
  }

}
