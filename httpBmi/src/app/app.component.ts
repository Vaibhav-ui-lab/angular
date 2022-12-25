import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'httpBmi';
  private _height!: number;
  private _heightUnit = "m";
  private _weight!: number;
  private _weightUnit = "kg";
  data!: any;
  heightData!: any;
  weightData!: any;
  bmiVal!: any;

  constructor(private dataService: DataService){
    dataService.getData().subscribe((res) => {
      this.data = res;
      this.heightData = this.data["heightUnits"];
      this.weightData = this.data["weightUnits"];
    });
  }

  onCalc(){
    this.dataService.postData(this._heightUnit, this._height, this._weightUnit, this._weight)
    .subscribe((res) => {
      this.bmiVal = res;
    });
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
    return this.bmiVal;
    
  }

  get heightUnit(){
    return this._heightUnit;
  }

  set heightUnit(hu: string){
    this._heightUnit = hu;
  }

  get weightUnit(){
    return this._weightUnit;
  }

  set weightUnit(wu: string){
    this._weightUnit = wu;
  }

}
