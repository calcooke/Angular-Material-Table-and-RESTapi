import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobsApiService {

  private API_URL = 'https://hirehive-testing-account.hirehive.com/api/v1/jobs';

  constructor(private httpClient: HttpClient) {



  }

  getJobListing() {
    return this.httpClient.get(this.API_URL);
  }
}
