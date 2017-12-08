import { ErrorHandler, Injectable } from "@angular/core";
import { MessageService } from "primeng/components/common/messageservice";

@Injectable()
export class AppErrorHandler implements ErrorHandler {
	constructor(private messageService: MessageService) {}
	msgs: any;
	handleError(error: Response) {
		if (error.status in [500, 503, 504, 502]) {
			this.msgs = this.messageService.add({
				severity: "info",
				summary:
					"It seems the server have had some issues please try again later",
				detail: "Error 500"
			});
		} else if (error.status === 404) {
			this.msgs = this.messageService.add({
				severity: "error",
				summary: "We could not find what you where searching for",
				detail: "Error 404"
			});
		} else if (error.status in [400, 401, 403]) {
			this.msgs = this.messageService.add({
				severity: "error",
				summary: "We could not find what you where searching for",
				detail: "Error" + error.status
			});
		} else {
				this.msgs = this.messageService.add({
				severity: "error",
				summary: "An unknown error has occured",
				detail: "Error"
		});
	}}
}
