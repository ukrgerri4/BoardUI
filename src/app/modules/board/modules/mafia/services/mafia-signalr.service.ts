import { Injectable, OnDestroy } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BaseGameSignalRService } from '../../common/services/base-game-signalr.service';

export enum MafiaMessage {
  AvailableGames = 1,
  GameState = 2,
  CreateGame = 3
}

@Injectable()
export class MafiaSignalRService extends BaseGameSignalRService<MafiaMessage> implements OnDestroy {

  constructor(protected authService: AuthService) {
    super(authService, 'mafia');

    this.hubConnection.on('available-games', data => this.messageSubject.next({ messageType: MafiaMessage.AvailableGames, data }));
    this.hubConnection.on('game-state', data => this.messageSubject.next({ messageType: MafiaMessage.GameState, data }));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  public createGame() {
    return from(
      this.hubConnection.invoke('CreateGame')
        .then(result => {
          console.log('crategame result ' + result);
          return result;
        })
        .then(result => this.messageSubject.next({ messageType: MafiaMessage.CreateGame, data: result }))
        .catch(error => console.log('Mafia createGame: ' + error))
    );
  }
}
