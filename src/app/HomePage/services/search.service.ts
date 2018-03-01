import { Movie } from "./../models/movie";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { environment } from "../../../environments/environment";

@Injectable()
export class SearchService {
	constructor(private http: HttpClient) {}

	private query: Movie;
	private imdbID: string;
	private OMDB_KEY: string = environment.OMDB_KEY;
	private OMDB_URL: string = environment.OMDB_URL;
	private OMDB_STRING: string = "&apikey=" + this.OMDB_KEY;
	private RADARR_KEY: string = environment.RADARR_KEY;
	private RADAR_URL: string = environment.RADARR_URL;
	private RADAR_STRING: string = "?apikey=" + this.RADARR_KEY;

	private handleError(error: Response) {
		console.log(error);
		return Observable.throw(error);
	}

	getMovies(query: Movie) {
		return this.http
			.get<any>(this.OMDB_URL + "?s=" + query + this.OMDB_STRING + "&type=movie")
			.map(res => res)
			.catch(this.handleError);
	}

	getSingleMovie(imdbID) {
		return this.http
			.get<any>(this.OMDB_URL + "?i=" + imdbID + this.OMDB_STRING + "&plot=full")
			.map(res => res)
			.catch(this.handleError);
	}

	checkMovies() {
		return this.http
			.get<any>(this.RADAR_URL + this.RADAR_STRING)
			.map(res => res)
			.catch(this.handleError);
	}
}
