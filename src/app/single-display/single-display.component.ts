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

  constructor(private omdbService: OmdbService) {
    this.omdbService.getSingleMovie(this.imdbID).subscribe(movie => {
      this.movie = movie;
      console.log(this.movie)
    })

  }

  handleSuccess(data) {
    this.movie = data;
    console.log(data);
  }
  handleError(error) {
    console.log(error);
  }

  searchMovies(imdbID: string) {
    return this.omdbService.getSingleMovie(imdbID).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    )
  }

  ngOnInit() {
    this.imdbID;
  }

}
