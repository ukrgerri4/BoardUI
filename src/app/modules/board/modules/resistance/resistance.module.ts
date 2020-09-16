import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResistanceComponent } from './resistance.component';
import { CreateGameModalComponent } from './components/create-game-modal/create-game-modal.component';
import { ResistanceInGameComponent } from './components/in-game/resistance-in-game.component';
import { ResistanceLobbyComponent } from './components/lobby/resistance-lobby.component';
import { RouterModule } from '@angular/router';
import { ResistancePlayerComponent } from './components/in-game/components/player/resistance-player.component';
import { BRadioModule } from 'src/app/components/b-radio/b-radio.module';

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
    RouterModule,
    BRadioModule
  ]
})
export class ResistanceModule { }
