import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from './../../../environments/environment';
import { Movies } from './../models/movies';


@Injectable()
export class TmdbService {
	constructor(private http: HttpClient) {}

	private query: Movies;
	private TMDB_KEY: string = environment.TMDB_KEY;
	private TMDB_URL: string = environment.TMDB_URL;
	private TMDB_STRING: string = "search/movie?api_key=" + this.TMDB_KEY;

	private handleError(error: Response) {
		console.log(error);
		return Observable.throw(error);
	}

	tmdbInfo(query) {
		return this.http
			.get("https://api.themoviedb.org/3/find/" + query + "?api_key=01e113a071c57ddf8fa6b5a06c0a9fdc&external_source=imdb_id")
			.map(res => res)
			.catch(this.handleError);
	}
}
