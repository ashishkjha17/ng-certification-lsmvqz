import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { StandingsComponent } from './standings/standings.component';
import { TeamGameComponent } from './team-game/team-game.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationbarComponent,
    StandingsComponent,
    TeamGameComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
