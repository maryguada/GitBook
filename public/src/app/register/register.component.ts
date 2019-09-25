import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: any;
  err: {};

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }


  ngOnInit() {

    this.newUser = {
      "name": "",
      "username": "",
      "password": "",
      "confpassword": ""
    }
    this.err = {
      "name": "",
      "username": "",
      "password": "",
      "confpassword": ""
    }
  }

  onSubmitRegister() {
    if (this.newUser.password != this.newUser.confpassword) {
      this.err["confpassword"] = "Confirm password must be the same as password"
    }
    this._httpService.createUser(this.newUser)
      .then(data => {
        if (data['result'] === "failed") {
          console.log(data)
          for (let error of data['data']['errors']) {
            this.err[error.path] = error.message;
          }
          this._router.navigate(['/register'])
          console.log(this.err)
        } else {
          localStorage.setItem('token', data['data'])
          this._router.navigate(['/dashboard'])

        }
      })
      .catch(err => console.log(err))
  }

}
