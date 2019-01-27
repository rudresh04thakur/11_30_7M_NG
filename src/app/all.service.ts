import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import {Http} from '@angular/http';
import { map } from 'rxjs/operators';
//const header = new HttpHeaders().set({"":""})
const httpOptions = {
  headers: new HttpHeaders().append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
};

@Injectable({
  providedIn: 'root'
})
export class AllService {

  constructor(private _http: HttpClient) { }

  register(data) {
    return this._http.post("http://localhost/client_api_2/register.php", data, httpOptions).pipe(map((res) => { return res }));
  }

  getUsers(){
    return this._http.post("http://localhost/client_api_2/getUsers.php", null, httpOptions).pipe(map((res) => { return res }));
  }
}
