import { Component, OnInit } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';
import { CapitalizePipe } from '../../capitalize.pipe'; 
import _ from "lodash";
import { SearchService } from '../../services/search.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Message } from 'primeng/primeng';



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
  msgs: Message[] = [];

  constructor(private searchService: SearchService) {

  }
  handleSuccess(data) {
    this.omdbMovies = data.Search;
    // Match the movies searched for
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
  handleOwnMovies(info) {
    this.radarrMovies = info;
    this.movies = {};
      for (let movie of this.radarrMovies) {
      this.movies[movie.imdbId] = movie;
}
    console.log(this.movies);
    this.showSpinner = false;
  }

  handleError(error) {
    console.error(error);
    if (error == 404) {
      this.statusMsg = 'We are having some problems with the servce, please try again later.'
    }
  }

  searchMovies(query: string) {
    return this.searchService.getMovies(query).subscribe(
      data => this.handleSuccess(data),
      error => {
        this.statusMsg = 'We are having some problems with the servce, please try again later.'
      },
    );
  }

  checkOwnMovies() {
    return this.searchService.checkMovies().subscribe(
      info => this.handleOwnMovies(info),
      (error) => {
        this.statusMsg = 'We are having some problems with the servce, please try again later.'
      },
    );
  }

  storeMovie(imdbID, type) {
    sessionStorage.setItem("imdbID", imdbID);
    sessionStorage.setItem("type", type)
    sessionStorage.setItem('movieInfo', JSON.stringify(this.movies[imdbID]));
    console.log(imdbID)
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Added to Libary', detail: 'Move has been sent to Radarr' });
  }

  ngOnInit() {
    this.checkOwnMovies();
  }

}
