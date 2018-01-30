import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()

export class ContentPageService {

  APIKey: string = "a6ffbc3c2a4dd66577851418f32b6da0";
  basePath: string = "https://api.themoviedb.org/3/";

  constructor(private http: Http) {
    
  }

  // Set HTTP REQUEST header
  setAuthHeader(): RequestOptions {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    return new RequestOptions({
      headers: headers
    });
  }

  sendMovieDetailsRequest(movieId) {
    return this.http.get(`${this.basePath}movie/${movieId}?api_key=${this.APIKey}&language=en-US`
      , this.setAuthHeader())
      .map(response => response.json());
  }

  sendMovieDetails(movieId) {
    console.log(`ready to do HTTP GET, sendMovieDetailsRequest(movieId) called`);
    return new Promise((resolve, reject) => {
      this.sendMovieDetailsRequest(movieId)
        .subscribe(
          (result: any) => {
            resolve(result);
          },
          (error: any) => {
            console.log(`Error received in calling this.sendMovieDetailsRequest(movieId)`);
            reject(error);
          }
        )
    });
  }

}