import { MovieService } from './../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { OmdbService } from './../services/omdb.service';
import { TruncateModule } from 'ng2-truncate';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[];
  ownMovies: any[];
  imdbID: any[];
  moviesFound: boolean = false;
  searching: boolean = false;

  constructor(private omdbService: OmdbService, private movieService: MovieService) { 

  }

  handleSuccess(data){
    this.moviesFound = true;
    this.movies = data.Search;
    console.log(data.Search);
  }

  handleError(error){
    console.log(error);
  }

  searchMovies(query: string){
    this.searching = true;
    return this.omdbService.getMovies(query).subscribe(
      // data => console.log(data), // For testing purposes
      data => this.handleSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    )
  }

  storeMovie(imdbID){
      sessionStorage.setItem("imdbID", imdbID);
      console.log(imdbID)
    }

  ngOnInit() {
  }

}
