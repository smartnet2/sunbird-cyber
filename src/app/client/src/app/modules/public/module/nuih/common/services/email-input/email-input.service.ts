import { of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';
import { ConfigService, ServerResponse } from '@sunbird/shared';
import { ContentService, UserService, CoursesService } from '@sunbird/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { EmailService } from '../email/email.service';

@Injectable()
export class WriteEmailService {
  /**
 * Reference of content service.
 */
  public contentService: ContentService;
  public emailService: EmailService;

  /**
   * Reference of config service
   */
  public configService: ConfigService;

  public courseProgress: any = {};

  public userService: UserService;

  /**
  * An event emitter to emit course progress data from a service.
  */
  courseProgressData: EventEmitter<any> = new EventEmitter();


  constructor(contentService: ContentService, emailService: EmailService, configService: ConfigService,
    userService: UserService, public coursesService: CoursesService) {
    this.contentService = contentService;
    this.emailService = emailService;
    this.configService = configService;
    this.userService = userService;
  }
  public postEmail(payLoad) {
    const channelOptions = {
      url: this.configService.urlConFig.URLS.EMAIL.EMAIL_POST,
      data: payLoad
    };
    return this.emailService.post(channelOptions).pipe(map((res: ServerResponse) => {
      return res;
    }), catchError((err) => {
      return err;
    }));
  }
}