import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { ResistanceModule } from './modules/resistance/resistance.module';
import { MafiaModule } from './modules/mafia/mafia.module';


@NgModule({
  declarations: [
    BoardComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    ResistanceModule,
    MafiaModule
  ]
})
export class BoardModule { }
