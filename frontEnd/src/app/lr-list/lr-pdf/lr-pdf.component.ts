import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/module/common.service';

@Component({
  selector: 'app-lr-pdf',
  templateUrl: './lr-pdf.component.html',
  styleUrls: ['./lr-pdf.component.css'],
})
export class LrPdfComponent implements OnInit {
  data: any;
  // toWords = new ToWords();
  // bankDetails: any;
  lrData: any[] = [];
  constructor(
    private location: Location,
    private router: Router,
    private cs: CommonService
  ) {
    if (this.router?.getCurrentNavigation()?.extras.state !== undefined) {
      this.data = this.router?.getCurrentNavigation()?.extras?.state?.['data'];
      console.log(this.data, 'this.data');
    } else {
      this.location.back();
    }
  }

  ngOnInit(): void {}
  openPDF() {}
  back() {
    this.location.back();
  }
}
