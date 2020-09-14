import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MafiaSignalRService } from './services/mafia-signalr.service';
import { MafiaComponent } from './mafia.component';

@NgModule({
  declarations: [
    MafiaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    MafiaSignalRService
  ]
})
export class MafiaModule { }
