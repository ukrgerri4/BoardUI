import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { PlayroomComponent } from './playroom/playroom.component';
import { ResistanceComponent } from './resistance/resistance.component';
import { CreateGameModalComponent } from './resistance/components/create-game-modal/create-game-modal.component';
import { MafiaComponent } from './mafia/mafia.component';


@NgModule({
  declarations: [
    PlayroomComponent,
    ResistanceComponent,
    CreateGameModalComponent,
    MafiaComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule
  ]
})
export class BoardModule { }
