import { Component, ViewChild } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild('scroll') ionScroll
  scrollEventRemover: any

  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  public todayToggle:boolean = true;
  public tomorrowToggle:boolean = false;
  public obToggle:boolean = false;
  public quaddieToggle:boolean = false;
  public firstFourToggle:boolean = false;
  public videoToggle:boolean = false;
  public segment = 'all';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
   ){
    // If we navigated to this page, we will have an item available as a nav param
    // this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[1]
      });
    }
  } //end constructor


  ngAfterViewInit(){
    this.scrollEventRemover = this.ionScroll.addScrollEventListener((event)=>{

      //check if any filters have been selected
      var filters = event.srcElement.children["0"].children["0"].children;

      for(let filter of filters) {
        if (filter.className === "filter selected") {
          var elem = filter.getBoundingClientRect();
          var isVis = this.isElementVisible(elem);
         
          if (isVis === "left") {
            $(".left-arrow").addClass("show");
          } else if (isVis === "right") {
            $(".right-arrow").addClass("show");
          } else if (isVis === "visible") {
            $(".left-arrow").removeClass("show");
            $(".right-arrow").removeClass("show");
          }
        }
      }
      })
  }

  isElementVisible(elem) {
    var right = "right";
    var left = "left";
    var visible = "visible";
    //add extra conditions if not left and not right
    if (elem.left >= (window.innerWidth || document.documentElement.clientWidth)) {
      return right;
    } else if (elem.right <= 0) {
      return left;
    } else {
      return visible;
    }
  }
}
