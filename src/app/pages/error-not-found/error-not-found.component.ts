import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-not-found',
  templateUrl: './error-not-found.component.html',
  styleUrls: ['./error-not-found.component.css']
})
export class ErrorNotFoundComponent implements OnInit {

  constructor(private location: Location,) { }

  ngOnInit(): void {
  }

  onRegresar() {
    this.location.back();
  }
}
