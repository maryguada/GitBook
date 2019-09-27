import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gitbook';
  constructor(private _httpService: HttpService) { 
  }
}
