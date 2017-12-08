import { Response } from "@angular/http";
import { SearchService } from "../../services/search.service";
import { Component, OnInit } from "@angular/core";

@Component({
	selector: "info-page",
	templateUrl: "./info-page.html",
	styleUrls: ["./info-page.css"]
})
export class SingleDisplayComponent implements OnInit {
	constructor(private searchService: SearchService) {}
	// Different Arrays to hold data
	movie: any[];
	artwork: any[];
	posters: any[];
	actors: any[];
	genres: any[];
	ratings: any[];
	Title: string;

	// Storing data to use in Single-Display Component
	imdbID: string = sessionStorage.getItem("imdbID");
	type: string = sessionStorage.getItem("type");
	movieInfo: any;
	// Single outputs from arrays
	Poster: string;
	backgroundimage: string;
	slashgenres: string;
	slashlang: string;

	// Error & Status Messages Messages (Needs cleanup)
	errorMsg: string;
	showSpinner = true;
	extrainfo: any[];
	cast: any[];
	loaded = false;

	// Lets grab some extra information for this movie.
	ngOnInit() {
		if (localStorage["movieInfo"]) {
			this.movieInfo = JSON.parse(sessionStorage.getItem("movieInfo"));
		} else {
			console.log("Its undefined");
		}
	}

	singleMovie() {
		this.searchService.getSingleMovie(this.imdbID).subscribe(
			movie => {
				this.movie = movie;
				this.Title = movie.Title;
				this.actors = movie.Actors.split(",");
				this.slashlang = movie.Language.replace(/,/g, " /");
				this.ratings = movie.Ratings;
				this.showSpinner = false;
			},
			(error: Response) => {
				if (error.status === 404) {
					alert("Error 404");
				} else {
					throw error;
				}
			}
		);
	}
}
