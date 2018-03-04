import { SearchService } from "./../../../HomePage/services/search.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
	searchQuery: string;
  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  searchMovies(query) {
		this.searchService.getSearchString(query);
  }

}
