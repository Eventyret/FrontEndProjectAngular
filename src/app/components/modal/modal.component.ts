import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";

@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit {
	constructor(public bsModalRef: BsModalRef) {}

	ngOnInit() {}
}
