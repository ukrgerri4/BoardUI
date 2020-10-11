import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResistanceInGameComponent } from './components/in-game/resistance-in-game.component';
import { ResistanceLobbyComponent } from './components/lobby/resistance-lobby.component';
import { ResistanceComponent } from './resistance.component';

const routes: Routes = [
  {
    path: '',
    component: ResistanceComponent,
    children: [
      {
        path: '',
        component: ResistanceLobbyComponent
      },
      {
        path: ':id',
        component: ResistanceInGameComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResistanceRoutingModule { }
