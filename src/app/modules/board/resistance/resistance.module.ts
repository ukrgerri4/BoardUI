import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResistanceSignalRService } from './services/resistance-signalr.service';
import { ResistanceComponent } from './resistance.component';
import { CreateGameModalComponent } from './components/create-game-modal/create-game-modal.component';

@NgModule({
  declarations: [
    ResistanceComponent,
    CreateGameModalComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ResistanceSignalRService
  ]
})
export class ResistanceModule { }
