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
  matchFound: boolean = false;
  type: string;
  searching: boolean = false;
  statusMsg: string;
  omdbComplete: boolean = false;
  radarrComplete: boolean = false;
  constructor(private searchService: SearchService) { 

  }

  handleSuccess(data){
    this.omdbMovies = data.Search;
    this.omdbComplete = true;
    document.getElementById("searchresults").classList.add('row-block');
    console.log(data.Search);
for (let index = 0; index < this.omdbMovies.length; index++) {
  let omdb = this.omdbMovies[index];
  for (let index2 = 0; index2 < this.radarrMovies.length; index2++) {
    let radarr = this.radarrMovies[index2];
    if (omdb.imdbID == radarr.imdbId) {
      console.log("Found a match with name " + omdb.Title)
      this.matchFound = true;
      break;
  }
}
}

  }
  handleOwnMovies(info){
    this. radarrMovies = info;
    this.radarrComplete = true;
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
