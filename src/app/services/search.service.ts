import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import _ from "lodash";

@Injectable()
export class SearchService {

  private query: string;
  private imdbID: string;
  private OMDB_KEY: string = environment.OMDB_KEY;
  private OMDB_URL: string = environment.OMDB_URL;
  private OMDB_STRING: string = '&apikey=' + this.OMDB_KEY;
  private RADARR_KEY: string = environment.RADARR_KEY;
  private RADAR_URL: string = environment.RADARR_URL;
  private RADAR_STRING: string = '?apikey=' + this.RADARR_KEY;
  private SONARR_KEY: string = environment.SONARR_KEY;
  private SONARR_URL: string = environment.SONARR_URL;
  private SONARR_STRING: string = '?apikey=' + this.SONARR_KEY
  private movie_url: string = environment.IMDB_MOVIE_URL;
  private actor_url: string = environment.IMDB_ACTOR_URL;
  private endstring_actor: string = '?person_id=';
  private endstring_movie: string = '?movie_id=';
  private movieID: string;
  private actorID: string;

  constructor(private http: Http) {
   }
  handleError(error: Response | any) {
    return Observable.throw(new Error(error.status))
  }
  
   getMovies(query) {
     return this.http.get(this.OMDB_URL + '?s=' + query + this.OMDB_STRING + '&type=movie' )
       .map((res: Response): Promise<any> => {
         if (res.ok){
           return res.json();
         } else {
           this.handleError(res)
         }
       })
   }

  getSingleMovie(imdbID){
    return this.http.get(this.OMDB_URL + '?i=' + imdbID + this.OMDB_STRING + '&plot=full')
      .map((res: Response): Promise<any> => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }
  
  checkMovies() {
    return this.http.get(this.RADAR_URL + this.RADAR_STRING)
      .map((res: Response): Promise<any> => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }
  checkSeries(){
    return this.http.get(this.SONARR_URL + this.SONARR_STRING)
      .map((res: Response): Promise<any> => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  getExtraMovieInfo(movieID) {
    return this.http.get(this.movie_url + this.endstring_movie + movieID)
      .map((res: Response): Promise<any> => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  getActorInfo(actorID) {
    return this.http.get(this.actor_url + this.endstring_actor + this.actorID)
      .map((res: Response): Promise<any> => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }
}
