import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryWithCities } from '../models/country-with-cities';
import { CountryWithCitiesService } from '../service/country-with-cities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../models/country';
import { City } from '../models/city';

@Component({
  selector: 'app-edit-cwc',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-cwc.component.html',
  styleUrl: './edit-cwc.component.css',
})
export class EditCWCComponent implements OnInit {
  constructor(
    private s: CountryWithCitiesService,
    private r: Router,
    private route: ActivatedRoute
  ) {}

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
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.s.getCountry(Number(id)).subscribe({
            next: (res) => {
              this.cityList = res.cities;
              this.countryOBJ = {
                id: res.country.id,
                iso2: res.country.iso2,
                iso3: res.country.iso3,
                name: res.country.name,
                picture: res.country.picture,
                cities: this.cityList,
              };
            },
          });
        }
      },
    });
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

  removeC(c: City, arry: any[]) {
    var r = arry.findIndex(
      (o) => o.name == c.name && o.lan == c.lan && o.lot == c.lot
    );
    if (r > -1) {
      arry.splice(r, 1);
    }
  }

  updateCWC() {
    this.s.updateCWC(this.countryOBJ.id, this.countryOBJ).subscribe({
      next: (response) => {
        this.r.navigate(['Index']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
