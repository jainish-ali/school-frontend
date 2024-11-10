import { Component, Input, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}
  @Input() loadersize :any= "medium";
  ngOnInit(): void {
    this.spinner.show();
  }
}
