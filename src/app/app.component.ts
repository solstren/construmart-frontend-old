import {Component, OnInit} from '@angular/core';
import {ConfigService} from "./shared/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  company: any;

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.company = this.configService.COMPANY_NAME;
  }
}
