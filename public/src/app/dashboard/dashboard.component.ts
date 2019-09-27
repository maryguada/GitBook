import { Component, OnInit, HostListener } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [],
})
export class DashboardComponent implements OnInit {
  allnews:any
  news:any
  allPosts: any;
  recentPosts: any;
  displayedPosts: any;
  postCount = 5;
  loading: boolean;
  
  
  constructor(
    private _router: Router,private _httpService: HttpService) { }

  ngOnInit() {
    this.getNews();
    this.getPosts();
    this.getRecentPosts();
  }
  getNews(){
    this._httpService.getAllNews().subscribe(data=>{
      this.allnews=data['articles'].splice(0,10);
    })
  }

  getPosts(){
    this._httpService.getAllPosts().subscribe(data => {
      console.log(data)
      console.log(data)
      this.allPosts = data;
    })
  }

  getRecentPosts(){
    this._httpService.getRecentPosts(this.postCount).subscribe(data => {
      this.loading = true;
      this.recentPosts = data;
      for(let i=0;i<this.recentPosts.length;i++){
        this.recentPosts[i].createdAt = formatDate(this.recentPosts[i].createdAt);
      }
    })
    for(let i=0;i<2000000000;i++){
      let j = i+i;
    }
    this.loading = false;
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
      // visible height + pixel scrolled >= total height 
      if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
        console.log("End");
        this.postCount += 5;
        this.getRecentPosts();
      }
  }
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

