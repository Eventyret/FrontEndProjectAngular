import { Component, OnInit } from "@angular/core";
import "rxjs/operators/map";
import { QuotesService } from "../../services/quotes.service";

@Component({
	selector: "page-not-found",
	templateUrl: "./page-not-found.html",
	styleUrls: ["./page-not-found.css"]
})
export class PageNotFoundComponent implements OnInit {
	quotesArray: any[];
	text: string;

	constructor(private service: QuotesService) {}

	ngOnInit() {
		this.getData();
	}

	/**
	 * Getting the data from the service
	 */
	getData() {
		this.service.getQuotes().subscribe(quote => {
			this.quotesArray = quote.data;
			// console.log(this.quotesArray); // for debugging
		});
	}

	/**
	 * When a user clicks the new quote it will get a new quote from the service
	 */
	quotes() {
		const random = Math.floor(Math.random() * this.quotesArray.length);
		const randomElement = this.quotesArray[random];
		// console.log(randomElement); // for debugging
		this.text = randomElement;
	}
}
