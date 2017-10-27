import { Component, OnInit } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';
import { CapitalizePipe } from '../../trim.pipe';import _ from "lodash";
import { SearchService } from '../../services/search.service';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  omdbMovies: any[];
  radarrMovies: any[];
  mergedMovies: any[];
  imdbID: any[];
  type: string;
  statusMsg: string;
  constructor(private searchService: SearchService) { 

  }

  handleSuccess(data){
    this.omdbMovies = data.Search;
    document.getElementById("searchresults").classList.add('row-block');
    console.log(data.Search);
    // Match the movies searched for
    this.omdbMovies.forEach(movie => {
      let movies = _.filter(this.radarrMovies, { imdbId: movie.imdbID})
      if (movies.length)
        movie.matched = true;
      else
        movie.matched = false;
    });

  }
  handleOwnMovies(info){
    this. radarrMovies = info;
    console.log(info);
  }

  handleError(error){
    console.error(error);
    if(error == 404) {
      this.statusMsg = 'We are having some problems with the servce, please try again later.'
    }
  }

  searchMovies(query: string){
    return this.searchService.getMovies(query).subscribe(
      data => this.handleSuccess(data),
      (error) => {
        this.statusMsg = 'We are having some problems with the servce, please try again later.'
      },
    );
  }

checkOwnMovies(){
  return this.searchService.checkMovies().subscribe(
    info => this.handleOwnMovies(info),
    (error) => {
      this.statusMsg = 'We are having some problems with the servce, please try again later.'
    },
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
