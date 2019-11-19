import { Component, OnInit, ViewChild } from '@angular/core';
import { JobsApiService } from '../jobs-api.service';
import { MatTableDataSource, MatSort, MatPaginator, MatTable } from '@angular/material';

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
  categoryTag: String;

  constructor(private apiService: JobsApiService) { }

  ngOnInit() {

    // Retrieve jobs list from the API service and assign to jobsList variable

    this.apiService.getJobListing().subscribe((data: any[]) => {

      this.jobsList = new MatTableDataSource(data['jobs']);

      // Setting a custom filter to determine which columns to search by.
      // This will ignore everything besides the title and description.text

      this.jobsList.filterPredicate = (data, filter) => {

        if (this.categoryTag != null) {
          const dataStr = data.category.toLowerCase();
          return dataStr.indexOf(filter) !== -1;
        } else if(this.searchKey != null){
        const dataStr = data.title.toLowerCase() + data.description.text.toLowerCase();
        return dataStr.indexOf(filter) !== -1;
        }
        
      };

      // Once data is returned and assigned, populate the table

      this.populateData();

    });

  }

  populateData() {

    this.table.dataSource = this.jobsList;

  }

  // Function called when a category tag is clicked on

  filterByTag(category) {

    this.categoryTag = category;

    // Creating a custom filter just for categories

    // this.jobsList.filterPredicate = (data, filter) => {
    //   const dataStr = data.category.toLowerCase();
    //   return dataStr.indexOf(filter) !== -1;
    // };

    this.jobsList.filter = this.categoryTag.trim().toLowerCase();

  }

  applyFilter() {

    this.categoryTag = null;

    // Filter the data by the search key.
    // the search key is determined by the value of the input field.

    if (this.searchKey.length >= 2) {
      this.jobsList.filter = this.searchKey.trim();
    } else {
      this.jobsList.filter = '';
    }

  }



  // Reset the search term to an empty string.
  clearSearch() {

    this.searchKey = '';
    // Reset the filtered data.
    this.applyFilter();

  }

  // Open the job application page in a new tab

  viewJob(url: string) {

    window.open(url, '_blank');

  }

}
