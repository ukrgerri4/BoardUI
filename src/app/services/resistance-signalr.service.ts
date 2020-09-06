import { Subject, Observable } from 'rxjs';
import * as signalR from '@aspnet/signalr';
import { Injectable } from '@angular/core';

@Injectable()
export class ResistanceSignalRService {

  private SERVER_TIMEOUT_MS = 1000 * 60 * 2;
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/hubs/resistance', {
        // tslint:disable-next-line: no-bitwise
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
        // accessTokenFactory: () => {
        //   return this.auth.getAccessToken();
        // }
      })
      .configureLogging({
        log: (logLevel, message) => console.log(logLevel, message)
      })
      .build();

    this.hubConnection.serverTimeoutInMilliseconds = this.SERVER_TIMEOUT_MS;

    this.hubConnection.on('update-state', data => console.log('signalR data', data));

    this.hubConnection.onclose(() => this.connect());
  }

  public connect() {
    this.hubConnection?.start().catch(e => setTimeout(() => this.connect(), 5000));
  }

  public disconnect() {
    if (this.hubConnection) {
      this.hubConnection.stop();
      this.hubConnection = null;
    }
  }
}
