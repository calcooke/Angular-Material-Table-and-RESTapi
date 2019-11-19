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

      // Setting a custom filter.

      this.jobsList.filterPredicate = (data, filter) => {

        // If the user clicks on a category tag, the jobsList data will
        // be filtered by categories

        if (this.categoryTag != null) {

          const dataStr = data.category.toLowerCase();
          return dataStr.indexOf(filter) !== -1;

          // If a user searches via the input, the data is filtered by job title and description.

        } else if (this.searchKey != null) {

          const dataStr = data.title.toLowerCase() + data.description.text.toLowerCase();
          return dataStr.indexOf(filter) !== -1;

        }

      };

      // Once data is returned and assigned, populate the table

      this.populateData();

    });

  }

  populateData() {

    // Set the material table data source to be the now filtered (or unfiltered) data.

    this.table.dataSource = this.jobsList;

  }


  filterByTag(category) {

    // Function called when a category tag is clicked on
    // Clear the input

    this.searchKey = null;

    this.categoryTag = category;

    // Filter by selected category

    this.jobsList.filter = this.categoryTag.trim().toLowerCase();

  }

  applyFilter() {

    // Called from every keyUp
    // Resetting category tag when the search bar is in use.

    this.categoryTag = null;

    // Filter the data by the search key.
    // The search key is determined by the value of the input field.

    // Data will only be filtered when the user enters two or more characters
    if (this.searchKey.length >= 2) {
      this.jobsList.filter = this.searchKey.trim();
    } else {
      this.jobsList.filter = '';
    }

  }


  clearSearch() {

    // Reset the searchKey to an empty string.
    // The categoryTag also gets reset once applyFilter is called below.
    this.searchKey = '';
    // Reset the filtered data.
    this.applyFilter();

  }


  viewJob(url: string) {

    // Called when the user clicks a row
    // Opens the job application page in a new tab
    window.open(url, '_blank');

  }

}
