import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { PlayroomComponent } from './playroom/playroom.component';


@NgModule({
  declarations: [PlayroomComponent],
  imports: [
    CommonModule,
    BoardRoutingModule
  ]
})
export class BoardModule { }
