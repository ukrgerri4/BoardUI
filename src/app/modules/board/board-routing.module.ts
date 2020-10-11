import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { BoardComponent } from './board.component';

const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    children: [
      {
        path: 'resistance',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/resistance/resistance.module').then(mod => mod.ResistanceModule)

      },
      {
        path: 'mafia',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/mafia/mafia.module').then(mod => mod.MafiaModule)
      },
      // {
      //   path: 'munchkin',
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('./modules/mafia/mafia.module').then(mod => mod.MunchkinModule)
      // }
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
