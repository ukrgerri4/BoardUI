import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { PlayroomComponent } from './playroom/playroom.component';
import { MafiaComponent } from './mafia/mafia.component';
import { ResistanceModule } from './resistance/resistance.module';


@NgModule({
  declarations: [
    PlayroomComponent,
    MafiaComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    ResistanceModule
  ]
})
export class BoardModule { }
