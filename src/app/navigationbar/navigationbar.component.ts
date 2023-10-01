import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FootballService } from '../services/football.service';
import { Country } from '../model/countries.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css'],
})
export class NavigationbarComponent implements OnInit, OnDestroy {
  title: string = 'Football Updates';
  h1CSS = {
    'text-align': 'center',
    'font-size': 'xxx-large',
    color: 'goldenrod',
    'font-weight': 'bolder',
  };

  // This will hold the list of countries
  countries: Country[] = [];
  private countriesSubscription: Subscription | undefined;
  constructor(private router: Router, private fbApiService: FootballService) {}
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.countriesSubscription) {
      this.countriesSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    const currentRoute = this.router.url;
    if (!currentRoute.includes('/standings')) {
      // If no country is selected, navigate to 'standings/England'
      this.router.navigate(['/standings', 'England']);
    }

    this.countriesSubscription = this.fbApiService.getCountries().subscribe({
      next: (data: Country[]) => {
        // Handle the data here
        this.countries = data;
        console.log(this.countries);
      },
      complete: () => {
        // Handle completion here (if needed)
        console.log('Subscription completed.');
      },
    });
  }
}
