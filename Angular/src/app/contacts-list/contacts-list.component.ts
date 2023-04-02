import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact-service.service';
import { Router } from '@angular/router';
import { Contact } from '../models/Contact';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contactsList: Contact[] = [];
  options = {};
  isAsc: boolean = false;

  // columns = [
  //   { key: 'firstName', title: "First name" },
  //   { key: 'lastName', title: 'Last name' },
  //   { key: 'email', title: 'Email' },
  //   { key: 'phoneNumber', title: 'Phone number' },
  //   { key: 'address', title: 'Address' },
  //   { key: 'city', title: 'City' },
  //   { key: 'state', title: 'State' },
  //   { key: 'country', title: 'Country' },
  //   { key: 'postalCode', title: 'Postal code' },
  // ]

  constructor(private contactService: ContactService, private router: Router) {
  }

  ngOnInit(): void {
    this.getContactsList();
  }

  getContactsList() {
    this.contactService.getContacts().subscribe((result: any) => {
      this.contactsList = result;
    });
  }

  contactEdit(contact: Contact) {
    this.router.navigate(['/add-contact']);
    this.contactService.contactDetails.next(contact);
  }

  sort(colName: any) {
    let contactsList: any = this.contactsList;
    if (this.isAsc == true) {
      contactsList.sort((a: any, b: any) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0)
      this.isAsc = !this.isAsc
    }
    else {
      contactsList.sort((a: any, b: any) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
      this.isAsc = !this.isAsc
    }
  }
}
