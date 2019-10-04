import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { config } from './config';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from './token'
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) {
  }
   addComment(postId, comment){
     return this.http.post(`/comment/${postId}`, comment)
   }

  getAllPosts(){
    return this.http.get("/posts");
  }

  createPost(userPk, newPost){
    return this.http.post(`/post/${userPk}`, newPost)
  }
  
  getRecentPosts(count){
    console.log("recent posts...", count)
    return this.http.get("/recentposts/"+count);
  }
  getAllNews() {
    return this.http.get("https://newsapi.org/v2/everything?q=tech&from=2019-09-23&sortBy=popularity&apiKey=44b0e2e4e0604086ab4ce55b311ebb48")
  }
  createUser(newUser) {
    return this.http.post("/user", newUser).toPromise();
  }
  validateUser(loginInfo) {
    return this.http.post("/login", loginInfo).toPromise();
  }
  login(user): Observable<boolean> {
    return this.http.post<any>(`/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout() {
    return this.http.post<any>(`${config.apiUrl}/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${config.apiUrl}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
