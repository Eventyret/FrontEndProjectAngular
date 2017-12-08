import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import * as _ from "lodash";

@Injectable()
export class SearchService {
	constructor(private http: Http) {}

	private query: string;
	private imdbID: string;
	private OMDB_KEY: string = environment.OMDB_KEY;
	private OMDB_URL: string = environment.OMDB_URL;
	private OMDB_STRING: string = "&apikey=" + this.OMDB_KEY;
	private RADARR_KEY: string = environment.RADARR_KEY;
	private RADAR_URL: string = environment.RADARR_URL;
	private RADAR_STRING: string = "?apikey=" + this.RADARR_KEY;

	private handleError(error: Response) {
			return Observable.throw(error);
		}

	getMovies(query) {
		return this.http
			.get(this.OMDB_URL + "?s=" + query + this.OMDB_STRING + "&type=movie")
			.map(res => res.json())
			.catch(this.handleError);
	}

	getSingleMovie(imdbID) {
		return this.http
			.get(this.OMDB_URL + "?i=" + imdbID + this.OMDB_STRING + "&plot=full")
			.map(res => res.json())
			.catch(this.handleError);
	}

	checkMovies() {
		return this.http
			.get(this.RADAR_URL + this.RADAR_STRING)
			.map(res => res.json())
			.catch(this.handleError);
	}
}
