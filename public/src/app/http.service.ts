import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { 
}

getAllNews(){
 return this._http.get("https://newsapi.org/v2/everything?q=tech&from=2019-09-23&sortBy=popularity&apiKey=44b0e2e4e0604086ab4ce55b311ebb48")
}
}
