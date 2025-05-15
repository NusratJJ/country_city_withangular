import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryWithCitiesService } from '../service/country-with-cities.service';
import { Router } from '@angular/router';
import { Country } from '../models/country';
import { City } from '../models/city';
import { CountryWithCities } from '../models/country-with-cities';

@Component({
  selector: 'app-add-cwc',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-cwc.component.html',
  styleUrl: './add-cwc.component.css',
})
export class AddCWCComponent implements OnInit {
  constructor(private s: CountryWithCitiesService, private r: Router) {}
  countryList: Country[] = [];
  cityList: City[] = [];
  countryOBJ: Country = {
    id: 0,
    name: '',
    iso2: '',
    iso3: '',
    picture: null,
    cities: [],
  };
  cityOBJ: City = {
    id: 0,
    name: '',
    lot: 0,
    lan: 0,
    countryId: 0,
  };

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addCity() {
    if (this.cityOBJ.name != '' && this.cityOBJ.name != null) {
      const expr = JSON.stringify(this.cityOBJ);
      const obj = JSON.parse(expr);
      this.cityList.unshift(obj);
      this.cityOBJ = {
        id: 0,
        name: '',
        lot: 0,
        lan: 0,
        countryId: 0,
      };
    }
  }

  saveCWC() {
    const cwc: CountryWithCities = {
      country: this.countryOBJ,
      cities: this.cityList,
    };
    this.s.postCWC(cwc).subscribe({
      next: (x) => {
        alert(`Save successful`);
        this.r.navigate(['Index']);
      },
      error: (err) => {
        alert(`Error occour ${err}`);
      },
    });
  }

  removeC(c: City, arry: any[]) {
    var r = arry.findIndex(
      (o) => o.name == c.name && o.lan == c.lan && o.lot == c.lot
    );
    if (r > -1) {
      arry.splice(r, 1);
    }
  }
}
