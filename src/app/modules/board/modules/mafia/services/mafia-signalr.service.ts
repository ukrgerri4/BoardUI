import { Subject, Observable } from 'rxjs';
import * as signalR from '@aspnet/signalr';
import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

export enum MafiaMessage {
  AvailableGames = 1,
  GameState = 2,
  CreateGame = 3
}

@Injectable()
export class MafiaSignalRService implements OnDestroy {

  private SERVER_TIMEOUT_MS = 1000 * 60 * 2;
  private hubConnection: signalR.HubConnection;

  private messageSubject = new Subject<{ messageType: MafiaMessage, data: any }>();
  get onMessage() {
    return this.messageSubject.asObservable();
  }
  // private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private authService: AuthService) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/hubs/mafia', {
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

    this.hubConnection.on('available-games', data => this.messageSubject.next({ messageType: MafiaMessage.AvailableGames, data }));
    this.hubConnection.on('game-state', data => this.messageSubject.next({ messageType: MafiaMessage.GameState, data }));

    // this.hubConnection.onclose(() => this.connect());
  }

  ngOnDestroy() {
    this.disconnect();
    this.messageSubject.complete();

  }

  public connect() {
    this.hubConnection?.start()
      .catch(e => setTimeout(() => this.connect(), 5000));
  }

  public disconnect() {
      this.hubConnection?.stop();
      this.hubConnection = null;
  }

  public createGame() {
    this.hubConnection.invoke('CreateGame')
      .then(result => {
        console.log('crategame result ' + result);
        return result;
      })
      .then(result => this.messageSubject.next({ messageType: MafiaMessage.CreateGame, data: result }))
      .catch(error => console.log('Resistance createGame: ' + error));
  }
}
