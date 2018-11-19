
import { Component, ElementRef, NgZone, OnInit, ViewChild, NgModule, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
import * as Clipboard from 'clipboard';
import { AppSettings } from '../const/app_config';

import { countryUnitSystem } from '../const/country_Array';
import { MatSnackBar } from '@angular/material';
import { MapCss } from '../const/map_css';
import { HttService } from '../htt.service';

@Component({
  selector: 'app-httmap',
  templateUrl: './httmap.component.html',
  styleUrls: ['./httmap.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('mobileSlideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, 94%, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),

  ]
})

export class HttmapComponent implements OnInit {

  @ViewChild('source') source: ElementRef;
  @ViewChild('destination') destination: ElementRef;
  Arr = Array;
  num: number = 6;
  num1: number = 18;
  num2: number = 25;
  num3: number = 30;
  num4: number = 20;
  num5: number = 10;
  private mapProp: any;
  private map: any;
  private marker: any;
  public sourceLocation: any;
  public destinationLocation: any;
  public sourcelng;
  public sourcelat;
  public showValue: boolean;
  public hyperloopSpeed: number;
  public hyperloopMiledSpeed: number;
  public hyperloopMinSpeed: number = 650;
  public hyperloopMaxSpeed: number = 1200;
  hyperloopAvgTime: number = 1050
  public drivingSpeed: number = 130;
  public publicTransportSpeed: number = 336;
  public airplanSpeed: any;
  public airplanAvgSpeed: number = 450;
  public airplaneMileSpeed: any;
  public destinationLatlang;
  public sourcelatlang;
  public distance: number;
  public hyperloopTime: number = 0.00;
  public drivingTime: any;
  public PTTime: any;
  public airplanTime: any = 0.00;
  public sidenavval: boolean = true;
  public transitDistance: number;
  public drivingDistance: number;
  public flightPath;
  public flightPathShadow;
  public refresh: boolean = true;
  autoDriveSteps: any = [];
  remainingSeconds = 0;
  public currentpos;
  public playroute: boolean = true;
  public param1: any;
  public miledistance;
  public transitmile;
  public drivingmile;
  public distInKms: boolean = false;
  public link;
  public converter: boolean = false;
  public converterForMobile: boolean = false;
  public showSpeedoMeter: boolean = false;
  public autocomplete: any;
  public autocompletedest: any;
  public animationMarker: any;
  menuState: string = 'in';
  arrow: string = "in";
  public hidebar: boolean = false;
  public errormsg: boolean = false;
  public message: string;
  public publicttime: any = 0.00;
  public dtime: any = 0.00;
  public emperialcarUnit: any;
  public emperialtrainUnit: any;
  public exceedlimit: boolean = true;
  public hdistanceInMiles: any;
  public countryName: any;
  public hdistance: any;
  public coEmissionTabClicked = false;
  public passengerInfoClick = false;
  public travelInfoClick = false;
  public active;
  public timesactive;
  public speedactive;
  public passactive;
  public co2active;

  resetSpeedoMeter() {
    this.canvas1 = undefined;
    this.ctx1 = undefined;
    this.x1 = undefined;
    this.y1 = undefined;
    this.radius1 = 88;
    this.circum1 = Math.PI * 2;
    this.start1 = Math.PI / -2;
    this.finish1 = 65;
    this.curr1 = 0;
    this.width1 = undefined;
    this.height1 = undefined;

    this.canvas2 = undefined;
    this.ctx2 = undefined;
    this.x2 = undefined;
    this.y2 = undefined;
    this.radius2 = 66;
    this.circum2 = Math.PI * 2;
    this.start2 = Math.PI / -2;
    this.finish2 = 40;
    this.curr2 = 0;
    this.width2 = undefined;
    this.height2 = undefined;

    this.canvas3 = undefined;
    this.ctx3 = undefined;
    this.x3 = undefined;
    this.y3 = undefined;
    this.radius3 = 44;
    this.circum3 = Math.PI * 2;
    this.start3 = Math.PI / -2;
    this.finish3 = 30;
    this.curr3 = 0;
    this.width3 = undefined;
    this.height3 = undefined;

    this.canvas4 = undefined;
    this.ctx4 = undefined;
    this.x4 = undefined;
    this.y4 = undefined;
    this.radius4 = 22;
    this.circum4 = Math.PI * 2;
    this.start4 = Math.PI / -2;
    this.finish4 = 16;
    this.curr4 = 0;
    this.width4 = undefined;
    this.height4 = undefined;
  }

  // Speedometer Guage
  startSpeedometer() {
    this.resetSpeedoMeter();
    this.set_animation1();
    this.animate1(undefined);
    this.set_animation2();
    this.animate2(undefined);
    this.set_animation3();
    this.animate3(undefined);
    this.set_animation4();
    this.animate4(undefined);
  }


  roundRect(ctx, x, y, width, height, radius) {

    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    ctx.stroke();
  }

  canvas1: any;
  ctx1: any;
  x1: any;
  y1: any;
  radius1 = 88;
  circum1 = Math.PI * 2;
  start1 = Math.PI / -2;
  finish1 = 65;
  curr1 = 0;
  width1: any;
  height1: any;

  set_animation1() {
    this.canvas1 = <HTMLCanvasElement>document.getElementById("bar1");
    this.width1 = this.canvas1.width;
    this.height1 = this.canvas1.height;
    this.x1 = this.height1 / 2;
    this.y1 = this.width1 / 2;
    this.ctx1 = this.canvas1.getContext("2d");
    this.ctx1.lineWidth = 2;
    this.ctx1.strokeStyle = '#5CE0F4';
    this.ctx1.shadowOffsetX = 4;
    this.ctx1.shadowOffsetY = 4;
    this.ctx1.shadowBlur = 10;
    this.ctx1.shadowColor = '#5CE0F4';
  }
  //Animate guage

