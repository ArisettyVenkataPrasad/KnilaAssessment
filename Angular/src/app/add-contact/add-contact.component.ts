import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact-service.service';
import { Router } from '@angular/router';
import { Contact } from '../models/Contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {

  contactForm: any;
  contactId: any;

  constructor(private contactService: ContactService, private router: Router) {
    this.buildForm();
  }

  ngOnInit() {
    this.contactService.contactDetails.subscribe((contactInfo) => {
      this.bindContactDetails(contactInfo);
    });
  }

  buildForm() {
    this.contactForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      City: new FormControl('', [Validators.required]),
      State: new FormControl('', [Validators.required]),
      Country: new FormControl('', [Validators.required]),
      PostalCode: new FormControl('', [Validators.required]),
    });
  }

  bindContactDetails(contactInfo: any) {
    if (contactInfo) {
      this.contactId = contactInfo.Id;
      this.contactForm.get('FirstName').setValue(contactInfo.FirstName);
      this.contactForm.get('LastName').setValue(contactInfo.LastName);
      this.contactForm.get('Email').setValue(contactInfo.Email);
      this.contactForm.get('PhoneNumber').setValue(contactInfo.PhoneNumber);
      this.contactForm.get('Address').setValue(contactInfo.Address);
      this.contactForm.get('City').setValue(contactInfo.City);
      this.contactForm.get('State').setValue(contactInfo.State);
      this.contactForm.get('Country').setValue(contactInfo.Country);
      this.contactForm.get('PostalCode').setValue(contactInfo.PostalCode);
    }
  }

  addContact() {
    let contactDetails: Contact = this.contactForm.value;
    if (!this.contactId) {
      contactDetails.Id = 0;
      this.contactService.addContact(contactDetails).subscribe((result: any) => {
        this.router.navigate(['/contacts']);
      });
    } else {
      contactDetails.Id = this.contactId;
      this.contactService.editContact(contactDetails).subscribe((result: any) => {
        this.router.navigate(['/contacts']);
      });;
    }
  }

  ngOnDestroy() {
    this.contactService.contactDetails.next(null);
  }
}
