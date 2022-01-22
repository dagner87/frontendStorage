import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spinners',
  templateUrl: './spinners.component.html',
  styleUrls: ['./spinners.component.scss'],
})
export class SpinnersComponent implements OnInit {
  @ViewChild('loading', { static: true }) template: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {}
}
