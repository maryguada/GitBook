import { Component, OnInit, HostListener } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: []
})
export class DashboardComponent implements OnInit {
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
      this.allnews=data['articles'].splice(0,10);
      console.log(this.allnews.length);
    })
  }

@HostListener("window:scroll", [])
onScroll(): void {
if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log("bottom");
    }
}
}
