import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MafiaComponent } from './mafia/mafia.component';
import { PlayroomComponent } from './playroom/playroom.component';
import { ResistanceComponent } from './resistance/resistance.component';

const routes: Routes = [
  {
    path: 'playroom',
    component: PlayroomComponent,
    children: [
      {
        path: 'resistance',
        component: ResistanceComponent,
      },
      {
        path: 'mafia',
        component: MafiaComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'playroom'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
