import { Injectable, OnDestroy } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BaseGameSignalRService } from '../../common/services/base-game-signalr.service';

export enum MafiaMessage {
  UpdateHostGames = 1,
  UpdateState = 2
}

@Injectable()
export class MafiaSignalRService extends BaseGameSignalRService<MafiaMessage> implements OnDestroy {

  constructor(protected authService: AuthService) {
    super(authService, 'mafia');

    this.hubConnection?.on('upd-host-games', data => this.messageSubject.next({ messageType: MafiaMessage.UpdateHostGames, data }));
    this.hubConnection?.on('upd-state', data => this.messageSubject.next({ messageType: MafiaMessage.UpdateState, data }));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  public games() {
    return from(this.hubConnection?.invoke('host-games'));
  }

  public createGame(queryModel: any) {
    return from(this.hubConnection?.invoke('create', queryModel));
  }

  public joinGame(gameId: string) {
    return from(this.hubConnection?.invoke('join', gameId));
  }

  public getState(gameId: string) {
    return from(this.hubConnection?.invoke('state', gameId));
  }
}
