import { Component, OnInit,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AllService } from '../all.service'
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../register/register.component.css']
})
export class LoginComponent implements OnInit {
  loginF :FormGroup;
  constructor(private _fb:FormBuilder,private _ser:AllService,private _r:Router) {
    this.loginF = this._fb.group({
      email:['',[Validators.required,Validators.pattern("[a-zA-Z0-9]{3,}[@]{1}[a-zA-Z]{3,}[.]{1}[a-zA-Z]{2,}")]],
      password:['',[Validators.required,Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]],
    })
   }
   OnLogin(data){
     this._ser.login(data).subscribe((res)=>{
       if(res['class']=="success"){
        localStorage.setItem('sid',res['sid']);
        this._ser.heartBit(localStorage.getItem('sid')).subscribe((res)=>{
          environment.activeUser = res;
        });
        this._r.navigate(["/home"]);
      }
       //console.log(res);
     })
     //console.log(data);
   }

  ngOnInit() {
  }

}
