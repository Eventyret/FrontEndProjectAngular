import { TmdbService } from "./../../../shared/services/tmdb.service";
import { Component, OnInit } from "@angular/core";
import { TruncateModule } from "ng2-truncate";
import { CapitalizePipe } from "../../../capitalize.pipe";
import * as _ from "lodash";
import * as __ from "lodash-addons";
import { SearchService } from "../../services/search.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { MovieDetailsComponent } from "../movieDetails/movieDetails.component";
import "rxjs/add/operator/filter";

@Component({
	selector: "app-search-page",
	templateUrl: "./search-page.html",
	styleUrls: ["./search-page.css"]
})
export class CardStyleComponent implements OnInit {
	searchResults: any[];
	radarrMovies: any[];
	imdbID: any[];
	type: string;
	statusMsg: string;
	movies: Object;
	showSpinner = true;
	movieListReady = false;

	constructor(private searchService: SearchService, private tmdbService: TmdbService) {}


	/**
	 * @param tmdb
	 * @param movie
	 * @param index
	 */

	createTmdbResult(tmdb, movie, index) {
		this.searchResults[index] = Object.assign({}, movie, tmdb);
		this.searchResults[index]["backdrop"] = "http://image.tmdb.org/t/p/original/" + this.searchResults[index]["backdrop_path"];
		this.searchResults[index]["Poster"] = "http://image.tmdb.org/t/p/original/" + this.searchResults[index]["poster_path"];
		delete this.searchResults[index]["backdrop_path"];
		delete this.searchResults[index]["poster_path"];
	}

	/**
	 *
	 * @param data the movies the user searched for
	 *
	 */
	handleSuccess(data) {
		this.searchResults = data.Search;
		this.searchResults = _.uniqBy(this.searchResults, "imdbID");
		this.searchResults.forEach((result, index) => {
			const imdbId = result.imdbID;
			this.tmdbService
				.tmdbInfo(imdbId)
				.filter(data => data.movie_results.length > 0)
				.subscribe(tmdbResult => {
					this.createTmdbResult(tmdbResult.movie_results[0], result, index);
				});
		});
		console.log(this.searchResults);
		this.searchResults.forEach(movie => {
			const movies = _.filter(this.radarrMovies, { imdbId: movie.imdbID });
			movie.slug = __.slugify(movie.Title);
			if (movies.length) {
				movie.matched = true;
				const inCollection = true;
				sessionStorage.setItem("inCollection", JSON.stringify(inCollection));
			} else {
				movie.matched = false;
			}
		});
		this.movieListReady = true;
	}
	/**
	 * This will filter out our movies towards what
	 * the user has searched for
	 * @param info this is the library from Radarr
	 */
	handleOwnMovies(info) {
		this.radarrMovies = info;
		this.movies = {};
		for (const movie of this.radarrMovies) {
			this.movies[movie.imdbId] = movie;
		}
		this.showSpinner = false;
	}

	searchMovies(query) {
		return this.searchService.getMovies(query).subscribe(
			data => {
				this.handleSuccess(data);
			},
			error => {
				throw error;
			}
		);
	}

	checkOwnMovies() {
		return this.searchService.checkMovies().subscribe(
			info => {
				this.handleOwnMovies(info);
			},
			error => {
				throw error;
			}
		);
	}

	/**
	 * This will save all info to session storage so we can get it at a later date.
	 * @param imdbID the ID of the movie
	 * @param type What type the movie is this can either be movie or series
	 *
	 */
	storeMovie(imdbID, type) {
		sessionStorage.setItem("imdbID", imdbID);
		sessionStorage.setItem("type", type);
		sessionStorage.setItem("movieInfo", JSON.stringify(this.movies[imdbID]));
	}

	posterError(poster) {
		if (poster === "N/A" || !poster) {
			return "../../../../assets/404.gif";
		} else {
			return poster;
		}
	}

	ngOnInit() {
		this.checkOwnMovies();
		this.searchService.searchStringObs.subscribe((searchString: string) => {
			this.searchMovies(searchString);
		})
	}
}
