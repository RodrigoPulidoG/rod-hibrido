import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactWrapperComponent } from './components/react-wrapper/react-wrapper.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: ReactWrapperComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'universo', pathMatch: 'full' },
      {
        path: 'universo',
        loadChildren: () => import('mfCards/CardsModule').then(m => m.CardsModule)
      },
      { path: 'imagenes', component: DashboardComponent },
      { path: '**', redirectTo: 'universo' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
