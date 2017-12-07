import { AppError } from "./../../services/app.error";
import { Component, OnInit } from "@angular/core";
import { TruncateModule } from "ng2-truncate";
import { CapitalizePipe } from "../../capitalize.pipe";
import _ from "lodash";
import { SearchService } from "../../services/search.service";
import { forEach } from "@angular/router/src/utils/collection";
import { NotFoundError } from "../../services/not-found-error";

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
		} //  For Debugging
		/* console.log(this.movies); */ this.showSpinner = false;
	}

	searchMovies(query: string) {
		return this.searchService.getMovies(query).subscribe(
			data => {
				this.handleSuccess(data);
			},
			(error: AppError) => {
				if (error instanceof NotFoundError) {
					alert("This is a 404 error");
				} else {
					alert("An Unepected error occured.");
				}
			}
		);
	}

	checkOwnMovies() {
		return this.searchService.checkMovies().subscribe(
			info => {
				this.handleOwnMovies(info);
			},
			(error: AppError) => {
				if (error instanceof NotFoundError) {
					alert("This is a 404 error");
				} else {
					alert("An Unepected error occured.");
				}
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

	ngOnInit() {
		this.checkOwnMovies();
	}
}
