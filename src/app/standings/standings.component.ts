import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { League } from '../model/standings.model';
import { FootballService } from '../services/football.service';
import { countryLeagueIds } from '../model/countryLeagueId.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnInit, OnDestroy {
  isHidden: boolean = true;
  selectedRow: number | null = null;
  selectedCountry: string = '';
  isHovered: boolean = false;
  private standingsSubscription: Subscription | undefined;
  standingsReponseData: League = {
    id: 0,
    name: '',
    country: '',
    logo: '',
    flag: '',
    season: 0,
    standings: [],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fbApiService: FootballService
  ) {}
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.standingsSubscription) {
      this.standingsSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedCountry = params['country'];
      const season = new Date().getFullYear();
      const league = countryLeagueIds.get(this.selectedCountry);

      this.standingsSubscription = this.fbApiService
        .getStandings(league!, season)
        .subscribe((standingData) => {
          this.standingsReponseData = standingData.response[0].league;
          console.log(this.standingsReponseData);
        });

      //this.standingsReponseData=this.jsonData.response[0].league;
      // Fetch standings data for the selected country here
    });
  }

  selectRow(teamId: number, leagueId: number, teamName: string): void {
    this.selectedRow = teamId; // Set the selected row index -> You can now use this index to display the last 10 game results.
    console.log('Team ID : ' + teamId);
    console.log('League ID : ' + leagueId);
    console.log('Team Name : ' + teamName);

    // Define the route parameters and their values
    const routeParams = {
      country: this.selectedCountry,
      teamId: teamId,
      league: leagueId,
      teamName: teamName,
      season: new Date().getFullYear().toString(),
    };

    const navigationExtras: NavigationExtras = {
      skipLocationChange: true,
    };

    // Use navigate method with navigation extras
    this.router.navigate(['/app-team-game', routeParams], navigationExtras);
  }
  // Event handler for mouse enter
  onMouseEnter(teamid: number) {
    this.isHovered = true;
    this.selectedRow = teamid;
  }

  // Event handler for mouse leave
  onMouseLeave() {
    this.isHovered = false;
    this.selectedRow = 0;
  }
}
