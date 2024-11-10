import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent implements OnInit {

  project: string = '';
  constructor(private ar: ActivatedRoute
    ) {
      this.project = this.ar.snapshot?.data['project'];
    }
  ngOnInit(): void {
  }

}
