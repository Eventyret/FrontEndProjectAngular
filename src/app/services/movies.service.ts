import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class MoviesService {
  private query: string;
  private API_KEY: string = environment.RADARR_API_KEY;
  private API_URL: string = environment.RADARR_URL;
  constructor() { }

}
