import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamGamesResponse } from '../model/teamgame.model';
import { Observable, map } from 'rxjs';
import { StandingsResponse } from '../model/standings.model';
import { CountriesResponse, Country } from '../model/countries.model';
import { countryLeagueIds } from '../model/countryLeagueId.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FootballService {
  //football.api API URL
  private apiUrl = 'https://v3.football.api-sports.io';
  private headers = new HttpHeaders(environment.apiHeaders);
  constructor(private http: HttpClient) {}

  // Get getStandings
  getStandings(league: number, season: number): Observable<StandingsResponse> {
    // Define the query parameters
    const params = {
      league,
      season,
    };

    // Make the HTTP GET request
    return this.http.get<StandingsResponse>(`${this.apiUrl}/standings`, {
      headers: this.headers,
      params,
    });
  }

  // Get getTeamGameDetails
  getTeamGameDetails(
    league: number,
    season: number,
    team: number,
    last: number = 10
  ): Observable<TeamGamesResponse> {
    // Define the query parameters
    const params = {
      league,
      season,
      team,
      last,
    };

    return this.http.get<TeamGamesResponse>(`${this.apiUrl}/fixtures`, {
      headers: this.headers,
      params,
    });
  }

  /* Get Countries List
  England = Premier League => 39
  Spain  = La Liga => 140
  France = Ligue 1 => 61
  Germany = Bundesliga => 78
  Italy = Serie A => 135   */

  getCountries(): Observable<Country[]> {
    return this.http
      .get<CountriesResponse>(`${this.apiUrl}/countries`, {
        headers: this.headers,
      })
      .pipe(
        map((response: CountriesResponse) =>
          response.response.filter((country) => {
            // Filter countries using countryLeagueIds map
            return countryLeagueIds.has(country.name);
          })
        )
      );
  }
}
