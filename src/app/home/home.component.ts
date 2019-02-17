import { Component, OnInit } from '@angular/core';
import { AllService } from '../all.service';
import { environment } from '../../environments/environment'

import { Router } from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any;
  constructor(private _ser: AllService, private _r: Router) { }

  ngOnInit() {
    this._ser.heartBit(localStorage.getItem('sid')).subscribe((res)=>{
      environment.activeUser = res;
    });
    this._ser.getUsers().subscribe((res) => {
      this.users = res;
    })
  }
  
  delete(id) {
    this._ser.delete(id).subscribe((res) => {
      this._ser.getUsers().subscribe((res) => {
        this.users = res;
      })
    })
  }

}
