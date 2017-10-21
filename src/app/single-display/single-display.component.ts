import { FanartService } from './../services/fanart.service';
import { MovieListComponent } from './../movie-list/movie-list.component';
import { OmdbService } from './../services/omdb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-display',
  templateUrl: './single-display.component.html',
  styleUrls: ['./single-display.component.css']
})
export class SingleDisplayComponent implements OnInit {
  movie: any[];
  imdbID: string = sessionStorage.getItem('imdbID');
  Poster: string;
  Title: string;
  artwork: any[];
  backgroundimage: string;

  constructor(private omdbService: OmdbService, private fanartService: FanartService) {
    this.omdbService.getSingleMovie(this.imdbID).subscribe(movie => {
      this.movie = movie;
      console.log(this.movie)
    this.fanartService.getArt(this.imdbID).subscribe(artwork=>{
      this.artwork = artwork;
      this.backgroundimage = artwork.moviebackground[0].url;
      console.log(artwork) // for testing purposes
      document.getElementById("page-top").style.backgroundImage = "url('" + this.backgroundimage + "')";
    })
    })

  }
  handleSuccess(data) {
    this.movie = data;
    console.log(data);
  }
  handleError(error) {
    console.log(error);
  }
  handleArtwork(artwork){
    this.artwork = artwork;
  }

  searchMovies(imdbID: string) {
    return this.omdbService.getSingleMovie(imdbID).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    )
  }
  getBackground(imdbID: string){
    return this.fanartService.getArt(imdbID).subscribe(
      artwork => this.handleArtwork(artwork),
      error => this.handleError(error)
    )
  }
  ngOnInit() {
    this.imdbID;
  }

}
