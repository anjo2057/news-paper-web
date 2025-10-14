import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NewsService } from './news.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private user: User | null = null;

  private loginUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news/login';

  //private message: string | null = null;

  //private httpOptions = {
    //headers: new HttpHeaders()
      //.set('Content-Type', 'x-www-form-urlencoded')
  //};

  constructor(private http: HttpClient, private newsService: NewsService) {}

  isLogged(): boolean {
    return this.user != null;
  }

  getUser(): User | null {
    return this.user;
  }

  login(name: string, pwd: string): Observable<User> {
    const body = new HttpParams()
      .set('username', name)
      .set('passwd', pwd);
    
    const headers = new HttpHeaders ()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<User>(this.loginUrl, body, { headers }).pipe(
      tap((u) => {
        this.user = u;
        if (u?.apikey) {
          this.newsService.setUserApiKey(u.apikey);
        }
        console.log('Login sucess for:', u.username);
      }),
      catchError((err) => {
        this.user = null;
        this.newsService.setAnonymousApiKey();
        console.error('Login failed', err);
        return throwError(() => err);
      })
    );
  }

  logout(): void {
    this.user = null;
    this.newsService.setAnonymousApiKey();
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.user = null;
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
