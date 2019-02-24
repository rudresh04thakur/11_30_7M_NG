import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import {Http} from '@angular/http';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
//const header = new HttpHeaders().set({"":""})
export const httpOptions = {
  headers: new HttpHeaders()
    .append("Access-Control-Allow-Methods", "*")
    .append("Access-Control-Request-Headers", "*")
    .append("Access-Control-Allow-Origin", "*")
};

@Injectable({
  providedIn: "root"
})
export class AllService {
  constructor(private _http: HttpClient) {}

  employee = [
    {
      id: 1,
      name: "Gopal",
      desig: "Project Manager",
      dept: "IT Dev",
      company: "GBT"
    },
    {
      id: 2,
      name: "Ganesh",
      desig: "Manager",
      dept: "IT Dev",
      company: "GBT"
    },
    {
      id: 1,
      name: "Mahesh",
      desig: "Developer",
      dept: "IT Dev",
      company: "GBT"
    }
  ];
  register(data) {
    return this._http
      .post("http://localhost/client_api_2/register.php", data)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getUsers() {
    return this._http
      .post("http://localhost/client_api_2/getUsers.php", null)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getUserById(id) {
    return this._http
      .get("http://localhost/client_api_2/getUserById.php?id=" + id)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  update(data) {
    return this._http
      .post("http://localhost/client_api_2/update.php", data)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  delete(id) {
    return this._http
      .get("http://localhost/client_api_2/delete.php?id=" + id)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  login(data) {
    return this._http
      .post("http://localhost/client_api_2/login.php", data)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  heartBit(id) {
    return this._http
      .post("http://localhost/client_api_2/checkLife.php", id)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getEmployees(): any {
    const employeesObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.employee);
      }, 2000);
    });

    return employeesObservable;
  }
}
