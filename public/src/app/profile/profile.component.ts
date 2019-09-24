import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; 
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _httpService: HttpService,
    private _router: Router) { }

  ngOnInit() {
    this.getNews(); 

  }
  getNews(){
    this._httpService.getAllNews().subscribe(data=>{
      console.log(data)
      this.allnews=data['articles'];
    })
  }

}
