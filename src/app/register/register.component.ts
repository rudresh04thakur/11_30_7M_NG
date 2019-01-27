import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms'
import { AllService } from '../all.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regF = {
    name:'',
    email:'',
    contact:'',
    password:''
  }
  regiF:FormGroup;
  constructor(private _fb :FormBuilder, private _ser: AllService) {
    this.regiF = this._fb.group({
      name:['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}[ ]{1}[a-zA-Z]{3,}")]],
      email:['',[Validators.required,Validators.pattern("[a-zA-Z0-9]{3,}[@]{1}[a-zA-Z]{3,}[.]{1}[a-zA-Z]{2,}")]],
      contact:['',[Validators.required,Validators.pattern("[0-9]{10}")]],
      password:['',[Validators.required,Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]],
      address: this._fb.group({
        city:['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}")]],
        state:['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}")]]
      })
    }) 
   }

  ngOnInit() {
  }

  OnRegister(data){
    this._ser.register(data).subscribe((res)=>{
      console.log(res);
    })
    //console.log(data);
  }
}
