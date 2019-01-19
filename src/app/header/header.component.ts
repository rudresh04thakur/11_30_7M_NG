import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menus =[
    {title:"Home",path:"home"},
    {title:"Login",path:"login"},
    {title:"Register",path:"register"},
    {
      title:"More",
      path:"#",
      child:[
        {title:"About",path:'about'},
        {title:"Contact",path:'contact'}
      ]
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
