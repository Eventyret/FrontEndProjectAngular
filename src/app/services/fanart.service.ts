import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



@Injectable()
export class FanartService {


  private imdbID: string;
  private API_KEY: string = environment.FANART_KEY;
  private API_URL: string = environment.FANART_URL;
  private endstring: string = '?api_key=' + this.API_KEY;

  constructor(private http: Http) {}


    private handleError(err){
	    let errMessage: string;

		  if (err instanceof Response){
				let body = err.json() || '';
				let error = body.error || JSON.stringify(body);
				errMessage = `${err.status}  ${err.statusText || '' } ${error}`
		  } else {
			  errMessage = err.message ? err.message : err.toString();
		  }
		  return Observable.throw(errMessage);
  }

  getArt(imdbID) {
	return this.http.get(this.API_URL + imdbID + this.endstring)
	.map(res =>res.json())
	.catch(this.handleError);
	}
}