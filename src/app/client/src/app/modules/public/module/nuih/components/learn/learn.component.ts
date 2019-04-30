import { combineLatest as observableCombineLatest } from 'rxjs';
import { PageApiService, PlayerService, ISort, OrgDetailsService } from '@sunbird/core';
import { PublicPlayerService } from './../../../../services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ResourceService, ToasterService, INoResultMessage,
  ConfigService, UtilService, NavigationHelperService
} from '@sunbird/shared';
import { ICaraouselData } from '@sunbird/shared';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { IInteractEventEdata, IImpressionEventInput } from '@sunbird/telemetry';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit, OnDestroy {
  /**
   * To show toaster(error, success etc) after any API calls
   */
  private toasterService: ToasterService;
  /**
   * 
   * 
   * To call resource service which helps to use language constant
   */
  public resourceService: ResourceService;
  /**
  * To call get resource data.
  */
  private pageSectionService: PageApiService;

  public orgDetailsService: OrgDetailsService;
  /**
   * This variable hepls to show and hide page loader.
   * It is kept true by default as at first when we comes
   * to a page the loader should be displayed before showing
   * any data
   */
  showLoader = true;
  /**
  * To show / hide no result message when no result found
 */
  noResult = false;
  /**
  * no result  message
 */
  noResultMessage: INoResultMessage;
  /**
  * Contains result object returned from getPageData API.
  */
  booksCarouselData: Array<ICaraouselData> = [];
  public config: ConfigService;
  public filterType: string;
  public filters: any;
  public queryParams: any;
  private router: Router;
  public redirectUrl: string;
  sortingOptions: Array<ISort>;
  contents: any;
  hashTagId: string;
  slug = '';
  isSearchable = false;
  public unsubscribe$ = new Subject<void>();
  telemetryImpression: IImpressionEventInput;
  inviewLogs = [];
  filterIntractEdata: IInteractEventEdata;
  sortIntractEdata: IInteractEventEdata;
  /**
   * The "constructor"
   *
   * @param {PageApiService} pageSectionService Reference of pageSectionService.
   * @param {ToasterService} iziToast Reference of toasterService.
   */
  constructor(pageSectionService: PageApiService, toasterService: ToasterService, private playerService: PlayerService,
    resourceService: ResourceService, config: ConfigService, private activatedRoute: ActivatedRoute, router: Router,
    public utilService: UtilService, public navigationHelperService: NavigationHelperService,
    orgDetailsService: OrgDetailsService, private publicPlayerService: PublicPlayerService) {
    this.pageSectionService = pageSectionService;
    this.toasterService = toasterService;
    this.resourceService = resourceService;
    this.orgDetailsService = orgDetailsService;
    this.config = config;
    this.router = router;
    this.router.onSameUrlNavigation = 'reload';
    this.sortingOptions = this.config.dropDownConfig.FILTER.RESOURCES.sortingOptions;
  }

  populatePageData() {
    this.showLoader = true;
    this.noResult = false;
    const option = {
      source: 'web',
      name: 'Explore',
      filters: _.pickBy(this.filters, value => value.length > 0),
      sort_by: { [this.queryParams.sort_by]: this.queryParams.sortType }
    };
    this.pageSectionService.getPageData(option).pipe(
      takeUntil(this.unsubscribe$))
      .subscribe(
        (apiResponse) => {
          if (apiResponse && apiResponse.sections) {
            let noResultCounter = 0;
            this.showLoader = false;
            this.booksCarouselData = _.cloneDeep([apiResponse.sections[0]]);
            _.forEach(this.booksCarouselData, (value, index) => {
              if (this.booksCarouselData[index].contents && this.booksCarouselData[index].contents.length > 0) {
                const constantData = this.config.appConfig.ExplorePage.constantData;
                const metaData = this.config.appConfig.ExplorePage.metaData;
                const dynamicFields = this.config.appConfig.ExplorePage.dynamicFields;
                this.booksCarouselData[index].contents = this.utilService.getDataForCard(this.booksCarouselData[index].contents,
                  constantData, dynamicFields, metaData);
              }
            });
            if (this.booksCarouselData.length > 0) {
              _.forIn(this.booksCarouselData, (value, key) => {
                if (this.booksCarouselData[key].contents === null) {
                  noResultCounter++;
                } else if (this.booksCarouselData[key].contents === undefined) {
                  noResultCounter++;
                }
              });
            }
            if (noResultCounter === this.booksCarouselData.length) {
              this.noResult = true;
              this.noResultMessage = {
                'message': this.resourceService.messages.stmsg.m0007,
                'messageText': this.resourceService.messages.stmsg.m0006
              };
            }
          }
        },
        err => {
          this.noResult = true;
          this.noResultMessage = {
            'message': this.resourceService.messages.stmsg.m0007,
            'messageText': this.resourceService.messages.stmsg.m0006
          };
          this.showLoader = false;
          this.toasterService.error(this.resourceService.messages.fmsg.m0004);
        }
      );
  }

  ngOnInit() {
    this.slug = this.activatedRoute.snapshot.params.slug;
    this.filterType = this.config.appConfig.explore.filterType;
    this.redirectUrl = this.config.appConfig.explore.inPageredirectUrl;
    this.getQueryParams();
    this.getChannelId();
    this.telemetryImpression = {
      context: {
        env: this.activatedRoute.snapshot.data.telemetry.env
      },
      edata: {
        type: this.activatedRoute.snapshot.data.telemetry.type,
        pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
        uri: this.router.url,
        subtype: this.activatedRoute.snapshot.data.telemetry.subtype
      }
    };
    this.filterIntractEdata = {
      id: 'filter',
      type: 'click',
      pageid: this.activatedRoute.snapshot.data.telemetry.pageid
    };
    this.sortIntractEdata = {
      id: 'sort',
      type: 'click',
      pageid: this.activatedRoute.snapshot.data.telemetry.pageid
    };
    // Timer Counter Starts Here
    (function ($) {
      (<any>$.fn).countTo = function (options) {
        options = options || {};

        return $(this).each(function () {
          // set options for current element
          var settings = $.extend({}, (<any>$.fn).countTo.defaults, {
            from: $(this).data('from'),
            to: $(this).data('to'),
            speed: $(this).data('speed'),
            refreshInterval: $(this).data('refresh-interval'),
            decimals: $(this).data('decimals')
          }, options);

          // how many times to update the value, and how much to increment the value on each update
          var loops = Math.ceil(settings.speed / settings.refreshInterval),
            increment = (settings.to - settings.from) / loops;

          // references & variables that will change with each update
          var self = this,
            $self = $(this),
            loopCount = 0,
            value = settings.from,
            data = $self.data('countTo') || {};

          $self.data('countTo', data);

          // if an existing interval can be found, clear it first
          if (data.interval) {
            clearInterval(data.interval);
          }
          data.interval = setInterval(updateTimer, settings.refreshInterval);

          // initialize the element with the starting value
          render(value);

          function updateTimer() {
            value += increment;
            loopCount++;

            render(value);

            if (typeof (settings.onUpdate) == 'function') {
              settings.onUpdate.call(self, value);
            }

            if (loopCount >= loops) {
              // remove the interval
              $self.removeData('countTo');
              clearInterval(data.interval);
              value = settings.to;

              if (typeof (settings.onComplete) == 'function') {
                settings.onComplete.call(self, value);
              }
            }
          }

          function render(value) {
            var formattedValue = settings.formatter.call(self, value, settings);
            $self.html(formattedValue);
          }
        });
      };

      (<any>$.fn).countTo.defaults = {
        from: 0,               // the number the element should start at
        to: 0,                 // the number the element should end at
        speed: 1000,           // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,           // the number of decimal places to show
        formatter: formatter,  // handler for formatting the value before rendering
        onUpdate: null,        // callback method for every time the element is updated
        onComplete: null       // callback method for when the element finishes updating
      };

      function formatter(value, settings) {
        return value.toFixed(settings.decimals);
      }
    }(jQuery));

    jQuery(function ($) {
      // custom formatting example
      $('.count-number').data('countToOptions', {
        formatter: function (value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
      });

      // start all the timers
      $('.timer').each(count);

      function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        (<any>$this).countTo(options);
      }
    });
    // Timer Counter Ends Here
    //Testimonials carousel Starts here
    // Testimonials carousel (uses the Owl Carousel library)
    (<any>$(".testimonials-carousel")).owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        900: {
          items: 3
        }
      }
    });
    //Testimonials carousel Ends here
  }

  prepareVisits(event) {
    _.forEach(event, (inview, index) => {
      if (inview.metaData.identifier) {
        this.inviewLogs.push({
          objid: inview.metaData.identifier,
          objtype: inview.metaData.contentType,
          index: index,
          section: inview.section,
        });
      }
    });
    this.telemetryImpression.edata.visits = this.inviewLogs;
    this.telemetryImpression.edata.subtype = 'pageexit';
    this.telemetryImpression = Object.assign({}, this.telemetryImpression);
  }

  public playContent(event) {
    this.publicPlayerService.playContent(event);
  }

  compareObjects(a, b) {
    if (a !== undefined) {
      a = _.omit(a, ['language']);
    }
    if (b !== undefined) {
      b = _.omit(b, ['language']);
    }
    return _.isEqual(a, b);
  }

  getQueryParams() {
    observableCombineLatest(
      this.activatedRoute.params,
      this.activatedRoute.queryParams,
      (params: any, queryParams: any) => {
        return {
          params: params,
          queryParams: queryParams
        };
      }).pipe(
        takeUntil(this.unsubscribe$))
      .subscribe(bothParams => {
        this.filters = {};
        this.isSearchable = this.compareObjects(this.queryParams, bothParams.queryParams);
        this.queryParams = { ...bothParams.queryParams };
        _.forIn(this.queryParams, (value, key) => {
          if (key !== 'sort_by' && key !== 'sortType') {
            this.filters[key] = value;
          }
        });
        this.booksCarouselData = [];
        if (this.queryParams.sort_by && this.queryParams.sortType) {
          this.queryParams.sortType = this.queryParams.sortType.toString();
        }
        if (!this.isSearchable) {
          this.populatePageData();
        }
      });
  }

  getChannelId() {
    this.orgDetailsService.getOrgDetails(this.slug).pipe(
      takeUntil(this.unsubscribe$))
      .subscribe(
        (apiResponse: any) => {
          this.hashTagId = apiResponse.hashTagId;
        },
        err => {
          this.router.navigate(['']);
        }
      );
  }
  redirectToUrl(path) {
    this.router.navigate([path]);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
