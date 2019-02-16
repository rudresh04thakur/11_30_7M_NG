import { Component, OnInit } from '@angular/core';
import { AllService } from '../all.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private _ser:AllService, private _ar:ActivatedRoute) { }
  user:any;
  ngOnInit() {
    this._ser.getUserById(this._ar.snapshot.params.id).subscribe((res)=>{
      this.user = res;
    })
  }

}
