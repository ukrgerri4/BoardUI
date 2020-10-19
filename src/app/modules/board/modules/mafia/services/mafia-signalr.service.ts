import { Injectable, OnDestroy } from '@angular/core';
import { from, of } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { HubResult } from '../../common/models/hub-result';
import { BaseGameSignalRService } from '../../common/services/base-game-signalr.service';

export enum MafiaMessage {
  AvailableGames = 1,
  UpdateState = 2,
  CreateGame = 3
}

@Injectable()
export class MafiaSignalRService extends BaseGameSignalRService<MafiaMessage> implements OnDestroy {

  constructor(protected authService: AuthService) {
    super(authService, 'mafia');

    this.hubConnection?.on('available-games', data => this.messageSubject.next({ messageType: MafiaMessage.AvailableGames, data }));
    this.hubConnection?.on('update-state', data => this.messageSubject.next({ messageType: MafiaMessage.UpdateState, data }));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  public createGame() {
    return from(this.hubConnection?.invoke('CreateGame'))
      .pipe(
        tap((result: HubResult) => this.messageSubject.next({ messageType: MafiaMessage.CreateGame, data: result })),
        catchError(error => of(null))
      );
  }

  public updateState() {
    return from(this.hubConnection?.invoke('UpdateState'));
  }
}
