import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,  // Ruta sin header
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: LayoutComponent,  // Layout como contenedor principal
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'cards', component: DashboardComponent },
      // {
      //   path: 'cards',
      //   loadChildren: () => import('mf-cards/CardsModule').then(m => m.CardsModule)
      // },
      // Agrega más rutas de MFs aquí...
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