  animate1(draw_to) {
    this.ctx1.clearRect(0, 0, this.width1, this.height1);
    this.ctx1.shadowBlur = 100;
    this.ctx1.lineWidth = 1;
    // this.roundRect(this.ctx1, 81, 80, 65, 15, 5);
    this.ctx1.fillText("1,200 km/h", 100, 85);
    this.ctx1.fillStyle = 'white';
    this.ctx1.stroke();
    this.ctx1.shadowBlur = 10;
    this.ctx1.lineWidth = 2;
    this.ctx1.beginPath();
    this.ctx1.lineTo(75, 87);
    this.ctx1.stroke();

    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    this.ctx1.arc(this.x1, this.y1, this.radius1, this.start1, draw_to, false);
    this.ctx1.stroke();
    this.curr1++;
    if (this.curr1 < this.finish1 + 1) {
      // Recursive repeat this function until the end is reached
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.animate1(this.circum1 * this.curr1 / 100 + this.start1);
        }, 120);

      });
    }
  }

  canvas2: any;
  ctx2: any;
  x2: any;
  y2: any;
  radius2 = 66;
  circum2 = Math.PI * 2;
  start2 = Math.PI / -2;
  finish2 = 55;
  curr2 = 0;
  width2: any;
  height2: any;
  set_animation2() {
    this.canvas2 = <HTMLCanvasElement>document.getElementById("bar2");
    this.width2 = this.canvas2.width;
    this.height2 = this.canvas2.height;
    this.x2 = this.height2 / 2;
    this.y2 = this.width2 / 2;
    this.ctx2 = this.canvas2.getContext("2d");
    this.ctx2.lineWidth = 2;
    this.ctx2.strokeStyle = '#5CE0F4';
    this.ctx2.shadowOffsetX = 4;
    this.ctx2.shadowOffsetY = 4;
    this.ctx2.shadowBlur = 10;
    this.ctx2.lineWidth = 2;
    this.ctx2.shadowColor = '#5CE0F4';
  }

  animate2(draw_to) {
    this.ctx2.clearRect(0, 0, this.width2, this.height2);
    this.ctx2.shadowBlur = 100;
    this.ctx2.lineWidth = 1;
    // this.roundRect(this.ctx2, 81, 102, 65, 15, 5);
    this.ctx2.fillText("450 km/h", 100, 106);
    this.ctx2.fillStyle = 'white';
    this.ctx2.stroke();
    this.ctx2.shadowBlur = 10;
    this.ctx2.lineWidth = 2;
    this.ctx2.beginPath();
    this.ctx2.lineTo(75, 109);
    this.ctx2.stroke();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    // Re-draw from the very beginning each time so there isn't tiny line spaces between each section (the browser paint rendering will probably be smoother too)
    this.ctx2.arc(this.x2, this.y2, this.radius2, this.start2, draw_to, false);
    // Draw
    this.ctx2.stroke();
    // Increment percent
    this.curr2++;
    // Animate until end
    if (this.curr2 < this.finish2 + 1) {
      // Recursive repeat this function until the end is reached
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.animate2(this.circum2 * this.curr2 / 100 + this.start2);
        }, 240);

      });
    }
  }


  canvas3: any;
  ctx3: any;
  x3: any;
  y3: any;
  radius3 = 44;
  circum3 = Math.PI * 2;
  start3 = Math.PI / -2;
  finish3 = 40;
  curr3 = 0;
  width3: any;
  height3: any;
  set_animation3() {
    this.canvas3 = <HTMLCanvasElement>document.getElementById("bar3");
    this.width3 = this.canvas3.width;
    this.height3 = this.canvas3.height;
    this.x3 = this.height3 / 2;
    this.y3 = this.width3 / 2;
    this.ctx3 = this.canvas3.getContext("2d");
    this.ctx3.lineWidth = 2;
    this.ctx3.strokeStyle = '#5CE0F4';
    this.ctx3.shadowOffsetX = 4;
    this.ctx3.shadowOffsetY = 4;
    this.ctx3.shadowBlur = 20;
    this.ctx3.shadowColor = '#5CE0F4';
  }

  animate3(draw_to) {
    // Clear off the canvas
    this.ctx3.clearRect(0, 0, this.width3, this.height3);
    this.ctx3.shadowBlur = 100;
    this.ctx3.lineWidth = 1;
    // this.roundRect(this.ctx3, 81, 124, 65, 15, 5);
    this.ctx3.fillText("250 km/h", 100, 125);
    this.ctx3.fillStyle = 'white';
    this.ctx3.stroke();
    this.ctx3.shadowBlur = 10;
    this.ctx3.lineWidth = 2;
    this.ctx3.beginPath();
    this.ctx3.lineTo(75, 129);
    this.ctx3.stroke();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    // Re-draw from the very beginning each time so there isn't tiny line spaces between each section (the browser paint rendering will probably be smoother too)
    this.ctx3.arc(this.x3, this.y3, this.radius3, this.start3, draw_to, false);
    // Draw
    this.ctx3.stroke();
    // Increment percent
    this.curr3++;
    // Animate until end
    if (this.curr3 < this.finish3 + 1) {
      // Recursive repeat this function until the end is reached
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.animate3(this.circum3 * this.curr3 / 100 + this.start3);
        }, 360);
      });
    }
  }


  canvas4: any;
  ctx4: any;
  x4: any;
  y4: any;
  radius4 = 22;
  circum4 = Math.PI * 2;
  start4 = Math.PI / -2;
  finish4 = 22;
  curr4 = 0;
  width4: any;
  height4: any;
  set_animation4() {
    this.canvas4 = <HTMLCanvasElement>document.getElementById("bar4");
    this.width4 = this.canvas4.width;
    this.height4 = this.canvas4.height;
    this.x4 = this.height4 / 2;
    this.y4 = this.width4 / 2;
    this.ctx4 = this.canvas4.getContext("2d");
    this.ctx4.lineWidth = 2;
    this.ctx4.strokeStyle = '#5CE0F4';
    this.ctx4.shadowOffsetX = 4;
    this.ctx4.shadowOffsetY = 4;
    this.ctx4.shadowBlur = 10;
    this.ctx4.shadowColor = '#5CE0F4';
  }

  animate4(draw_to) {
    this.ctx4.clearRect(0, 0, this.width4, this.height4);
    this.ctx4.shadowBlur = 100;
    this.ctx4.lineWidth = 1;
    // this.roundRect(this.ctx4, 81, 145, 65, 15, 5);
    this.ctx4.fillText("90 km/h", 100, 148);
    this.ctx4.fillStyle = 'white';
    this.ctx4.stroke();
    this.ctx4.shadowBlur = 10;
    this.ctx4.lineWidth = 2;
    this.ctx4.beginPath();
    this.ctx4.lineTo(75, 150);
    this.ctx4.stroke();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    // Re-draw from the very beginning each time so there isn't tiny line spaces between each section (the browser paint rendering will probably be smoother too)
    this.ctx4.arc(this.x4, this.y4, this.radius4, this.start4, draw_to, false);
    // Draw
    this.ctx4.stroke();
    // Increment percent
    this.curr4++;
    // Animate until end
    if (this.curr4 < this.finish4 + 1) {
      // Recursive repeat this function until the end is reached
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.animate4(this.circum4 * this.curr4 / 150 + this.start4);
        }, 480)
      });
    }
  }

  constructor(private httservice: HttService,
    private ngZone: NgZone, private http: Http, private spinner: NgxSpinnerService, element: ElementRef, public snackBar: MatSnackBar, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {

      this.param1 = params['src'];
      if (this.param1) {
        this.hidepopup = true;
        this.errormsg = false;
        this.param1 = this.param1.split(':')
        //console.log(this.param1);
        this.param1[0] = this.param1[0].replace(/_/g, ' ');
        this.param1[1] = this.param1[1].replace(/_/g, ' ');
        console.log(this.param1);
        this.sourceLocation = this.param1[0];
        this.destinationLocation = this.param1[1];
        this.source.nativeElement.value = this.param1[0];
        this.destination.nativeElement.value = this.param1[1];
        google.maps.event.trigger(this.autocomplete, 'place_changed');
        google.maps.event.trigger(this.autocompletedest, 'place_changed');
        this.getRoutes();
      }

    });
  }

  openSnackBar(msg) {
    this.snackBar.open(msg, 'Dismiss', {
      duration: 3000,
    });
  }

  /* Speedometer Guage end*/

  goFullScreen() {
    let el = document.documentElement, rfs = el.requestFullscreen || el.webkitRequestFullScreen;
    rfs.call(el);
  }

  restoreScreen() {
  }


  getService() {
    var service = this.httservice.returnToFrom();
    console.log("source", service[0]);
    console.log("destination", service[1]);
    if (service[0] && service[1]) {
      this.sourceLocation = service[0];
      this.destinationLocation = service[1];
      this.source.nativeElement.value = service[0];
      this.destination.nativeElement.value = service[1];
      google.maps.event.trigger(this.autocomplete, 'place_changed');
      google.maps.event.trigger(this.autocompletedest, 'place_changed');
      this.getRoutes();
    }
    else if (service[0]) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          this.map.setCenter(pos);
          var marker1 = new google.maps.Marker({
            position: pos,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 70,
              fillColor: "#FAFAFA",
              fillOpacity: 0.4,
              strokeWeight: 0.4
            }

          });

          if (!this.param1) {
            let geocoder = new google.maps.Geocoder;

            geocoder.geocode({ 'location': pos }, (results) => {
              console.log("fhdjfj", results[0]);

              if (results[0]) {
                let value = results[0].formatted_address.split(",");
                // console.log(results[7].formatted_address);
                console.log("fhdjfj", value);

                let count = value.length;
                //let country=value[count-1];
                //let state=value[count-2];
                this.countryName = value[count - 1];
                console.log("country", this.countryName);

                let city = value[count - 3];
                this.sourceLocation = city.replace(" ", "");
                this.source.nativeElement.value = this.sourceLocation;
                google.maps.event.trigger(this.autocomplete, 'place_changed');
              }
            });
          }

        }, () => {

          $.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA1AxTRgZ9TrX-cWCE76YHKVDT6Pr8R5O0", (success) => {

            const pos = {
              lat: success.location.lat,
              lng: success.location.lng
            };

            this.map.setCenter(pos);
            let marker1 = new google.maps.Marker({
              position: pos,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 70,
                fillColor: "#FAFAFA",
                fillOpacity: 0.4,
                strokeWeight: 0.4
              }

            });

            if (!this.param1) {
              let geocoder = new google.maps.Geocoder;

              geocoder.geocode({ 'location': pos }, (results) => {

                if (results[0]) {
                  console.log("fhdjfj", results[0]);
                  let value = results[0].formatted_address.split(",");
                  console.log("fhdjfj", value);

                  let count = value.length;
                  //let country=value[count-1];
                  //let state=value[count-2];
                  let city = value[count - 3];
                  this.sourceLocation = city.replace(" ", "");
                  this.source.nativeElement.value = this.sourceLocation;
                  google.maps.event.trigger(this.autocomplete, 'place_changed');
                }
              });
            }

          })
            .fail(function (err) {
              console.log("API Geolocation error! \n\n", err);
              // let marker = new google.maps.Marker({ position: uluru, map: map });
              // marker.setVisible(false);
            });

        });
      } else {
        console.log("browser doesn't support geolocation");
        // Browser doesn't support Geolocation
        // this.handleLocationError(false, infoWindow, this.map.getCenter());
        // var marker = new google.maps.Marker({ position: uluru, map: map });
        // marker.setVisible(false);
      }
    }
    else if (service[1]) {
      this.destinationLocation = service[1];
      this.source.nativeElement.value = service[1];
      this.getRoutes();
    }
    else {
      this.source.nativeElement.value = '';
      this.destination.nativeElement.value = '';
    }

  }

  ngOnInit() {
    this.hidebar = false;
    this.playroute = true;
    this.remainingSeconds = 0;
    this.showValue = true;
    this.sidenavval = true;
    this.refresh = true;
    this.link = AppSettings.UI_API_ENDPOINT;
    this.errormsg = false;
    this.coEmissionTabClicked = false;
    this.passengerInfoClick = false;
    this.travelInfoClick = false;

    //set google maps defaults
    this.mapProp = {
      center: new google.maps.LatLng(-25.344, 131.036),
      zoom: 5,
      minZoom: 4,
      maxZoom: 8,
      panControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      rotateControl: true,
      disableDefaultUI: true,
      styles: MapCss.MAPCSS

    };

    this.map = new google.maps.Map(document.getElementById("googleMap"), this.mapProp);
    var map = this.map;

    var infoWindow = new google.maps.InfoWindow;
    var uluru = { lat: -25.344, lng: 131.036 };



    this.getSrcandDest();
    this.getService();

  }
