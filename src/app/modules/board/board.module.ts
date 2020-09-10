import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { PlayroomComponent } from './playroom/playroom.component';
import { ResistanceComponent } from './resistance/resistance.component';
import { CreateGameModalComponent } from './resistance/components/create-game-modal/create-game-modal.component';


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
