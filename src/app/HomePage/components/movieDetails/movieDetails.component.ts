import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";
import { SearchService } from "../../services/search.service";
import * as __ from "lodash-addons";

@Component({
	selector: "app-modal",
	templateUrl: "./movieDetails.component.html",
	styleUrls: ["./movieDetails.component.css"]
})
export class MovieDetailsComponent implements OnInit {
	imdbID: string = sessionStorage.getItem("imdbID");
	type: string = sessionStorage.getItem("type");
	movie: any[];
	actors: any[];
	languages: string;
	genres: any[];
	rating: string;
	isReadonlyRating = true;

	constructor(public bsModalRef: BsModalRef, private searchService: SearchService) {}

	ngOnInit() {
		this.getMovieInfo();
	}

	getMovieInfo() {
		this.searchService.getSingleMovie(this.imdbID).subscribe(
			movie => {
				console.log(movie);
				this.movie = movie;
				movie.slug = __.slugify(movie.Title);
				this.actors = movie.Actors.split(",");
				this.genres = movie.Genre.split(",");
				this.rating = movie.Ratings[0].Value.substring(0, 1);
				console.log(this.rating);
				this.languages = movie.Language.replace(/,/g, " /");
				const isLoaded = true;
			},
			error => {
				console.log(error);
			}
		);
	}
	posterError(poster) {
		if (poster === "N/A" || poster === null) {
			return "../../../assets/404PosterNotFound.jpg";
		} else {
			return poster;
		}
	}
}
