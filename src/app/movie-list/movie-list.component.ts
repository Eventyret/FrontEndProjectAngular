import { MovieService } from './../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { OmdbService } from './../services/omdb.service';
import { TruncateModule } from 'ng2-truncate';
import { CapitalizePipe } from '../trim.pipe';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[];
  ownMovies: any[];
  imdbID: any[];
  type: string;
  moviesFound: boolean = false;
  searching: boolean = false;

  constructor(private omdbService: OmdbService, private movieService: MovieService) { 

  }

  handleSuccess(data){
    this.moviesFound = true;
    this.movies = data.Search;
    console.log(data.Search);
  }
  handleOwnMovies(info){
    this.moviesFound = true;
    this. ownMovies = info;
    console.log(info);
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
    );
  }

checkOwnMovies(){
  return this.movieService.checkMovies().subscribe(
    info => this.handleOwnMovies(info),
    error => this.handleError(error),
    () => this.searching = false
  );
}

  storeMovie(imdbID, type ){
      sessionStorage.setItem("imdbID", imdbID);
      sessionStorage.setItem("type", type )
      
      console.log(imdbID)
    }

  ngOnInit() {
    this.checkOwnMovies();
  }

}
