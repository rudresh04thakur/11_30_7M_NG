import { Component, OnInit } from '@angular/core';
import { AllService } from '../all.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users:any;
  constructor(private _ser: AllService) { }

  ngOnInit() {
    this._ser.getUsers().subscribe((res)=>{
      this.users = res;
    })
  }

}
