import { Component, OnInit } from '@angular/core';
import { SearchService } from './../../services/search.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'casting-component',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {

  extrainfo: any[];;
  cast: any[]
  imdbID: string = sessionStorage.getItem('imdbID');
  movieInfo: Object = JSON.parse(sessionStorage.getItem('movieInfo'));
  showSpinner: boolean = true;
  constructor(private searchService: SearchService) {

      this.searchService.getExtraMovieInfo(this.imdbID).subscribe(extrainfo => {
      this.extrainfo = extrainfo
      this.cast = extrainfo.cast
      console.log(this.extrainfo);
      this.showSpinner = false;
    }),
      (error) => {
        console.log(error)
      }
   }

  ngOnInit() {
  }

}
