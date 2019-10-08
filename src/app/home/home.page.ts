import { Component } from "@angular/core";
import { Network } from "@ionic-native/network/ngx";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
	constructor(private network: Network) {}

	ngOnInit() {
		this.ConnectDisconnect();
	}

	ConnectDisconnect() {
		// watch network for a disconnection
		let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
			console.log("network was disconnected :-(");
		});

		// watch network for a connection
		let connectSubscription = this.network.onConnect().subscribe(() => {
			console.log("network connected!");
			// We just got a connection but we need to wait briefly
			// before we determine the connection type. Might need to wait.
			// prior to doing any api requests as well.
			setTimeout(() => {
				if (this.network.type === "wifi") {
					console.log("we got a wifi connection, woohoo!");
				}
			}, 3000);
		});
	}

	onOnline() {
		// Handle the online event
		var networkState = this.network.type;
		
		if (networkState !== this.network.Connection.NONE) {		
			console.log('Intentar envio al Web Service...')
		}
		console.log('Connection type: ' + networkState);
	}
}
