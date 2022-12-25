import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ElementsService } from './elements.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'periodicTable';

  elementData = new Array;
  dataGroup!: FormGroup;

  constructor(private eleService: ElementsService, private formBuild: FormBuilder){}

  ngOnInit(): void {
    this.dataGroup =  this.formBuild.group({
      "atomicNo": ['',[validateNumber]],
      "name": ['',[validateName]],
      "symbol": ['',[validateSymbol]],
      "atomicWt": ['',[validateWeight]]
    });

    this.eleService.getElements().subscribe((val) => {
      if(val!=null){
        localStorage.setItem("elementData",JSON.stringify(val));
        this.elementData = JSON.parse(localStorage.getItem("elementData") || "[]");
      }
    });

    this.elementData = JSON.parse(localStorage.getItem("elementData") || "[]");

  }

  onAdd(){
    this.eleService.postElements(
      this.dataGroup.controls["name"].value,
      this.dataGroup.controls["symbol"].value,
      this.dataGroup.controls["atomicNo"].value,
      this.dataGroup.controls["atomicWt"].value
    ).subscribe((res) => {
        console.log(res);
        if(typeof(res)=="object"){
          this.elementData.push({
            "name": this.dataGroup.controls["name"].value,
            "symbol": this.dataGroup.controls["symbol"].value,
            "atomicNumber": this.dataGroup.controls["atomicNo"].value,
            "atomicWeight": this.dataGroup.controls["atomicWt"].value,
          })
          localStorage.setItem("elementData",JSON.stringify(this.elementData));
        }
      },(error) => {
        if(error["status"] === 409){
          alert("Already Exists")
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
  let name_regexp = /^[A-Z][a-z]+/;
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