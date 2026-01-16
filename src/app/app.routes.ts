import { Routes } from '@angular/router';
import { USER_ROLES, authGuard, roleGuard } from '@app/core/auth';
import { candidatesResolver } from './features/candidates/data/candidates.resolver';
import { ShellComponent } from './layout/shell.component';
import { LoginComponent } from './features/auth/login.component';
import { CandidateListComponent } from './features/candidates/components/candidate-list.component';
import { CandidateDetailComponent } from './features/candidates/components/candidate-detail.component';

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
        component: CandidateListComponent,
        resolve: {
          candidates: candidatesResolver
        }
      },
      {
        path: 'candidates/:id',
        component: CandidateDetailComponent,
        resolve: {
          candidates: candidatesResolver
        }
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./features/admin/admin.component').then((m) => m.AdminComponent),
        canActivate: [roleGuard],
        resolve: {
          candidates: candidatesResolver
        },
        data: {
          roles: [USER_ROLES.admin]
        }
      }
    ]
  },
  { path: '**', redirectTo: 'candidates' }
];
