import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {

    constructor(public http: Http) {

    }

    getMovies() {
        return this.http.get('https://eventyret.uk/movies/api/movie?apikey=dba5025b517845b2910a7c31b4f8c4ba')
            .map(res => res.json());
    }

}
