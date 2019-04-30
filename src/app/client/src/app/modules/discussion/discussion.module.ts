import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscussionComponent } from './component';
import { CourseDiscussService } from './services';
import { DiscussionService } from './services';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// #NUIH change Froala Rich Text Editor Module Imported:
import { QuillEditorModule } from 'ngx-quill-editor';
import { TreeViewComponent } from './shared/tree-view.component';
import { TreeView } from './shared/tree-view.directory';
import { TreeViewService } from './shared/tree-view.service';
// #NUIH change:
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    QuillEditorModule
  ],
  providers: [CourseDiscussService, DiscussionService, TreeViewService],
  exports: [DiscussionComponent],
  declarations: [DiscussionComponent, TreeViewComponent, TreeView]
})
export class DiscussionModule { }
