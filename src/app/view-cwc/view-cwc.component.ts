import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountryWithCities } from '../models/country-with-cities';
import { CountryWithCitiesService } from '../service/country-with-cities.service';

@Component({
  selector: 'app-view-cwc',
  imports: [CommonModule, RouterLink],
  templateUrl: './view-cwc.component.html',
  styleUrl: './view-cwc.component.css',
})
export class ViewCWCComponent implements OnInit {
  constructor(private s: CountryWithCitiesService) {}
  list: CountryWithCities[] = [];

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.s.getCWC().subscribe((data) => {
      this.list = data;
    });
  }

  onDelete(cwc: CountryWithCities) {
    var isConf = confirm(`delete this country ${cwc.country.name}`);
    if (isConf) {
      this.s.deleteCWC(cwc.country.id).subscribe(() => {
        alert(`delete successful`);
        this.getList();
      });
    }
  }
}
