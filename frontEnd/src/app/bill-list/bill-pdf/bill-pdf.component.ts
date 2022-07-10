import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToWords } from 'to-words';
import { CommonService } from 'src/app/module/common.service';

@Component({
  selector: 'app-bill-pdf',
  templateUrl: './bill-pdf.component.html',
  styleUrls: ['./bill-pdf.component.css']
})
export class BillPdfComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  data;
  toWords = new ToWords();
  bankDetails: any;
  lrData: any[] = [];
  constructor(private location: Location, private router: Router, private cs: CommonService) {
    if (this.router?.getCurrentNavigation()?.extras.state !== undefined) {
      this.data = this.router?.getCurrentNavigation()?.extras?.state?.['data'];
    } else {
      this.location.back();
    }
  }

  ngOnInit(): void {
    console.log(this.data);

    this.data.amountInWord = this.toWords.convert(this.data.totalAmount) + " Only";
    this.getBankDetails();
  }

  getBankDetails() {
    this.cs.getBankDetails().subscribe((res: any) => {
      this.bankDetails = res[0];
    })
  }

  public openPDF(): void {
    console.log(this.data.billNo);
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      // PDF.save('angular-demo.pdf');
      // PDF.autoPrint()
      window.open(URL.createObjectURL(PDF.output("blob")))
      // PDF.save(`Bill No - ${this.data.billNo}.pdf`);

    });
  }

  back() {
    this.location.back();
  }
}
