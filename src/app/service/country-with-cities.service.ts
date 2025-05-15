import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryWithCities } from '../models/country-with-cities';
import { Country } from '../models/country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryWithCitiesService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:5121/api/City';

  getCWC() {
    return this.http.get<CountryWithCities[]>(
      `${this.baseUrl}/GetAllCountriesWithCities`
    );
  }

  postCWC(cwc: CountryWithCities) {
    return this.http.post<any>(`${this.baseUrl}/AddCountryAndCities`, cwc);
  }

  deleteCWC(countryId: number) {
    return this.http.delete<any>(
      `${this.baseUrl}/DeleteCountryAndCities/${countryId}`
    );
  }

  getCountry(countryId: number) {
    return this.http.get<CountryWithCities>(
      `${this.baseUrl}/GetCountryWithCitiesbyId/${countryId}`
    );
  }
  updateCWC(
    countryId: number,
    country: Country
  ): Observable<CountryWithCities> {
    return this.http.put<CountryWithCities>(
      `${this.baseUrl}/PutCountryAndCities/${countryId}`,
      country
    );
  }
}
