export class CountriesResponse {
  get: string = '';
  parameters: string[] = [];
  errors: string[] = [];
  results: number = 0;
  paging!: {
    current: number;
    total: number;
  };
  response!: Country[];
}

export class Country {
  name!: string;
  code!: string;
  flag!: string;
}
