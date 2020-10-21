import { Subject } from 'rxjs';
import * as signalR from '@aspnet/signalr';
import { AuthService } from 'src/app/services/auth.service';
import { Directive, OnDestroy } from '@angular/core';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseGameSignalRService<TMessageType> implements OnDestroy {

  protected SERVER_TIMEOUT_MS = 1000 * 60 * 2;
  protected RECONNECT_TIMEOUT_MS = 5000;
  protected hubConnection: signalR.HubConnection;

  protected messageSubject = new Subject<{ messageType: TMessageType, data: any }>();

  get state() {
    return this.hubConnection?.state;
  }

  get onMessage() {
    return this.messageSubject.asObservable();
  }

  constructor(protected authService: AuthService, protected hubName: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:5001/hubs/${this.hubName}`, {
        // tslint:disable-next-line: no-bitwise
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
        accessTokenFactory: () => this.authService.accesToken
      })
      .configureLogging({
        log: (logLevel, message) => {
          if (logLevel >= signalR.LogLevel.Information) {
            console.log(logLevel, message);
          }
        }
      })
      .build();

    this.hubConnection.serverTimeoutInMilliseconds = this.SERVER_TIMEOUT_MS;
  }

  ngOnDestroy() {
    this.disconnect();
    this.messageSubject.complete();
  }

  public connect() {
    this.hubConnection?.start()
      .catch(e => setTimeout(() => this.connect(), this.RECONNECT_TIMEOUT_MS));
  }

  public disconnect() {
      this.hubConnection?.stop();
      this.hubConnection = null;
  }
}
