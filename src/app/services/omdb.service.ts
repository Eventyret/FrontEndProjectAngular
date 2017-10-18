import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';


@Injectable()
export class OmdbService {

  private query: string;
  private API_KEY: string = environment.OMDB_API_KEY;
  private API_URL: string = environment.OMDB_API_URL;
  constructor() { }

}
