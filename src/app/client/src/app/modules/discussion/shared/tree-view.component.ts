import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { TreeView } from './tree-view.directory';
@Component({
    selector: 'tree-view-menu',
    template: '<tree-view [replyList]="replyList"></tree-view>',
})
export class TreeViewComponent implements OnInit, OnChanges {
    @Input() replyList: any;
    constructor() {
    }
    ngOnInit() {
    }
    ngOnChanges() { }
}