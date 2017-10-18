import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OmdbService {


  private query: string;
  private API_KEY: string = environment.OMDB_API_KEY;
  private API_URL: string = environment.OMDB_URL;
  private endstring: string = '&plot=full&apikey=' + this.API_KEY;


  constructor(private http: Http) {
   }
  
   getMovies(query) {
    return this.http.get(this.API_URL + query + this.endstring)
      .map(res => res.json());
  }

}
