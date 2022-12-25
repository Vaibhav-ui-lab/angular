import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'httpPostBmi';
  private _height!: number;
  private _feet!: number;
  private _weight!: number;
  _measureSys = 'imperial';
  bmiVal!: any;

  constructor(private dataService: DataService){}

  onCalc(){
    this.dataService.postData(this._measureSys, this._feet, this._height, this._weight)
    .subscribe((res) => {
      this.bmiVal = res;
    });
  }


  get measureSys(){
    return this._measureSys;
  }

  set measureSys(str: string){
    if(str == 'imperial'){
      this._measureSys = 'imperial';
      if(this._height != null || this._weight != null){
        this._height /= 2.54;
        this._feet = this._height;
        this._height = this._feet%12;
        this._feet = (this._feet-this._height)/12;
        this._weight = Number((this._weight/0.45).toFixed(2));
        this._height = Number((this._height).toFixed(2));
      }
    }else{
      this._measureSys = 'metric';
      if(this._height != null || this._weight != null){
        this._height = Number((this._height*2.54 + this._feet*12*2.54).toFixed(2));
        this._weight = Number((this._weight*0.45).toFixed(2));

      }
    }
  }

  get feet(){
    return this._feet;
  }

  set feet(f: number){
    this._feet = Number(f.toFixed(2));
  }

  get height() {
    return this._height;
  }

  set height(h: number) {
    this._height = Number(h.toFixed(2));
  }

  get weight() {
    return this._weight;
  }

  set weight(w: number) {
    this._weight = Number(w.toFixed(2));
  }
  

  get bmi() {
    return this.bmiVal;
    
  }

  get heightUnit(){
    if(this._measureSys=='imperial'){
      return 'inches';
    }
    return 'centimeters';
  }

  get heightFeet(){
    return 'feet';
  }

  get weightUnit(){
    if(this._measureSys=='imperial'){
      return 'pounds';
    }
    return 'kilograms';
  }

}
