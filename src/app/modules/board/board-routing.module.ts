import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board.component';
import { MafiaComponent } from './modules/mafia/mafia.component';
import { ResistanceInGameComponent } from './modules/resistance/components/in-game/resistance-in-game.component';
import { ResistanceLobbyComponent } from './modules/resistance/components/lobby/resistance-lobby.component';
import { ResistanceComponent } from './modules/resistance/resistance.component';

const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    children: [
      {
        path: 'resistance',
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
      },
      {
        path: 'mafia',
        component: MafiaComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
