import { Component } from "@angular/core";
import { SearchService } from "./HomePage/services/search.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private searchService: SearchService){
  }
}
