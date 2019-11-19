import { Component, OnInit, ViewChild } from '@angular/core';
import { JobsApiService } from '../jobs-api.service';
import {  MatTableDataSource, MatSort, MatPaginator, MatTable} from '@angular/material';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit {

  jobsList: MatTableDataSource<any>;
  displayedColumns: string[] = ['position', 'category', 'location', 'view'];
  @ViewChild(MatPaginator, { static: false } as any) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false } as any) sort: MatSort;
  @ViewChild(MatTable, { static: false } as any) table: MatTable<any>;
  searchKey: String;

  constructor(private apiService: JobsApiService) { }

  ngOnInit() {

    // Retrieve jobs list and assign to jobsList

    this.apiService.getJobListing().subscribe((data: any[]) => {

      this.jobsList = new MatTableDataSource(data['jobs']);
      this.table.dataSource  = this.jobsList;
      this.populateData();
    });

  }

  populateData() {

    console.log("populate data called");
    // this.listData = new MatTableDataSource(this.finalReports);

  }

}
