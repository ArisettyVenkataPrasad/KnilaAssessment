import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { Contact } from './models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  readonly APIUrl = "https://localhost:44320/api";
  contactDetails: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.APIUrl + '/Values').pipe(
      catchError(this.errorHandler)
    );
  }

  addContact(contact: Contact) {
    return this.httpClient.post<Contact>(this.APIUrl + '/Values', contact).pipe(
      catchError(this.errorHandler)
    );
  }

  editContact(contact: Contact) {
    return this.httpClient.put(this.APIUrl + '/Values', contact).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
