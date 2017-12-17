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

	constructor(public bsModalRef: BsModalRef, private searchService: SearchService) {}

	ngOnInit() {
		this.getMovieInfo();
	}

	getMovieInfo() {
		this.searchService.getSingleMovie(this.imdbID).subscribe(
			movie => {
				console.log(movie);
				this.movie = movie;
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
