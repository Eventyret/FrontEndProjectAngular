import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import _ from "lodash";


@Injectable()
export class ImdbExtraInfoService {

private movie_url: string = environment.IMDB_MOVIE_URL;
private actor_url: string = environment.IMDB_ACTOR_URL;
private endstring_actor: string = '?person_id';
private endstring_movie: string = '?movie_id';
private movieID: string;
private actorID: string;

  constructor(private http: Http) { 

  }

  getExtraMovieInfo(){
	return this.http.get(this.movie_url + this.endstring_movie + this.movieID)
		.map((res: Response): Promise<any> => {
			return res.json();
		})
		.catch((error: Response) => {
			return Observable.throw(error.json());
		});
  }

	getActorInfo() {
		return this.http.get(this.actor_url + this.endstring_actor + this.actorID)
			.map((res: Response): Promise<any> => {
				return res.json();
			})
			.catch((error: Response) => {
				return Observable.throw(error.json());
			});
	}
}