//   $('#ui-tabs').tabs();

//   function GetSelectedTabIndex() {
//          return $('#ui-tabs').tabs('option', 'selected');
//      }
 
//  function ShowTabs(stepNum) {
//      var num = parseInt(stepNum);
//      $('#ui-tabs').tabs('option', 'active', parseInt(GetSelectedTabIndex()) + num);
//  }

// $('#prev, #next').click(function(){
// ShowTabs(this.value)  ;
// })

// alert(GetSelectedTabIndex())

  //end ngoninit()

  private getSrcandDest() {

    var input = this.source.nativeElement;
    var destination = this.destination.nativeElement;
    // console.log("getsrcanddest", input.value);
    var autocomplete = new google.maps.places.Autocomplete(input, { placeIdOnly: true, types: ['(cities)'] });
    var bounds = new google.maps.LatLngBounds();

    autocomplete.bindTo('bounds', this.map);

    this.autocomplete = autocomplete;

    var autocompletedest = new google.maps.places.Autocomplete(destination, { placeIdOnly: true, types: ['(cities)'] });

    autocompletedest.bindTo('bounds', this.map);

    this.autocompletedest = autocompletedest;

    var map = this.map;
    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');


    var geocoder = new google.maps.Geocoder;

    var srcloc, srcLatlang;

    var marker1 = new google.maps.Marker({
      map: map,
      position: { lat: 888999909000000, lng: 9999000099000 },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 48,
        fillColor: "#F0F0F0",
        fillOpacity: 0.2,
        strokeWeight: 0.2,
      }
    });

    var marker3 = new google.maps.Marker({
      map: map,
      position: { lat: 888999909000000, lng: 9999000099000 },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#44CBCE',
        fillOpacity: 10,
        strokeColor: '#44CBCE',
      }
    });
    var marker5 = new google.maps.Marker({
      map: map,
      position: { lat: 888999909000000, lng: 9999000099000 },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5,
        fillColor: '#FFFFFF',
        fillOpacity: 15,
        strokeColor: '#FFFFFF',
      }
    });

    autocomplete.addListener('place_changed', () => {

      let tempSrc = this.source.nativeElement.value;
      tempSrc = tempSrc.split(',');
      // console.log(tempSrc[2]);
      // this.countryName = tempSrc[2];
      tempSrc = tempSrc[0];

      this.source.nativeElement.value = tempSrc;

      if (this.flightPath) {
        this.flightPath.setMap(null);
        this.flightPathShadow.setMap(null);
        this.animationMarker.setVisible(false);
        clearInterval(this.autoDriveTimer);
      }

      var place;

      if (autocomplete.getPlace() && !this.srcSwapCalled) {
        place = autocomplete.getPlace();
        if (!place.place_id) {
          return;
        }

        geocoder.geocode({ 'placeId': place.place_id }, (results, status) => {
          // console.log("results", results);
          map.setZoom(map.maxZoom - 1);
          map.setCenter(results[0].geometry.location);

          marker1.setPlace({
            placeId: place.place_id,
            location: results[0].geometry.location,
          });
          marker3.setPlace({
            placeId: place.place_id,
            location: results[0].geometry.location,
          });
          marker5.setPlace({
            placeId: place.place_id,
            location: results[0].geometry.location,
          });

          marker1.setVisible(true);
          marker3.setVisible(true);
          marker5.setVisible(true);

          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-id'].textContent = place.place_id;
          infowindowContent.children['place-address'].textContent =
            results[0].formatted_address;
          srcloc = results[0].formatted_address;
          srcLatlang = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng())
          this.sourceLocation = srcloc;
          this.sourcelatlang = srcLatlang;
        });
      }
      else {
        this.srcSwapCalled = false;
        geocoder.geocode({ 'address': this.sourceLocation }, (results) => {

          place = {
            place_id: results[0].place_id,
            name: results[0].formatted_address
          }

          if (!place.place_id) {
            return;
          }

          geocoder.geocode({ 'placeId': place.place_id }, (results, status) => {
            map.setZoom(map.maxZoom - 1);
            map.setCenter(results[0].geometry.location);

            marker1.setPlace({
              placeId: place.place_id,
              location: results[0].geometry.location,
            });
            marker3.setPlace({
              placeId: place.place_id,
              location: results[0].geometry.location,
            });
            marker5.setPlace({
              placeId: place.place_id,
              location: results[0].geometry.location,
            });

            marker1.setVisible(true);
            marker3.setVisible(true);
            marker5.setVisible(true);

            infowindowContent.children['place-name'].textContent = place.name;
            infowindowContent.children['place-id'].textContent = place.place_id;
            infowindowContent.children['place-address'].textContent =
              results[0].formatted_address;
            srcloc = results[0].formatted_address;

            srcLatlang = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng())
            this.sourceLocation = srcloc;
            this.sourcelatlang = srcLatlang;
            // console.log("this.sourcelatlang", this.sourcelatlang);
          });
        });
      }

    });

    var destloc, destLatlang;
    var marker2 = new google.maps.Marker({
      position: { lat: 888999909000000, lng: 9999000099000 },
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 48,
        fillColor: "#F0F0F0",
        fillOpacity: 0.2,
        strokeWeight: 0.2,

      }

    });

    var marker4 = new google.maps.Marker({
      position: { lat: 888999909000000, lng: 9999000099000 },
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,

        fillOpacity: 0.0,
        strokeColor: '#44CBCE',
        strokeWeight: 4
      }
    });

    // var marker6 = new google.maps.Marker({
    //   map: map,
    //   position: { lat: 888999909000000, lng: 9999000099000 },
    //   icon: {
    //     path: google.maps.SymbolPath.CIRCLE,
    //     scale: 0,

    //     fillOpacity: 0.0,


    //   }
    // });

    autocompletedest.addListener('place_changed', () => {

      let tempSrc = this.destination.nativeElement.value;
      tempSrc = tempSrc.split(',');

      tempSrc = tempSrc[0];
      this.destination.nativeElement.value = tempSrc;

      if (this.flightPath) {
        this.flightPath.setMap(null);
        this.flightPathShadow.setMap(null);
        this.animationMarker.setVisible(false);
        clearInterval(this.autoDriveTimer);
      }

      //var destplace = autocompletedest.getPlace();

      var destplace;

      if (autocompletedest.getPlace() && !this.destSwapCalled) {
        destplace = autocompletedest.getPlace();

        if (!destplace.place_id) {
          return;
        }
        geocoder.geocode({ 'placeId': destplace.place_id }, (results, status) => {
          // console.log("sddddd", results);
          map.setZoom(map.minZoom + 1);
          map.setCenter(results[0].geometry.location);

          // Set the position of the marker using the place ID and location.
          marker2.setPlace({
            placeId: destplace.place_id,
            location: results[0].geometry.location
          });

          marker4.setPlace({
            placeId: destplace.place_id,
            location: results[0].geometry.location
          });

          // marker6.setPlace({
          //   placeId: destplace.place_id,
          //   location: results[0].geometry.location
          // });

          marker2.setVisible(true);
          marker4.setVisible(true);
          // marker6.setVisible(true);

          infowindowContent.children['place-name'].textContent = destplace.name;
          infowindowContent.children['place-id'].textContent = destplace.place_id;
          infowindowContent.children['place-address'].textContent =
            results[0].formatted_address;
          destloc = destplace.name;
          destLatlang = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
          this.destinationLocation = destloc;
          this.destinationLatlang = destLatlang;
        });
      }
      else {
        this.destSwapCalled = false;
        geocoder.geocode({ 'address': this.destinationLocation }, (results) => {
          //console.log('Destination : ', results[0])
          destplace = {
            place_id: results[0].place_id,
            name: results[0].formatted_address
          }

          if (!destplace.place_id) {
            return;
          }
          geocoder.geocode({ 'placeId': destplace.place_id }, (results, status) => {
            map.setZoom(map.minZoom + 1);
            map.setCenter(results[0].geometry.location);

            // Set the position of the marker using the place ID and location.
            marker2.setPlace({
              placeId: destplace.place_id,
              location: results[0].geometry.location
            });

            marker4.setPlace({
              placeId: destplace.place_id,
              location: results[0].geometry.location
            });

            // marker6.setPlace({
            //   placeId: destplace.place_id,
            //   location: results[0].geometry.location
            // });

            marker2.setVisible(true);
            marker4.setVisible(true);
            // marker6.setVisible(true);

            infowindowContent.children['place-name'].textContent = destplace.name;
            infowindowContent.children['place-id'].textContent = destplace.place_id;
            infowindowContent.children['place-address'].textContent =
              results[0].formatted_address;
            destloc = destplace.name;
            destLatlang = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            this.destinationLocation = destloc;
            this.destinationLatlang = destLatlang;
          });
          // map.fitBounds(bounds);
        });
      }
    });
  }

  private calculateDistance() {
    const src = this.sourcelatlang;
    const des = this.destinationLatlang;
    const distance = Number((google.maps.geometry.spherical.computeDistanceBetween(src, des) / 1000).toFixed(0));
    this.hdistance = distance;
    this.hdistanceInMiles = Math.round(this.hdistance * 0.62137);
    return distance;
  }


  private calculateTime() {
    this.distance = this.calculateDistance();
    if (this.distance < 100) {
      this.hyperloopTime = Number(((this.distance / this.hyperloopMinSpeed) * 60).toFixed(0));
      this.hyperloopSpeed = this.hyperloopMinSpeed;
      this.hyperloopMiledSpeed = Math.round(this.hyperloopSpeed * 0.62137);

    }
    else if (this.distance >= 100 && this.distance <= 250) {
      this.hyperloopTime = Number(((this.distance / this.hyperloopAvgTime) * 60).toFixed(0));
      this.hyperloopSpeed = this.hyperloopAvgTime;
      this.hyperloopMiledSpeed = Math.round(this.hyperloopAvgTime * 0.62137);

    }
    else {
      this.hyperloopTime = Number(((this.distance / this.hyperloopMaxSpeed) * 60).toFixed(0));
      this.hyperloopSpeed = this.hyperloopMaxSpeed;
      this.hyperloopMiledSpeed = Math.round(this.hyperloopMaxSpeed * 0.62137);

    }
    this.miledistance = Math.round(this.distance * 0.62137);
    if (this.distance > 200) {
      this.airplanTime = Math.ceil(this.distance / this.airplanAvgSpeed);
      this.airplanSpeed = this.airplanAvgSpeed;
      this.airplaneMileSpeed = Math.round(this.airplanSpeed * 0.62137);

    }
    else {
      this.airplanSpeed = "--";
      this.airplaneMileSpeed = "--";
      this.airplanTime = "--";
    }


    //Counter for hyperloop distance in Km
    let temp1 = this.distance;
    this.distance = 0;
    let hyperloopDistanceInKm = setInterval(() => {
      this.distance++;
      if (this.distance === temp1) {
        this.distance = temp1;
        clearInterval(hyperloopDistanceInKm);
      }
    });


    //Counter for hyperloop distance in miles
    let temp2 = this.miledistance;
    this.miledistance = 0;
    let hyperloopDistanceInMiles = setInterval(() => {
      this.miledistance++;
      if (this.miledistance === temp2) {
        this.miledistance = temp2;
        clearInterval(hyperloopDistanceInMiles);
      }
    });
  }

  showDirectionLogo: boolean;
  showInputPanel() {
    $('#leftpanel').removeClass("hide-panel");
    this.showDirectionLogo = false;
  }

  hideInputPanel() {
    $('#leftpanel').addClass("hide-panel");
    this.showDirectionLogo = true;
  }

  //python api call hyderloop route
  getRoutes() {

    if ($(window).width() < 800) {
      this.hideInputPanel();
    }

    // this.hyperLoopPanelState = 'out';
    // this.airplanePanelState = 'out';
    // this.trainPanelState = 'out';
    // this.carPanelState = 'out';
    // this.sharePanelState = 'out';
    this.sidenavval1 = false;
    this.hidebar = false;

    this.spinner.show();
    console.log("source", this.sourceLocation);
    console.log("dest", this.destinationLocation)
    this.http.post(AppSettings.PYTHON_API_ENDPOINT + '/get_route',
      {
        source: this.sourceLocation,
        destination: this.destinationLocation
      })
      .subscribe(
        data => {

          if ($(window).width() < 800) {
            $('#bottomSlider').css("display", "inline-block");
          }
          // if ($(window).width() > 800) {
          //   this.showSpeedoMeter = true;

          // }

          setTimeout(() => {
            this.spinner.hide();
          }, 500);

          var distancelimit = this.calculateDistance();
          // console.log("distance", distancelimit);
          var miledistance = Math.round(distancelimit * 0.62137);

          if (distancelimit <= 2500) {
            // console.log(data)
            this.playroute = false;
            this.exceedlimit = true;
            this.showValue = false;
            this.refresh = false;
            this.errormsg = false;
            // if(data.length){
            // create on varibale outside and take data into that variable  so that we can apply methods
            // }
            var MapPoints = data.json()
            var flightPlanCoordinates = [];
            var bounds = new google.maps.LatLngBounds();

            // console.log(MapPoints);
            MapPoints.forEach(i => {
              i.forEach(j => {
                this.marker = new google.maps.Marker({
                  position: new google.maps.LatLng(j.lat, j.lng),
                });
                flightPlanCoordinates.push(this.marker.getPosition());
                bounds.extend(this.marker.position);

                google.maps.event.addListener(this.marker, 'click', (function (marker, i) {
                  return function () {
                    this.infowindow.setContent(j.lat + " " + j.lng);
                  }
                })(this.marker, j));
              });
            });

            if ($(window).width() > 800) {
              this.map.fitBounds(bounds, { top: 30, right: 150, left: 350, bottom: 50 });
            }
            else {
              this.map.fitBounds(bounds);
            }
            // console.log("this.countryName", (this.countryName));
            if (countryUnitSystem.COUNTRY.includes(this.countryName)) {
              // console.log("country is present");
              var unit = google.maps.UnitSystem.IMPERIAL;
            }
            else {
              var unit = google.maps.UnitSystem.METRIC;
            }

            //calculating distance and duration using distance matrix service for car
            var service = new google.maps.DistanceMatrixService;
            var ddistance;
            var dduration;
            service.getDistanceMatrix({
              origins: [this.sourceLocation],
              destinations: [this.destinationLocation],
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: unit,

            }, (response, status) => {
              // console.log("car response", response);
              var origins = response.originAddresses;
              var destinations = response.destinationAddresses;

              for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;

                for (var j = 0; j < results.length; j++) {
                  var element = results[j];
                  if (element.distance) {
                    ddistance = element.distance.text;
                    dduration = element.duration.text;

                  }
                  else {
                    ddistance = "--";
                    dduration = "--"
                  }
                  var from = origins[i];
                  var to = destinations[j];
                }

              }

              let temp1 = ddistance.split(' ');
              this.emperialcarUnit = temp1[1];
              this.drivingDistance = temp1[0].replace(',', '');
              this.dtime = String(dduration).split(" ");

              this.drivingTime = String(dduration).split(" ");
              this.drivingmile = Math.round((Number(this.drivingDistance)) / 0.62137);

              if (Number.isNaN(this.drivingmile)) {
                this.drivingmile = "--";
              }

            });
            //get distance and duration for transit traveling mode
            var tdistance;
            var tduration;
            service.getDistanceMatrix({
              origins: [this.sourceLocation],
              destinations: [this.destinationLocation],
              travelMode: google.maps.TravelMode.TRANSIT,
              unitSystem: unit

            }, (response, status) => {
              var origins = response.originAddresses;
              var destinations = response.destinationAddresses;
              // console.log("train response", response);
              for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                  var element = results[j];
                  if (element.distance) {
                    tdistance = element.distance.text;
                    tduration = element.duration.text;
                  }
                  else {
                    tdistance = "--";
                    tduration = "--";
                  }
                  var from = origins[i];
                  var to = destinations[j];
                }
              }

              let temp1 = tdistance.split(' ');
              this.emperialtrainUnit = temp1[1];
              this.transitDistance = temp1[0].replace(',', '');
              this.publicttime = String(tduration).split(" ");
              this.PTTime = String(tduration).split(" ");
              this.transitmile = Math.round((Number(this.transitDistance)) / 0.62137);

              if (Number.isNaN(this.transitmile)) {
                this.transitmile = "--";
              }

            });

            if (this.flightPath) {
              this.flightPath.setMap(null);
              this.flightPathShadow.setMap(null);
            }

            this.flightPathShadow = new google.maps.Polyline({
              map: this.map,
              path: flightPlanCoordinates,
              strokeColor: '#44DCEA',
              strokeOpacity: 0.1,
              strokeWeight: 10
            });

            this.flightPath = new google.maps.Polyline({
              map: this.map,
              path: flightPlanCoordinates,
              strokeColor: "#44DCEA",
              strokeOpacity: 1.0,
              strokeWeight: 4,

            });
            var image = '../../assets/images/capsulePointer.png';
            this.animationMarker = new google.maps.Marker({
              position: {
                lat: 0.0, lng: 0.0
              },

              map: this.map,
              icon: "../assets/images/group.svg"
              // {
              //   path: google.maps.SymbolPath.CIRCLE,
             
              //   scale: 8,
              //   fillColor: '#44CBCE',
              //   fillOpacity: 5,
              //   strokeColor: '#44CBCE',
              // }

            });

            this.animationMarker.info = new google.maps.InfoWindow({
              content: '<h6>HyperloopTT</h6>'
              // + '<b>Source</b>:' + this.sourceLocation + '<br><b>destination</b>' +
              //   this.destinationLocation
            });


            this.startRouteAnimation(this.animationMarker, flightPlanCoordinates)
            //this.calculateDistance();
            this.calculateTime();


            // setTimeout(() => {
            //   this.hyperLoopPanelState = 'in';
            //   this.hidebar = false;
            //   this.calculateTime();
            // }, 2000);

            // setTimeout(() => {
            //   this.airplanePanelState = 'in';
            //   this.hidebar = false;
            // }, 4000);


            // this.trainPanelState = 'in';
            // this.hidebar = false;
            let transitCountInt = setInterval(() => {
              if (this.transitDistance) {
                clearInterval(transitCountInt);
                //Counter for train distance in Km
                if (String(this.transitDistance) !== '--') {
                  let tempTransitDistanceInKm = this.transitDistance;
                  var temp = String(this.transitDistance).split('.')
                  this.transitDistance = 0;
                  let trainDistanceInKm = setInterval(() => {
                    this.transitDistance++;
                    if (this.transitDistance === Number(temp[0])) {
                      this.transitDistance = tempTransitDistanceInKm;
                      clearInterval(trainDistanceInKm);
                    }
                  });
                }

                if (!Number.isNaN(this.transitmile) && String(this.transitmile) !== '--') {
                  //Counter for train distance in miles
                  let tempTransitDistanceInMiles = this.transitmile;
                  this.transitmile = 0;
                  let trainTransitDistanceInMiles = setInterval(() => {
                    this.transitmile++;
                    if (this.transitmile === tempTransitDistanceInMiles) {
                      this.transitmile = tempTransitDistanceInMiles;
                      clearInterval(trainTransitDistanceInMiles);
                    }
                  });
                }
              }

            });


            let driveCountInt = setInterval(() => {
              if (this.drivingDistance) {
                clearInterval(driveCountInt);
                //Counter for Car distance in km
                if (String(this.drivingDistance) !== '--') {
                  let tempDrivingDistance = this.drivingDistance;
                  // console.log((this.drivingDistance));
                  var temp = String(this.drivingDistance).split('.')
                  this.drivingDistance = 0;
                  let drivingDistanceInKm = setInterval(() => {
                    this.drivingDistance++;
                    if (this.drivingDistance === Number(temp[0])) {
                      this.drivingDistance = tempDrivingDistance;
                      clearInterval(drivingDistanceInKm);
                    }
                  });
                }

                if (!Number.isNaN(this.drivingmile) && String(this.drivingmile) !== '--') {

                  //Counter for car distance in miles
                  let tempDrivingDistanceInMiles = this.drivingmile;
                  this.drivingmile = 0;
                  let drivingDistanceInMiles = setInterval(() => {
                    this.drivingmile++;
                    if (this.drivingmile === tempDrivingDistanceInMiles) {
                      this.drivingmile = tempDrivingDistanceInMiles;
                      clearInterval(drivingDistanceInMiles);
                    }
                  });
                }
              }
            });


            this.sidenavval1 = true;

          }
          else {
            // console.log("no route is present distance more than 2500km");
            this.errormsg = true;
            this.message = "With current technology, Hyperloop is more efficient traveling within 2500KM (1500 miles). Please search for a shorter route. In the meantime, HyperloopTT will keep exploring for long distance travel."
          }

        },

        error => {
          console.log("server error", error);
          if ($(window).width() < 800) {
            this.hideInputPanel();
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
        }
      );
    this.errormsg = false;
  }

  autoDriveTimer: any;
  mkr: any;

  startRouteAnimation = function (marker, autoDriveS) {
    // this.mkr = marker
    // this.mkr.infowindow = new google.maps.InfoWindow();
    // this.mkr.infowindow.setContent("HTT");
    // this.mkr.infowindow.open(this.map, this.mkr);


    this.autoDriveTimer = setInterval(function () {
      // stop the timer if the route is finished
      if (autoDriveS.length === 0) {
        clearInterval(this.autoDriveTimer);
        marker.setVisible(false);
      } else {
        // move marker to the next position (always the first in the array)
        marker.setPosition(autoDriveS[0]);
        // remove the processed position
        autoDriveS.shift();

      }
    },
      10);
    // this.mkr.infowindow.close();

  }


  sidenavval1: any = false;
  sidenav() {

    if (!this.sidenavval) {
      this.sidenavval = !this.sidenavval;
    }
    else {
      setTimeout(() => {
        this.sidenavval = !this.sidenavval;
      }, 400);
    }

    this.sidenavval1 = false;
    setTimeout(() => {
      this.sidenavval1 = true;
    }, 400);

    this.menuState = this.menuState === 'in' ? 'out' : 'in';
    this.carbonInfoClick = false;
    this.errormsg = false;
  }

  mobilesidenavval: boolean = true;
  mobileMenuState: string = 'in';
  mobileSidenav() {
    this.mobilesidenavval = !this.mobilesidenavval;
    this.mobileMenuState = this.mobileMenuState === 'in' ? 'out' : 'in';
  }

  reload() {
    window.location.reload();
  }

  copytxt() {
    if (this.sourceLocation && this.destinationLocation) {
      let source = this.sourceLocation.replace(/ /g, "_");
      let destination = this.destinationLocation.replace(/ /g, "_");
      var url = AppSettings.UI_API_ENDPOINT + "/?src=" + source + ":" + destination;
      new Clipboard('.copytxt', {
        text: function () {
          return url;
        }
      });
      this.openSnackBar("Link Copied!");
    }
    else {
      this.openSnackBar("Please!! select source and destination");
    }
  }

  twittershare() {
    if (this.sourceLocation && this.destinationLocation) {
      let source = this.sourceLocation.replace(/ /g, "_");
      let destination = this.destinationLocation.replace(/ /g, "_");
      var url = AppSettings.UI_API_ENDPOINT + "/?src=" + source + ":" + destination;
      window.open("https://twitter.com/share?" + url, "", "width=350,height=350");

    }
    else {
      this.openSnackBar("Please!! select source and destination");
    }
  }

  facebookshare() {
    if (this.sourceLocation && this.destinationLocation) {
      let source = this.sourceLocation.replace(/ /g, "_");
      let destination = this.destinationLocation.replace(/ /g, "_");
      var url = AppSettings.UI_API_ENDPOINT + "/?src=" + source + ":" + destination;
      window.open("https://www.facebook.com/sharer/sharer.php?u=" + url, "", "width=350,height=350");
    }
    else {
      this.openSnackBar("Please!! select source and destination");

    }
  }

  linkedInshare() {
    if (this.sourceLocation && this.destinationLocation) {
      let source = this.sourceLocation.replace(/ /g, "_");
      let destination = this.destinationLocation.replace(/ /g, "_");
      var url = AppSettings.UI_API_ENDPOINT + "/?src=" + source + ":" + destination;
      window.open("https://www.linkedin.com/shareArticle?&url=" + url, "", "width=350,height=350");
    }
    else {
      this.openSnackBar("Please!! select source and destination");

    }
  }

  emailshare() {
    if (this.sourceLocation && this.destinationLocation) {

      let source = this.sourceLocation.replace(/ /g, "_");
      let destination = this.destinationLocation.replace(/ /g, "_");
      var url = AppSettings.UI_API_ENDPOINT + "/?src=" + source + ":" + destination;
      var title = "Hyperloop Route";
      window.open("https://mail.google.com/mail/?view=cm&to=&su=" + title + "&body=" + url, "", "width=350,height=350");
    }
    else {
      this.openSnackBar("Please!! select source and destination");

    }
  }
  // http://40.112.165.32:2200/#/httmap
  // https://twitter.com/share?http://40.112.165.32:2200/?src=New_York,_NY,_USA:Chicago,_IL,_USA
  // https://twitter.com/share?http://40.112.165.32:2200/?src=S%C3%A3o_Paulo,_State_of_S%C3%A3o_Paulo,_Brazil:Rio_de_Janeiro,_State_of_Rio_de_Janeiro,_Brazil

  // https://twitter.com/share?http://40.112.165.32:2200/?src=London,_UK:Amsterdam,_Netherlands
  drawRouteLinkOne() {
    window.open(AppSettings.UI_API_ENDPOINT + "/#/httmap?src=Los_Angeles,_CA,_USA:San_Francisco,_CA,_USA", "_self")
  }
  drawRouteLinkTwo() {
    window.open(AppSettings.UI_API_ENDPOINT + "/#/httmap?src=New_York,_NY,_USA:Chicago,_IL,_USA", "_self")
  }
  drawRouteLinkThree() {
    window.open(AppSettings.UI_API_ENDPOINT + "/#/httmap?src=S%C3%A3o_Paulo,_State_of_S%C3%A3o_Paulo,_Brazil:Rio_de_Janeiro,_State_of_Rio_de_Janeiro,_Brazil", "_self")
  }
  drawRouteLinkFour() {
    window.open(AppSettings.UI_API_ENDPOINT + "/#/httmap?src=London,_UK:Amsterdam,_Netherlands", "_self")

  }

  exampleTabClicked = true;
  timesTabclicked = false;
  passengerTabClicked = false;
  speedTabClicked = false;
  carbonInfoClick = false;
  // travelInfoClick =  false;

  carbonInfo() {
    // console.log("carbonInfoclicked");
    this.carbonInfoClick = true;
  }

  passengerInfo() {
    this.passengerInfoClick = true;
  }
  travelInfo() {
    this.travelInfoClick = true;
  }

  exampleTab() {
    this.exampleTabClicked = true;
    this.timesTabclicked = false;
    this.passengerTabClicked = false;
    this.speedTabClicked = false;
    this.coEmissionTabClicked = false;
    // this.startSpeedometer();
    this.carbonInfoClick = false;
    this.passengerInfoClick = false;
    this.travelInfoClick = false;

  }

  travelTab(){
    this.exampleTabClicked = false;
    this.timesTabclicked = true;
    this.passengerTabClicked = false;
    this.speedTabClicked = false;
    this.coEmissionTabClicked = false;
    // this.startSpeedometer();
    this.carbonInfoClick = false;
    this.passengerInfoClick = false;
    this.travelInfoClick = false;
  }
  timesTab() {
    this.exampleTabClicked = false;
    this.timesTabclicked = true;
    this.passengerTabClicked = false;
    this.speedTabClicked = false;
    this.coEmissionTabClicked = false;
    this.carbonInfoClick = false;
    this.passengerInfoClick = false;
    // this.travelInfoClick = true;

    // this.startSpeedometer();
  }
  speedTab() {
    this.exampleTabClicked = false;
    this.timesTabclicked = false;
    this.passengerTabClicked = false;
    this.speedTabClicked = true;
    this.coEmissionTabClicked = false;
    this.carbonInfoClick = false;
    this.passengerInfoClick = false;
    this.travelInfoClick = false;

    setTimeout(() => {
      this.startSpeedometer();
    }, 20);

  }
  passengerTab() {
    this.exampleTabClicked = false;
    this.timesTabclicked = false;
    this.passengerTabClicked = true;
    this.speedTabClicked = false;
    this.coEmissionTabClicked = false;
    this.carbonInfoClick = false;
    this.travelInfoClick = false;

    // this.passengerInfoClick = true;

    // this.startSpeedometer();

  }
  coEmissionTab() {

    this.exampleTabClicked = false;
    this.timesTabclicked = false;
    this.passengerTabClicked = false;
    this.speedTabClicked = false;
    this.coEmissionTabClicked = true;
    this.passengerInfoClick = false;
    this.travelInfoClick = false;

    // this.startSpeedometer();
  }

  srcSwapCalled: boolean = false;
  destSwapCalled: boolean = false;
  swapSourceDest() {
    if (this.sourceLocation && this.destinationLocation && !this.playroute) {
      this.srcSwapCalled = true;
      this.destSwapCalled = true;
      let temp1 = this.sourceLocation;
      this.sourceLocation = this.destinationLocation;
      this.destinationLocation = temp1;
      this.source.nativeElement.value = this.sourceLocation;
      this.destination.nativeElement.value = this.destinationLocation;
      google.maps.event.trigger(this.autocomplete, 'place_changed');
      google.maps.event.trigger(this.autocompletedest, 'place_changed');
      this.getRoutes();
    }
  }

  hidepopup = true;
  hidePopup() {
    this.hidepopup = true;
  }

  hideerrorpopup() {
    this.errormsg = false;
  }

  // slideIndex: number = 1;
  // plusSlide() {
  //   if (this.slideIndex !== 4)
  //     this.slideIndex = this.slideIndex + 1;
  //   else
  //     this.slideIndex = 1;
  // }

  // minusSlide() {
  //   if (this.slideIndex !== 1)
  //     this.slideIndex = this.slideIndex - 1;
  //   else
  //     this.slideIndex = 4;
  // }

  // ngAfterViewInit() {
  //   let xDown = null;
  //   let yDown = null;
  //   document.getElementById('swipeSlider').addEventListener('touchstart', (evt) => {
  //     xDown = evt.touches[0].clientX;
  //     yDown = evt.touches[0].clientY;
  //   });
  //   document.getElementById('swipeSlider').addEventListener('touchmove', (evt) => {
  //     // the user touched the screen!
  //     if (!xDown || !yDown) {
  //       return;
  //     }
  //     let xUp = evt.touches[0].clientX;
  //     let yUp = evt.touches[0].clientY;
  //     let xDiff = xDown - xUp;
  //     let yDiff = yDown - yUp;

  //     if (Math.abs(xDiff) > Math.abs(yDiff)) {
  //       if (xDiff > 0) {
  //         this.plusSlide();
  //       } else {
  //         this.minusSlide();
  //       }
  //     } /* else {
  //         if ( yDiff > 0 ) {
  //           console.log('up')
  //         } else { 
  //           console.log('down')
  //         }                                                                 
  //     } */
  //     xDown = null;
  //     yDown = null;
  //   });
  // }

}
