import { Routes } from '@angular/router';
import { USER_ROLES, authGuard, roleGuard } from '@app/core/auth';
import { LoginComponent } from './features/auth/login.component';
import { CandidateDetailComponent } from './features/candidates/components/candidate-detail.component';
import { CandidateListComponent } from './features/candidates/components/candidate-list.component';
import { candidatesResolver } from './features/candidates/data/candidates.resolver';
import { OfferDetailComponent } from './features/offers/components/offer-detail.component';
import { OfferListComponent } from './features/offers/components/offer-list.component';
import { offersResolver } from './features/offers/data/offers.resolver';
import { ShellComponent } from './layout/shell.component';

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
        path: 'offers',
        component: OfferListComponent,
        resolve: {
          offers: offersResolver
        }
      },
      {
        path: 'offers/:id',
        component: OfferDetailComponent,
        resolve: {
          offers: offersResolver
        }
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./features/admin/admin.component').then((m) => m.AdminComponent),
        canActivate: [roleGuard],
        resolve: {
          candidates: candidatesResolver,
          offers: offersResolver 
        },
        data: {
          roles: [USER_ROLES.admin]
        }
      }
    ]
  },
  { path: '**', redirectTo: 'candidates' }
];
