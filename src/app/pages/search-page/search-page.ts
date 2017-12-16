import { Component, OnInit } from "@angular/core";
import { TruncateModule } from "ng2-truncate";
import { CapitalizePipe } from "../../capitalize.pipe";
import * as _ from "lodash";
import { SearchService } from "../../services/search.service";

@Component({
	selector: "app-search-page",
	templateUrl: "./search-page.html",
	styleUrls: ["./search-page.css"]
})
export class CardStyleComponent implements OnInit {
	omdbMovies: any[];
	radarrMovies: any[];
	mergedMovies: any[];
	imdbID: any[];
	overview: any[];
	type: string;
	statusMsg: string;
	movies: Object;
	showSpinner = true;
	errorMessage = "";

	constructor(private searchService: SearchService) {}

	/**
	 *
	 * @param data the movies the user searched for
	 */
	handleSuccess(data) {
		this.omdbMovies = data.Search;
		const uniqueList = _.uniqBy(this.omdbMovies, data.Search.imdbID);
		console.log(uniqueList);
		this.omdbMovies.forEach(movie => {
			const movies = _.filter(this.radarrMovies, { imdbId: movie.imdbID });
			if (movies.length) {
				movie.matched = true;
				const inCollection = true;
				sessionStorage.setItem("inCollection", JSON.stringify(inCollection));
			} else {
				movie.matched = false;
			}
		});
	}
	/**
	 * This will filter out our movies towards what
	 * the user has searched for
	 * @param info this is the library   from Radarr
	 */
	handleOwnMovies(info) {
		this.radarrMovies = info;
		this.movies = {};
		for (const movie of this.radarrMovies) {
			this.movies[movie.imdbId] = movie;
		}
		this.showSpinner = false;
	}

	searchMovies(query: string) {
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
		if (poster === "N/A") {
			return "../../../assets/404PosterNotFound.jpg";
		} else {
			return poster;
		}
	}

	ngOnInit() {
		this.checkOwnMovies();
	}
}
