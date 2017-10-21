import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FanartService {


  private imdbID: string;
  private API_KEY: string = environment.FANART_API_KEY;
  private API_URL: string = environment.FANART_URL;
  private endstring: string = '?api_key=' + this.API_KEY;


  constructor(private http: Http) {
  }

  getArt(imdbID) {
    return this.http.get(this.API_URL + imdbID + this.endstring)
      .map(res => res.json());
  }

}
