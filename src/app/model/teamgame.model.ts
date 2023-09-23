class Fixture {
  id: number = 0;
  referee: string = '';
  timezone: string = '';
  date: string = '';
  timestamp: number = 0;
  periods: { first: number; second: number } = { first: 0, second: 0 };
  venue: { id: number; name: string; city: string } = {
    id: 0,
    name: '',
    city: '',
  };
  status: { long: string; short: string; elapsed: number } = {
    long: '',
    short: '',
    elapsed: 0,
  };
}

class League {
  id: number = 0;
  name: string = '';
  country: string = '';
  logo: string = '';
  flag: string = '';
  season: number = 0;
  round: string = '';
}

class Team {
  id: number = 0;
  name: string = '';
  logo: string = '';
  winner: boolean = false;
}

class Goals {
  home: number = 0;
  away: number = 0;
}

class Score {
  halftime: Goals = new Goals();
  fulltime: Goals = new Goals();
  extratime: { home: number | null; away: number | null } = {
    home: null,
    away: null,
  };
  penalty: { home: number | null; away: number | null } = {
    home: null,
    away: null,
  };
}

export class Game {
  fixture: Fixture = new Fixture();
  league: League = new League();
  teams: { home: Team; away: Team } = { home: new Team(), away: new Team() };
  goals: Goals = new Goals();
  score: Score = new Score();
}

export class TeamGamesResponse {
  get: string = '';
  parameters: { league: string; season: string; team: string; last: string } = {
    league: '',
    season: '',
    team: '',
    last: '',
  };
  errors: string[] = [];
  results: number = 0;
  paging: { current: number; total: number } = { current: 0, total: 0 };
  response: Game[] = [];
}
