import { FanartService } from './../../services/fanart.service';
import { MovieListComponent } from './../movie-list/movie-list.component';
import { OmdbService } from '../../services/omdb.service';
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
  errorMsg: string = '';

  constructor(private omdbService: OmdbService, private fanartService: FanartService) {
    this.omdbService.getSingleMovie(this.imdbID).subscribe(movie => {

      this.movie = movie;
      console.log(this.movie)
      this.actors = movie.Actors.split(",");
      this.genres = movie.Genre.split(",");
      this.slashgenres = movie.Genre.replace(/,/g, " /");
      this.slashlang = movie.Language.replace(/,/g, " /");
    })

    this.fanartService.getArt(this.imdbID).subscribe(artwork => {
      this.artwork = artwork;
      this.posters = artwork.movieposter;
      console.log(artwork)
      
      if(this.backgroundimage == "N/A" || artwork.status == 404){
        this.backgroundimage = "http://i.imgur.com/INQOKzN.png";
      } else {
        this.backgroundimage = artwork.moviebackground[0].url;
      }
      document.getElementById("page-top").style.backgroundImage = "url('" + this.backgroundimage + "')";
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
