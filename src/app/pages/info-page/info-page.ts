import { SearchService } from '../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { NgbTabset, NgbRating } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'info-page',
  templateUrl: './info-page.html',
  styleUrls: ['./info-page.css']
})
export class SingleDisplayComponent implements OnInit {
  // Different Arrays to hold data
  movie: any[];
  artwork: any[];
  posters: any[];
  actors: any[]
  genres: any[]
  ratings: any[]
  Title: string;

  // Storing data to use in Single-Display Component
  imdbID: string = sessionStorage.getItem('imdbID');
  type: string = sessionStorage.getItem('type');
  movieInfo:any
  // Single outputs from arrays
  Poster: string;
  backgroundimage: string;
  slashgenres: string;
  slashlang: string;

// Error & Status Messages Messages (Needs cleanup)
  errorMsg: string;
  showSpinner: boolean = true;
  extrainfo: any[];;
  cast: any[]
  loaded: boolean = false;


  constructor(private searchService: SearchService) {
      this.searchService.getSingleMovie(this.imdbID).subscribe(movie => {
      this.movie = movie;
      this.Title = movie.Title
      this.actors = movie.Actors.split(",");
      this.slashlang = movie.Language.replace(/,/g, " /");
      this.ratings = movie.Ratings
      this.showSpinner = false;
    }),
    (error)=> {

            }, 
            () => {
                console.log("Single Movie Loading Complete")
}
// Lets grab some extra information for this movie.
    this.searchService.getExtraMovieInfo(this.imdbID).subscribe(extrainfo => {
      this.extrainfo = extrainfo
      this.cast = extrainfo.cast
      console.log(this.extrainfo);
      this.showSpinner = false;
      this.loaded = true;
    }),
      (error) => {
        console.log(error)
      }
  }
  handleSuccess(data) {
    this.movie = data;
  }
  ngOnInit() {
    this.imdbID;
    if (localStorage["movieInfo"]) {
      this.movieInfo = JSON.parse(sessionStorage.getItem('movieInfo'));
    } else {
      console.log("Its undefined")
    }
  }

}
