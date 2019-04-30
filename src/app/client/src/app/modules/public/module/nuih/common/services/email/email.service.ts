import { ConfigService } from '@sunbird/shared';
import { DataService } from '../../../../../../core/services/data/data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
/**
 * Service to provides CRUD methods to make content api request by extending DataService.
 *
 */
@Injectable()
export class EmailService extends DataService {
  /**
   * base Url for content api
   */
  baseUrl: string;
  /**
   * reference of config service.
   */
  public config: ConfigService;
  /**
   * reference of lerner service.
   */
  public http: HttpClient;
  /**
   * constructor
   * @param {ConfigService} config ConfigService reference
   * @param {HttpClient} http HttpClient reference
   */
  constructor(config: ConfigService, http: HttpClient, test: DataService) {
    super(http);
    this.config = config;
    this.baseUrl = "/";
  }
}
