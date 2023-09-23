import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingsComponent } from './standings/standings.component';
import { TeamGameComponent } from './team-game/team-game.component';

const routes: Routes = [
  { path: '', redirectTo: '/standings', pathMatch: 'full' },
  { path: 'standings/:country', component: StandingsComponent }, // Define a route with a parameter, // Dynamic route with ':country' parameter
  // Define other routes for your components
  // {
  //   path: 'app-team-game/:country/:teamId/:league/:teamName/:season',
  //   component: TeamGameComponent
  // },
  { path: 'app-team-game', component: TeamGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
