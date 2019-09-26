import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  allnews:any
  news:any
  
  constructor(
    private _router: Router,private _httpService: HttpService) { }

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
