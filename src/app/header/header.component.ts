import { Component, OnInit, Input } from '@angular/core';
import { AllService } from '../all.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input('username') userName;
  menus = [
    { title: "Home", path: "home" },
    { title: "Login", path: "login" },
    { title: "Register", path: "register" },
    {
      title: "More",
      path: "#",
      child: [
        { title: "About", path: 'about' },
        { title: "Contact", path: 'contact' }
      ]
    }
  ]
  constructor(private _ser: AllService,private _r:Router) { }
  activeUser: any;
  ngOnInit() {
    this._r.events.subscribe(()=>{
      this._ser.heartBit(localStorage.getItem('sid')).subscribe((res) => {
        this.setData(res);
      });
    })
  }
  setData(data) {
    environment.activeUser = data;
    this.activeUser = environment.activeUser;
  }

}
