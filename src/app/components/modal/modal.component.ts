import { SearchService } from "./../../services/search.service";
import { Component, OnInit } from "@angular/core";

import { BsModalRef } from "ngx-bootstrap";

@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit {
	imdbID: string = sessionStorage.getItem("imdbID");
	type: string = sessionStorage.getItem("type");
	movie: any[];
	actors: any[];
	languages: string;
	genres: any[];
	rating: string;


	constructor(public bsModalRef: BsModalRef, private searchService: SearchService) {}

	ngOnInit() {
		this.getMovieInfo();
	}

	getMovieInfo() {
		this.searchService.getSingleMovie(this.imdbID).subscribe(
			movie => {
				console.log(movie);
				this.movie = movie;
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
