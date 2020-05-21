import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  base_path:any="http://dummy.restapiexample.com";
  employee:any=[];
  constructor(
    private http: HttpClient
  ) {}
  ngOnInit(){
    this.getList()
  }
   // Handle API errors
   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
   // Get single student data by ID
   getItem(id) {
     var self=this
     this.http
      .get<any>("http://dummy.restapiexample.com/api/v1/employee"+id)
      .pipe(
        // retry(2),
        // catchError(this.handleError)
      )
  }

  // Get students data
  getList() {
    var self=this;
    this.http
      .get('http://dummy.restapiexample.com/api/v1/employees')
      .pipe(
        // retry(2),
        // catchError(this.handleError)
      ).subscribe((data:any)=>{
        console.log("this.employee",data['data'])
        self.employee=[...data['data']]      })
  }

}
