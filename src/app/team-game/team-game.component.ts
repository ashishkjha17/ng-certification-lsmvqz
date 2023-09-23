import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamGamesResponse } from '../model/teamgame.model';
import { FootballService } from '../services/football.service';

@Component({
  selector: 'app-team-game',
  templateUrl: './team-game.component.html',
  styleUrls: ['./team-game.component.css'],
})
export class TeamGameComponent implements OnInit {
  teamName: string | null = null;
  fixtureTeamData!: TeamGamesResponse; // Define the data structure for team results
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fbServiceApi: FootballService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const country = params.get('country');
      const teamName = params.get('teamName');
      const leagueParam = params.get('league');
      const league: number | null = leagueParam ? +leagueParam : 0;
      const teamIdParam = params.get('teamId');
      const teamId: number | null = teamIdParam ? +teamIdParam : 0;
      const seasonParams = params.get('season');
      const season: number | null = seasonParams ? +seasonParams : 0;

      // Now, you can use these parameters as needed
      console.log('Country:', country);
      console.log('Team ID:', teamId);
      console.log('League:', league);
      console.log('Season:', season);
      console.log('Team Name:', teamName);

      // Fetch and display last 10 game results as explained in the previous answer
      this.teamName = teamName;
      this.fbServiceApi
        .getTeamGameDetails(league, season, teamId)
        .subscribe((data) => {
          // Handle the response here.
          this.fixtureTeamData = data;
          console.log(this.fixtureTeamData);
        });
    });
  }

  // Method to navigate back to league standings
  goBack() {
    // Use router.navigate to navigate back to the standings page for the selected league
    const leagueName = this.route.snapshot.paramMap.get('country');
    this.router.navigate(['/standings', leagueName]);
  }
}
