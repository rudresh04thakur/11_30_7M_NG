import { Component, OnInit } from '@angular/core';
import { AllService } from '../all.service';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
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
    this._r.events.subscribe(() => {
      this._ser.getUsers().subscribe((res) => {
        this.setUsers(res);
      })
    })
    this._ser.getUsers().subscribe((res) => {
        this.setUsers(res);
    })
  }
  setUsers(data) {
    this.users = data;
    //  console.log(data);
  }



  delete(id) {
    this._ser.delete(id).subscribe((res) => {
      this._ser.getUsers().subscribe((res) => {
        this.users = res;
      })
    })
  }

}
