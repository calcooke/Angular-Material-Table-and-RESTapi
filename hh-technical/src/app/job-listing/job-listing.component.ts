import { Component, OnInit } from '@angular/core';
import { JobsApiService } from '../jobs-api.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit {

  constructor(private apiService: JobsApiService) { }

  ngOnInit() {

    this.apiService.getJobListing().subscribe((data: any[]) => {
      console.log(data);

    });
  }

}
