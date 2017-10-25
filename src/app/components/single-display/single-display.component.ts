import { FanartService } from './../../services/fanart.service';
import { SearchService } from '../../services/search.service';
import { MovieListComponent } from './../movie-list/movie-list.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-display',
  templateUrl: './single-display.component.html',
  styleUrls: ['./single-display.component.css']
})
export class SingleDisplayComponent implements OnInit {
  movie: any[];
  imdbID: string = sessionStorage.getItem('imdbID');
  type: string = sessionStorage.getItem('type');
  Poster: string;
  Title: string;
  artwork: any[];
  posters: any[];
  backgroundimage: string;
  actors: any[]
  genres: any[]
  slashgenres: string;
  slashlang: string;
  statusMsg: string = 'Loading data. Please wait';
  searching: boolean = false;
  errorMsg: string;
  ratings:any[]

  constructor(private searchService: SearchService, private fanartService: FanartService) {
    this.searchService.getSingleMovie(this.imdbID).subscribe(movie => {
      this.movie = movie;
      console.log(this.movie)
      this.Title = movie.Title
      this.actors = movie.Actors.split(",");
      this.genres = movie.Genre.split(",");
      this.slashgenres = movie.Genre.replace(/,/g, " /");
      this.slashlang = movie.Language.replace(/,/g, " /");
      this.ratings = movie.Ratings
    })

    this.fanartService.getArt(this.imdbID).subscribe(artwork => {
      this.artwork = artwork;
      this.posters = artwork.movieposter;
        this.backgroundimage = artwork.moviebackground[0].url;
      document.getElementById("page-top").style.backgroundImage = "url('" + this.backgroundimage + "')";
    },
    (error) => {
      console.log(error)
      this.errorMsg = error["error message"];
      if(this.errorMsg == "Not found"){
        this.errorMsg = this.Title;
        document.getElementById("page-top").style.backgroundColor = "#2C3E50";
        /* document.getElementById("hdlogo").setAttribute ('src', "../../../assets/1pxtrans.png"); */
      }
    })
  }



  handleSuccess(data) {
    this.movie = data;
    console.log(data);
  }

  handleError(error) {
    this.fanartService.artworkIsEmptied.subscribe(error => {
      this.errorMsg = error;
    })
  }
  
  handleArtwork(artwork){
    this.artwork = artwork;
  }

  searchMovies(imdbID: string) {
    return this.searchService.getSingleMovie(imdbID).subscribe(
      data => this.handleSuccess(data)
    )
  }

  ngOnInit() {
    this.imdbID;
  }

}
