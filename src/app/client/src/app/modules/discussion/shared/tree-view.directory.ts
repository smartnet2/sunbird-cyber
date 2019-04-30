import { Component, Input, OnChanges } from '@angular/core';
import { TreeViewService } from './tree-view.service';
@Component({
    selector: 'tree-view',
    templateUrl: './tree-view.html',
    styleUrls: ['./tree-view.css']
})
export class TreeView implements OnChanges {
    @Input() replyList: any;
    ngOnChanges() { }
    constructor(public treeViewService: TreeViewService) { }
    parseBody(body) {
        if (body.includes('</a>')) {
            return true;
        } else {
            return false;
        }
    }
    getPostNumber(postNumber) {
        this.treeViewService.setPostNumber(postNumber);
    }
}