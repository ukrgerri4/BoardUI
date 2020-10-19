import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MafiaGameComponent } from './components/game/mafia-game.component';
import { MafiaLobbyComponent } from './components/lobby/mafia-lobby.component';
import { MafiaComponent } from './mafia.component';

const routes: Routes = [
  {
    // path: '',
    component: MafiaComponent,
    children: [
      {
        path: 'lobby',
        component: MafiaLobbyComponent
      },
      {
        path: ':id',
        component: MafiaGameComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MafiaRoutingModule { }
