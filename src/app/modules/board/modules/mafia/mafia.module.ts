import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MafiaSignalRService } from './services/mafia-signalr.service';
import { MafiaComponent } from './mafia.component';
import { MafiaRoutingModule } from './mafia-routing.module';
import { MafiaLobbyComponent } from './components/lobby/mafia-lobby.component';
import { MafiaCreateComponent } from './components/create/mafia-create.component';
import { MafiaGameComponent } from './components/game/mafia-game.component';

@NgModule({
  declarations: [
    MafiaComponent,
    MafiaLobbyComponent,
    MafiaCreateComponent,
    MafiaGameComponent
  ],
  imports: [
    MafiaRoutingModule,
    CommonModule,
    RouterModule
  ],
  providers: [
    MafiaSignalRService
  ]
})
export class MafiaModule { }
