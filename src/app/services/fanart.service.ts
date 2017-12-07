import { AppError } from "./app.error";
import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { environment } from "./../../environments/environment";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { BadInput } from "./bad-input";

@Injectable()
export class FanartService {
	private imdbID: string;
	private API_KEY: string = environment.FANART_KEY;
	private API_URL: string = environment.FANART_URL;
	private endstring: string = "?api_key=" + this.API_KEY;

	constructor(private http: Http) {}

	getArt(imdbID) {
		return this.http
			.get(this.API_URL + imdbID + this.endstring)
			.map(res => res.json())
			.catch((error: Response) => {
					if (error.status === 400) {
						return Observable.throw(new BadInput(error.json()));
					} else {
						return Observable.throw(new AppError(error.json()));
					}
			});
	}
}
