import { Routes } from '@angular/router';

import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';
import { ShellComponent } from './layout/shell.component';
import { LoginComponent } from './features/auth/login.component';
import { CandidateListComponent } from './features/candidates/components/candidate-list.component';
import { CandidateDetailComponent } from './features/candidates/components/candidate-detail.component';
import { AdminComponent } from './features/admin/admin.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'candidates'
      },
      {
        path: 'candidates',
        component: CandidateListComponent
      },
      {
        path: 'candidates/:id',
        component: CandidateDetailComponent
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['admin']
        }
      }
    ]
  },
  { path: '**', redirectTo: 'candidates' }
];
