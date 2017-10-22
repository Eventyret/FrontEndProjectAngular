import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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
     return this.http.get(this.API_URL + '?s=' + query + this.endstring + '&type=movie' )
      .map(res => res.json())
        .catch(this.handleError);
  }

  getSingleMovie(imdbID){
    return this.http.get(this.API_URL + '?i=' + imdbID + this.endstring + '&plot=full')
    .map(res => res.json())
      .catch(this.handleError);
  }
  handleError(error) {
    console.error(error);
    return Observable.throw(error);
  }

}
