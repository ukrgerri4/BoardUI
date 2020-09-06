import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { PlayroomComponent } from './playroom/playroom.component';
import { CreateGameModalComponent } from './resistance/create-game-modal/create-game-modal.component';
import { ResistanceComponent } from './resistance/resistance.component';


@NgModule({
  declarations: [
    PlayroomComponent,
    ResistanceComponent,
    CreateGameModalComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule
  ]
})
export class BoardModule { }
