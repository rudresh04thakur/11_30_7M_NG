import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AllService } from '../all.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = "Register";
  regF = {
    id: '',
    name: '',
    email: '',
    contact: '',
    password: '',
    status:''
  }
  regiF: FormGroup;
  constructor(private _fb: FormBuilder, private _ser: AllService, private _ar: ActivatedRoute,private _r:Router) {
    this.regiF = this._fb.group({
      id: [''],
      name: ['Gopal Thakur', [Validators.required, Validators.pattern("[a-zA-Z]{3,}[ ]{1}[a-zA-Z]{3,}")]],
      email: ['gopal04thakur@gmail.com', [Validators.required, Validators.pattern("[a-zA-Z0-9]{3,}[@]{1}[a-zA-Z]{3,}[.]{1}[a-zA-Z]{2,}")]],
      contact: ['8983939246', [Validators.required, Validators.pattern("[0-9]{10}")]],
      password: ['Gop@l0540vbdv', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]],
      address: this._fb.group({
        city: ['Pune', [Validators.required, Validators.pattern("[a-zA-Z]{3,}")]],
        state: ['Maharashtra', [Validators.required, Validators.pattern("[a-zA-Z]{3,}")]]
      }),
      status: [''],
    })
  }

  ngOnInit() {
    if (this._ar.snapshot.params.id != undefined) {
      this.title = "Update";
      this.regiF.controls['id'].patchValue(this._ar.snapshot.params.id);
      this._ser.getUserById(this._ar.snapshot.params.id).subscribe((res) => {
        //console.log(res);
        this.regiF.patchValue(res);
        let address = <FormGroup>this.regiF.controls['address'];
        address.controls['city'].patchValue(res['city']);
        address.controls['state'].patchValue(res['state']);
        // this.regiF.controls['address'].controls['city'].patchValue(res['city']);
        // this.regiF.controls['address'].controls['state'].patchValue(res['state'])
      })
    }
  }

  OnRegister(data) {
    console.log(data);
    if (data.id != undefined && data.id != "") {
      this._ser.update(data).subscribe((res) => {
        console.log(res);
      })
    } else {
      this._ser.register(data).subscribe((res) => {
        console.log(res);
        this.regiF.reset();
      })
    }
    this._r.navigate(['/home']);
    //console.log(data);
  }
}
