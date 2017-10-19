import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OmdbService {


  private query: string;
  private imdbID: string;
  private API_KEY: string = environment.OMDB_API_KEY;
  private API_URL: string = environment.OMDB_URL;
  private endstring: string = '&apikey=' + this.API_KEY;


  constructor(private http: Http) {
   }
  
   getMovies(query) {
     return this.http.get(this.API_URL + '?s=' + query + this.endstring)
      .map(res => res.json());
  }

  getSingleMovie(imdbID){
    return this.http.get(this.API_URL + '?i=' + imdbID + this.endstring + '&plot=full')
    .map(res => res.json());
  }

}
