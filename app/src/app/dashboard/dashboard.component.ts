import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  title = 'periodicTable';
  user = "User"

  elementData = new Array;
  dataGroup!: FormGroup;

  constructor(private service: DashboardService, private formBuild: FormBuilder){}

  ngOnInit(): void {
    this.dataGroup =  this.formBuild.group({
      "atomicNo": ['',[validateNumber]],
      "name": ['',[validateName]],
      "symbol": ['',[validateSymbol]],
      "atomicWt": ['',[validateWeight]]
    });

    this.elementData = this.service.getData();
    this.user = this.service.getUser();

  }

  onAdd(){
    this.service.postElements(
      this.dataGroup.controls["name"].value,
      this.dataGroup.controls["symbol"].value,
      this.dataGroup.controls["atomicNo"].value,
      this.dataGroup.controls["atomicWt"].value
    ).subscribe((res) => {
        // console.log(res);
        if(typeof(res)=="object"){
          this.elementData.push({
            "name": this.dataGroup.controls["name"].value,
            "symbol": this.dataGroup.controls["symbol"].value,
            "atomicNumber": this.dataGroup.controls["atomicNo"].value,
            "atomicWeight": this.dataGroup.controls["atomicWt"].value,
          })
          this.service.setData(this.elementData);
        }
      },(error) => {
        // console.log(error)
        if(error["status"] === 409){
          alert(error["error"] + " already exists");
        }
      }
      );
  }

  get elementNo(){
    return this.elementData.length;
  }

  sort(data: Array<any>){
    return data.sort((a,b) => a["atomicNumber"] - b["atomicNumber"]);
  }

  validate(){
    if((this.dataGroup.controls["name"].value == "") &&
      (this.dataGroup.controls["symbol"].value == "") &&
      (this.dataGroup.controls["atomicNo"].value == "") &&
      (this.dataGroup.controls["atomicWt"].value == "")){
      return true;
    }
    return false;
  }

}

function validateNumber(num: FormControl): any {
  let number_regexp = /^[1-1]?[0-9]?[0-9]?$/;
  // if(num.value == ""){
  //   return true;
  // }
  return number_regexp.test(num.value) ? null : {
    numberInvalid: {
      message: "Invalid Atomic Number"
    }
  };
}

function validateName(str: FormControl): any {
  let name_regexp = /^[A-Z][a-z]{2,13}/;
  if(str.value == ""){
    return true;
  }
  return name_regexp.test(str.value) ? null : {
    nameInvalid: {
      message: "Invalid Name"
    }
  };
}

function validateSymbol(str: FormControl): any {
  let symbol_regexp = /^[A-Z][a-z]?$/;
  if(str.value == ""){
    return true;
  }
  return symbol_regexp.test(str.value) ? null : {
    symbolInvalid: {
      message: "Invalid Symbol"
    }
  };
}

function validateWeight(num: FormControl): any {
  let weight_regexp = /^(\d+)(\.\d{1,4})?$/;
  if(num.value == ""){
    return true;
  }
  return weight_regexp.test(num.value) ? null : {
    weightInvalid: {
      message: "Invalid Atomic Weight"
    }
  };
}