import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResistanceSignalRService } from './services/resistance-signalr.service';
import { ResistanceComponent } from './resistance.component';
import { CreateGameModalComponent } from './components/create-game-modal/create-game-modal.component';
import { ResistanceInGameComponent } from './components/in-game/resistance-in-game.component';
import { ResistanceLobbyComponent } from './components/lobby/resistance-lobby.component';
import { RouterModule } from '@angular/router';
import { ResistancePlayerComponent } from './components/in-game/components/player/resistance-player.component';

@NgModule({
  declarations: [
    ResistanceComponent,
    CreateGameModalComponent,
    ResistanceInGameComponent,
    ResistanceLobbyComponent,
    ResistancePlayerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ResistanceModule { }
