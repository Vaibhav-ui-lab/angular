import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  private nameAlert = "";
  private pwdAlert = "";

  constructor(
    private router: Router,
    private formBuild: FormBuilder,
    private service: DashboardService,
    ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuild.group({
      username: ['',[validateUsername]],
      password: ['',[validatePassword]]
    });
  }

  onSubmit(){
    const user = this.loginForm.controls['username'].value;
    const pwd = this.loginForm.controls['password'].value;

    if(user != "" && pwd != ""){
      this.service.setUser(user);
      this.service.logUser(user,pwd)
    } else if(user == "" && pwd == ""){
      this.setNameAlert("Username required");
      this.setPwdAlert("Password required");
    } else if(user == ""){
      this.setNameAlert("Username required");
    } else if(pwd == ""){
      this.setPwdAlert("Password required");
    }
  }

  onClickName(){
    this.setNameAlert("");
  }

  onClickPwd(){
    this.setPwdAlert("");
  }

  getNameAlert(){
    return this.nameAlert;
  }

  setNameAlert(str: string){
    this.nameAlert = str;
  }

  getPwdAlert(){
    return this.pwdAlert;
  }

  setPwdAlert(str: string){
    this.pwdAlert = str;
  }

}

function validateUsername(str: FormControl): any {
  let name_regexp = /\w{3,99}/;
  if(str.value == ""){
    return true;
  }
  return name_regexp.test(str.value) ? null : {
    userInvalid: {
      message: "Should have atleast 3 characters"
    }
  };
}

function validatePassword(str: FormControl): any {
  let name_regexp = /^[a-zA-Z0-9!@#$%^&*]{4,36}$/;
  if(str.value == ""){
    return true;
  }
  return name_regexp.test(str.value) ? null : {
    passwordInvalid: {
      message: "Should have atleast 4 characters"
    }
  };
}