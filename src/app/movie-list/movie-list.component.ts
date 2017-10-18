import { Component, OnInit } from '@angular/core';
import { OmdbService } from './../services/omdb.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[];

  constructor(private omdbService: OmdbService) { 

  }

  searchMovies(query: string){
    return this.omdbService.getMovies(query).subscribe(
      data => console.log(data),
      error => console.log(error),
      () => console.log("Request Complete")
    )
  }

  ngOnInit() {
  }

}
