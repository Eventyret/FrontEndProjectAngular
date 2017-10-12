import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})

export class MoviesComponent {
    movies: any[];

    constructor(public movieService: MovieService) {
        this.movieService.getMovies().subscribe(movies => {
            this.movies = movies;
        });
    }
}
