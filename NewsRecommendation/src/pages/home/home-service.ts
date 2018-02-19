import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()

export class HomePageService {

  APIKey: string = "a6ffbc3c2a4dd66577851418f32b6da0";
  basePath: string = "https://api.themoviedb.org/3/";

  constructor(private http: Http) {

  }

  // Set HTTP REQUEST header
  setAuthHeader(): RequestOptions {
    var headers = new Headers();
    // headers.append("Authorization", "Bearer " + this.writeToken);
    headers.append("Content-Type", "application/json");

    return new RequestOptions({
      headers: headers
    });
  }

  sendNowPlayingMoviesRequest(page) {
    return this.http.get(`${this.basePath}movie/now_playing?api_key=${this.APIKey}&language=en-US&page=${page}`
      , this.setAuthHeader())
      .map(response => response.json());
  }

  getNowPlayingMovies(page) {
    console.log(`ready to do HTTP GET, sendNowPlayingMoviesRequest() called`);
    return new Promise((resolve, reject) => {
      this.sendNowPlayingMoviesRequest(page)
        .subscribe(
          (result: any) => {
            resolve(result);
          },
          (error: any) => {
            console.log(`Error received in calling this.sendNowPlayingMoviesRequest()`);
            reject(error);
          }
        )
    });
  }

}
