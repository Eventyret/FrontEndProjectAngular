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
  private RADARR_KEY: string = environment.RADARR_API_KEY;
  private RADAR_URL: string = environment.RADARR_URL;
  private RADAR_STRING: string = '?apikey=' + this.RADARR_KEY;
  private SONARR_KEY: string = environment.SONARR_API_KEY;
  private SONARR_URL: string = environment.SONARR_URL;
  private SONARR_STRING: string = '?apikey=' + this.SONARR_KEY

  constructor(private http: Http) {
   }
  
   getMovies(query) {
     return this.http.get(this.OMDB_URL + '?s=' + query + this.OMDB_STRING + '&type=movie' )
       .map((res: Response): Promise<any> => {
         return res.json();
       })
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
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
    return this.http.get(this.OMDB_URL + this.RADAR_STRING)
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

}
