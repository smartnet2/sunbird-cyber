import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { WriteEmailService } from '../../services/email-input/email-input.service';
@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']
})
export class EmailInputComponent {
  emailField: string;
  showstatusMessage: boolean;
  // responseStatus: any;
  ngOnInit() { }
  constructor(public emailService: WriteEmailService) { }
  postEmail(emailForm) {
    this.emailField = this.emailField.trim();
    if (emailForm.valid) {
      this.emailService.postEmail({ emailid: this.emailField }).subscribe((response) => {
        // this.responseStatus = response;
        this.emailField = '';
        emailForm.submitted = false;
        this.showHideMessage();
      });
    }
  }
  showHideMessage() {
    this.showstatusMessage = true;
    setTimeout(() => {
      this.showstatusMessage = false;
    }, 15000);
  }
}