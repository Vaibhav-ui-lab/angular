import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signForm!: FormGroup;
  private nameAlert = "";
  private pwdAlert = "";

  constructor(
    private formBuild: FormBuilder,
    private service: DashboardService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.signForm = this.formBuild.group({
      username: ['',[validateUsername]],
      password: ['',[validatePassword]]
    });
  }

  onSubmit(){
    const user = this.signForm.controls['username'].value;
    const pwd = this.signForm.controls['password'].value;

    if(user != "" && pwd != ""){
      this.service.regUser(user,pwd)
      .subscribe(() => {},
      (error) => {
        // console.log(error)
        if(error["status"] === 409){
          alert("Username already exists.")
        }else if(error["status"] === 201){
          alert("Successfully registered.")
          this.router.navigate(['/login'])
        }
      });
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