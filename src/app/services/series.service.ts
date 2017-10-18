import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class SeriesService {
  private query: string;
  private API_KEY: string = environment.SONARR_API_KEY;
  private API_URL: string = environment.SONARR_URL;
  constructor() { }

}
