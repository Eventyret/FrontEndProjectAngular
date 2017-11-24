import { Component, OnInit } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';
import { CapitalizePipe } from '../../capitalize.pipe'; 
import _ from "lodash";
import { SearchService } from '../../services/search.service';
import { forEach } from '@angular/router/src/utils/collection';



@Component({
  selector: 'search-page',
  templateUrl: './search-page.html',
  styleUrls: ['./search-page.css']
})
export class CardStyleComponent implements OnInit {
  omdbMovies: any[];
  radarrMovies: any[];
  mergedMovies: any[];
  imdbID: any[];
  type: string;
  statusMsg: string;
  movies: Object;
  showSpinner: boolean = true;
  errorMessage: string = '';

  constructor(private searchService: SearchService) {}

  /**
   * 
   * @param data the movies the user searched for
   */
  handleSuccess(data) {
    this.omdbMovies = data.Search;
    this.omdbMovies.forEach(movie => {
      let movies = _.filter(this.radarrMovies, { imdbId: movie.imdbID })
      if (movies.length){
          movie.matched = true;
          let inCollection = true
        sessionStorage.setItem('inCollection', JSON.stringify(inCollection))
        }
      else
      {  movie.matched = false;}
    });

  }
  /**
   * This will filter out our movies towards what 
   * the user has searched for
   * @param info this is the libary from Radarr
   */
  handleOwnMovies(info) {
    this.radarrMovies = info;
    this.movies = {};
      for (let movie of this.radarrMovies) {
      this.movies[movie.imdbId] = movie;
}
    /* console.log(this.movies); */  //  For Debugging
    this.showSpinner = false;
  }

  searchMovies(query: string) {
    return this.searchService.getMovies(query).subscribe(
	  (data) => {
		  this.handleSuccess(data)
	},
	(err) => {
		this.errorMessage = err;
		console.error(err)
	}
	);
}

  checkOwnMovies() {
    return this.searchService.checkMovies().subscribe(
      (info) => {
		  this.handleOwnMovies(info)
	  },
	  (err) => {
		  this.errorMessage= err;
		  console.error(err)
	  });
  }

  /**
   * This will save all info to session storage so we can get it at a later date.
   * @param imdbID the ID of the movie
   * @param type What type the movie is this can either be movie or series
   *  
   */
  storeMovie(imdbID, type) {
    sessionStorage.setItem("imdbID", imdbID);
    sessionStorage.setItem("type", type)
    sessionStorage.setItem('movieInfo', JSON.stringify(this.movies[imdbID]));
  }


  ngOnInit() {
    this.checkOwnMovies();
  }

}
