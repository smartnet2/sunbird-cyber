import { SuiModule } from 'ng2-semantic-ui/dist';
import { SlickModule } from 'ngx-slick';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
   AnnouncementInboxCardComponent,
  PageSectionComponent, PageFooterComponent,NoResultComponent, AppLoaderComponent, PlayerComponent,
  CollectionTreeComponent, FancyTreeComponent, CardComponent, ShareLinkComponent, CollectionPlayerMetadataComponent,
  BrowserCompatibilityComponent, QrCodeModalComponent, RedirectComponent, CustomMultiSelectComponent
} from './components';
import {
  ConfigService, ResourceService, FileUploadService, ToasterService, WindowScrollService, BrowserCacheTtlService,
  PaginationService, RouterNavigationService, NavigationHelperService, UtilService, ContentUtilsServiceService, ExternalUrlPreviewService
} from './services';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { DateFormatPipe, DateFilterXtimeAgoPipe, FilterPipe, InterpolatePipe } from './pipes';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { CacheService } from 'ng2-cache-service';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TelemetryModule } from '@sunbird/telemetry';
import { NgInviewModule } from 'angular-inport';
import { CdnprefixPipe } from './pipes/cdnprefix.pipe';
import { ContentRatingComponent } from './components/content-rating/content-rating.component';
@NgModule({
  imports: [
    CommonModule,
    SuiModule,
    SlickModule,
    FormsModule,
    TelemetryModule,
    NgInviewModule
  ],
  declarations: [AppLoaderComponent, AnnouncementInboxCardComponent,
    DateFormatPipe, PageSectionComponent, PageFooterComponent,NoResultComponent, DateFilterXtimeAgoPipe,
    CollectionTreeComponent, FancyTreeComponent, PlayerComponent, CardComponent, FilterPipe, InterpolatePipe,
    ShareLinkComponent, CollectionPlayerMetadataComponent, BrowserCompatibilityComponent, QrCodeModalComponent, CdnprefixPipe,
    RedirectComponent, CustomMultiSelectComponent, ContentRatingComponent],
  exports: [AppLoaderComponent, AnnouncementInboxCardComponent, DateFormatPipe, DateFilterXtimeAgoPipe,
    PageSectionComponent, PageFooterComponent,NoResultComponent, CollectionTreeComponent, FancyTreeComponent,
    PlayerComponent, CardComponent, FilterPipe, ShareLinkComponent, CollectionPlayerMetadataComponent, BrowserCompatibilityComponent,
    QrCodeModalComponent, CdnprefixPipe, InterpolatePipe, RedirectComponent, CustomMultiSelectComponent, ContentRatingComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ResourceService, ConfigService, FileUploadService, ToasterService, Ng2IzitoastService, PaginationService,
        RouterNavigationService, WindowScrollService, NavigationHelperService, CacheService, UtilService, ContentUtilsServiceService,
        DeviceDetectorModule, DeviceDetectorService, BrowserCacheTtlService, ExternalUrlPreviewService]
    };
  }
}
