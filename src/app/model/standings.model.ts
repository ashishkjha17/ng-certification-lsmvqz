// Define the interface for the team data
interface Team {
  id: number;
  name: string;
  logo: string;
}

// Define the interface for the goals data
interface Goals {
  for: number;
  against: number;
}

// Define the interface for the standings data
interface Standing {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string | null;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: Goals;
  };
  home: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: Goals;
  };
  away: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: Goals;
  };
  update: string;
}

// Define the interface for the league data
export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: Standing[][];
}

// Define the interface for the response data
export interface ResponseData {
  league: League;
}

// Define the interface for the JSON data structure
export interface StandingsResponse {
  get: string;
  parameters: {
    league: string;
    season: string;
  };
  errors: string[]; // You can define a proper type for errors
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: ResponseData[];
}
