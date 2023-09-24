import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamGamesResponse } from '../model/teamgame.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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

  // Define a cache key based on a unique identifier
  private getCacheKey(endpoint: string, uniqueIdentifier: string): string {
    return `cached-${endpoint}-${uniqueIdentifier}`;
  }

  // Get getStandings
  getStandings(league: number, season: number): Observable<StandingsResponse> {
    const cacheKey = this.getCacheKey(
      'getStandings',
      `Season${season}-League${league}`
    );

    // Check if data is cached
    const cachedData = localStorage.getItem(cacheKey);
    console.log('Cached Data exists for : getStandings', cachedData);

    // Define the query parameters
    const params = {
      league,
      season,
    };

    if (cachedData) {
      console.log('getStandings served from Cache');
      return of(JSON.parse(cachedData));
    } else {
      // Make the HTTP GET request
      return this.http
        .get<StandingsResponse>(`${this.apiUrl}/standings`, {
          headers: this.headers,
          params,
        })
        .pipe(
          map((response: StandingsResponse) => {
            console.log('getStandings served from Live API', response);
            localStorage.setItem(cacheKey, JSON.stringify(response));
            return response;
          }),
          catchError((error) => {
            // Handle errors here (e.g., show an error message)
            console.error('Error fetching getStandings:', error);
            return of({} as StandingsResponse); // Return an empty object in case of an error
          })
        );
    }
  }

  // Get getTeamGameDetails
  getTeamGameDetails(
    league: number,
    season: number,
    team: number,
    last: number = 10
  ): Observable<TeamGamesResponse> {
    const cacheKey = this.getCacheKey(
      'getTeamGameDetails',
      `Season${season}-League${league}-Team${team}`
    );

    // Check if data is cached
    const cachedData = localStorage.getItem(cacheKey);
    console.log('Cached Data exists for : getTeamGameDetails => ', cachedData);

    // Define the query parameters
    const params = {
      league,
      season,
      team,
      last,
    };

    if (cachedData) {
      console.log('getTeamGameDetails served from cache');
      return of(JSON.parse(cachedData));
    } else {
      return this.http
        .get<TeamGamesResponse>(`${this.apiUrl}/fixtures`, {
          headers: this.headers,
          params,
        })
        .pipe(
          map((response: TeamGamesResponse) => {
            console.log('getTeamGameDetails served from live API', response);
            localStorage.setItem(cacheKey, JSON.stringify(response));
            return response;
          }),
          catchError((error) => {
            // Handle errors here (e.g., show an error message)
            console.error('Error fetching getTeamGameDetails :', error);
            return of({} as TeamGamesResponse); // Return an empty object in case of an error
          })
        );
    }
  }

  /* Get Countries List
  England = Premier League => 39
  Spain  = La Liga => 140
  France = Ligue 1 => 61
  Germany = Bundesliga => 78
  Italy = Serie A => 135   */

  getCountries(): Observable<Country[]> {
    const cacheKey = this.getCacheKey('getCountries', 'cachedDataCountries');

    // Check if data is cached
    const cachedData = localStorage.getItem(cacheKey);
    console.log('Cached Data exists for : getCountries => ', cachedData);

    if (cachedData) {
      console.log('getCountries served from Cache');
      return of(JSON.parse(cachedData));
    } else {
      return this.http
        .get<CountriesResponse>(`${this.apiUrl}/countries`, {
          headers: this.headers,
        })
        .pipe(
          map((response: CountriesResponse) => {
            const filteredData = response.response.filter((country) => {
              // Filter countries using countryLeagueIds map
              return countryLeagueIds.has(country.name);
            });
            console.log('getCountries served from live API Call', filteredData);
            localStorage.setItem(cacheKey, JSON.stringify(filteredData));
            return filteredData;
          }),
          catchError((error) => {
            // Handle errors here (e.g., show an error message)
            console.error('Error fetching getCountries:', error);
            return of({} as Country[]); // Return an empty object in case of an error
          })
        );
    }
  }
}
