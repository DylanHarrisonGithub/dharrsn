import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { BlogComponent } from './components/blog/blog.component';
import { AdminComponent } from './components/admin/admin.component';
import { ResumeComponent } from './components/resume/resume.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "resume", component: ResumeComponent },
  { path: "services", component: ServicesComponent },
  { path: "portfolio", component: PortfolioComponent },
  { path: "blog", component: BlogComponent },
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent, canActivate: [AuthGuard]},
  { path: "register", component: RegisterComponent },
  { path: '',  pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
