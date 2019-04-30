import { ActivatedRoute } from '@angular/router';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ICaraouselData } from '../../interfaces/caraouselData';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import * as _ from 'lodash';

/**
 * This display a a section
 */
@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.css']
})
export class PageFooterComponent implements OnInit {
  inviewLogs = [];
  slides = [
    { img: "../../../../../assets/images/img-1.jpg" },
    { img: "../../../../../assets/images/img-2.jpg" },
    { img: "../../../../../assets/images/img-3.jpg" },
    { img: "../../../../../assets/images/img-4.jpg" },
    { img: "../../../../../assets/images/img-1.jpg" },
    { img: "../../../../../assets/images/img-2.jpg" },
  ];
  slideConfig = { 'slidesToShow': 4, 'slidesToScroll': 4, infinite: false };

  constructor(public activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {

  }
  /**
   * get inviewChange
  */
  inviewChange(contentList, event) {
    const visits = [];
    const slideData = contentList.slice(event.currentSlide + 1, event.currentSlide + 5);
    // _.forEach(slideData, (slide, key) => {
    //   const content = _.find(this.inviewLogs, (eachContent) => {
    //     if (slide.metaData.courseId) {
    //       return eachContent.metaData.courseId === slide.metaData.courseId;
    //     } else if (slide.metaData.identifier) {
    //       return eachContent.metaData.identifier === slide.metaData.identifier;
    //     }
    //   });
    //   if (content === undefined) {
    //     slide.section = this.section.name;
    //     this.inviewLogs.push(slide);
    //     visits.push(slide);
    //   }
    // });
    // if (visits.length > 0) {
    //   this.visits.emit(visits);
    // }
  }
}
