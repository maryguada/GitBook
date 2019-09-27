import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTags : any;
  constructor(private _router: Router,private _httpService: HttpService) { }

  ngOnInit() {
    this.searchTags = {
      "tag":""
    }
  }

  searchForTags(){
    console.log("searching for: " , this.searchTags.tag)
    this._httpService.searchTags(this.searchTags.tag).subscribe(data => {
      console.log(data);
    })
  }
}
