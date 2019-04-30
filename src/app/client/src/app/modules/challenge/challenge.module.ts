import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeComponent, CollectionPlayerComponent, ContentPlayerComponent } from './components';
import { SharedModule } from '@sunbird/shared';
import { SuiModule } from 'ng2-semantic-ui/dist';
import { SlickModule } from 'ngx-slick';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@sunbird/core';
// import { DiscussionModule } from '@sunbird/discussion';
import { NotesModule } from '@sunbird/notes';
import { BadgingModule } from '@sunbird/badge';
import { NgInviewModule } from 'angular-inport';
import { TelemetryModule } from '@sunbird/telemetry';
import { ChallengeRoutingModule } from './challenge-routing.module';
@NgModule({
  imports: [
    CommonModule,
    ChallengeRoutingModule,
    SharedModule,
    SuiModule,
    SlickModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    // DiscussionModule,
    NotesModule,
    BadgingModule,
    TelemetryModule,
    NgInviewModule
  ],
  declarations: [ChallengeComponent, CollectionPlayerComponent, ContentPlayerComponent]
})
export class ChallengeModule {
  }
