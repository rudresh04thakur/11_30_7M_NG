import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

  OnRegister(data){
    console.log(data);
  }
}
