import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../register/register.component.css']
})
export class LoginComponent implements OnInit {

  loginF :FormGroup;
  constructor(private _fb:FormBuilder) {
    this.loginF = this._fb.group({
      email:['',[Validators.required,Validators.pattern("[a-zA-Z0-9]{3,}[@]{1}[a-zA-Z]{3,}[.]{1}[a-zA-Z]{2,}")]],
      password:['',[Validators.required,Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]],
    })
   }

   OnLogin(data){
     console.log(data);
   }

  ngOnInit() {
  }

}
