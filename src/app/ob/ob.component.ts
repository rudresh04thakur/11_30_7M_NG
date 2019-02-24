import { Component, OnInit } from '@angular/core';
import { AllService } from '../all.service';

@Component({
  selector: 'app-ob',
  templateUrl: './ob.component.html',
  styleUrls: ['./ob.component.css']
})
export class ObComponent implements OnInit {

    employees = [];
    constructor(private _ser: AllService) {}
    ngOnInit() {
        const employeesObservable = this._ser.getEmployees();
          employeesObservable.subscribe((employeesData) => {
            this.employees = employeesData;
        });
    }
}
