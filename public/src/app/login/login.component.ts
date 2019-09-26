import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  err: any;
  user: any;
  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
    this.err = {}
    this.user = { "username": "", "password": "" }
  }

  onSubmitLogin() {
    this._httpService.login(this.user).subscribe(success => {
      if (success) {
        this._router.navigate(['/dashboard'])
      }
    })
  }

  // gitAuth() {
  //   this._httpService.githubAuth().subscribe(data=>{
  //     console.log(data)
  //   })
  // }

}
