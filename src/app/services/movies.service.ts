import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {

  private API_KEY: string = environment.RADARR_API_KEY;
  private API_URL: string = environment.RADARR_URL;
  private endstring: string = '?apikey=' + this.API_KEY;


  constructor(private http: Http) {
  }

  checkMovies() {
    return this.http.get(this.API_URL + this.endstring)
      .map(res => res.json());
  }

}
