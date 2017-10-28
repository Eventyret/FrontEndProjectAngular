import { SearchService } from '../../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-display',
  templateUrl: './single-display.component.html',
  styleUrls: ['./single-display.component.css']
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
  movieInfo:Object = JSON.parse(sessionStorage.getItem('movieInfo'));
  
  // Single outputs from arrays
  Poster: string;
  backgroundimage: string;
  slashgenres: string;
  slashlang: string;

// Error & Status Messages Messages (Needs cleanup)
  errorMsg: string;
  showSpinner: boolean = true;


  constructor(private searchService: SearchService) {
      this.searchService.getSingleMovie(this.imdbID).subscribe(movie => {
      this.movie = movie;
      this.Title = movie.Title
      this.actors = movie.Actors.split(",");
      this.slashgenres = movie.Genre.replace(/,/g, " /");
      this.slashlang = movie.Language.replace(/,/g, " /");
        this.ratings = movie.Ratings
        this.showSpinner = false;
    }),
    (error)=> {
        /* console.log(error) */
            }, 
            () => {
                console.log("Single Movie Loading Complete")
}

    // Lets go get our fanart data.
 
  }

    // this is how we handle our data we get back for a single movie
  handleSuccess(data) {
    this.movie = data;
    /* console.log(data); */
  }
  ngOnInit() {
    this.imdbID;
  }

}
