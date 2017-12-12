import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Observable";

@Injectable()
export class QuotesService {
	private url = "https://bella.digitalfairytales.net/api/1.1/tables/moviequotes/rows";
	constructor(private http: Http) {}

	private handleError(error: Response) {
		console.log(error);
		return Observable.throw(error);
	}

	getQuotes() {
		return this.http
			.get(this.url)
			.map(res => res.json())
			.catch(this.handleError);
	}
}
