
//   <div class="mobile-header">
//   <span style="opacity: 1">HyperloopTT Route Simulator</span>
// </div>

// <div id="input-panel" *ngIf="showDirectionLogo">
//   <img src="../../assets/images/directions.png" height="25" width="25" alt="" (click)="showInputPanel()" />
// </div>
// <div *ngIf="converterForMobile">
//   <div class="floating-panel-for-mobile">
//     <div class="pull-right">
//       <span style="margin-right: 3px;margin-top: 3px; cursor: pointer" (click)="converterForMobile=false">
//         <img src="./../assets/images/close_white.png" height="20" width="20">
//       </span>
//     </div>
//     <div class="converter-box-text1">
//       <div>
//         Miles (mi) &nbsp;
//         <label class="switch">
//           <input type="checkbox" [(ngModel)]="distInKms">
//           <span class="slider round"></span>
//         </label> &nbsp; Kilometers (km)
//       </div>
//     </div>
//     <div class="converter-box-text1">
//       Emissions
//     </div>
//     <div class="converter-box-text2 helptxt">
//       CO2 emissions are measured in units of emissions per passenger mile (g/pass-mi)
//     </div>
//   </div>
// </div>
// <div id="bottomSlider" class="bottomPanel carousel slide" data-ride="carousel" [@mobileSlideInOut]="mobileMenuState">
//   <div class="bottom-bar" (click)="mobileSidenav(); converterForMobile=false">
//     <a href="javascript:void(0)" style="right: 5px">
//       <img *ngIf="mobilesidenavval" src="../../assets/images/arrow_drop_down.svg" alt="" />
//       <img *ngIf="!mobilesidenavval" src="../../assets/images/arrow_drop_up.svg" alt="" />
//     </a>
//   </div>
//   <div class="transport-container" id="swipeSlider">
//     <div class="converter-box">
//       <a href="javascript:void(0)" (click)="converterForMobile = !converterForMobile">
//         <!-- <img src="../../assets/images/menu.svg" height="15" width="15" alt="" /> -->
//         <img src="../../assets/images/menu.svg" alt="" />
//       </a>
//     </div>
//     <div class="mySlides" [hidden]="slideIndex!==1">
//       <!--  HyperLoopTT -->
//       <div class="transport">
//         <div class="head">
//           <span class="pull-left title">HyperloopTT</span>
//           <img class="pull-left" src="../../assets/images/capsule.svg" alt="" />
//         </div>
//         <div class="clear"></div>
//         <div class="col3">
//           <div>
//             <span class="blue pull-left" *ngIf="hyperloopTime">{{hyperloopTime}}</span>
//             <span class="blue pull-left" *ngIf="!hyperloopTime">0</span>
//             <span class="helptxt pull-left">min</span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Time</span>
//           </div>
//         </div>
//         <div class="col3">
//           <div *ngIf="distInKms">
//             <span class="blue pull-left" *ngIf="hyperloopSpeed">{{hyperloopSpeed}}</span>
//             <span class="blue pull-left" *ngIf="!hyperloopSpeed">0</span>

//             <span class="helptxt pull-left">km/h</span>
//           </div>
//           <div *ngIf="!distInKms">
//             <span class="blue pull-left" *ngIf="hyperloopMiledSpeed">{{hyperloopMiledSpeed}}</span>
//             <span class="blue pull-left" *ngIf="!hyperloopMiledSpeed">0</span>

//             <span class="helptxt pull-left">miles/hr</span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Max speed</span>
//           </div>
//         </div>
//         <div class="col3 last">
//           <div *ngIf="distInKms">
//             <span class="blue pull-left" *ngIf="!distance">0</span>
//             <span class="blue pull-left" *ngIf="distance">{{distance}}</span>
//             <span class="helptxt pull-left">km</span>
//           </div>
//           <div *ngIf="!distInKms">
//             <span class="blue pull-left" *ngIf="!miledistance">0</span>
//             <span class="blue pull-left" *ngIf="miledistance">{{miledistance}}</span>
//             <span class="helptxt pull-left">mi</span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Distance</span>
//           </div>
//         </div>
//         <div class="clear bottom-margin-20"></div>
//         <div class="col3">
//           <div>
//             <span class="blue pull-left">30</span>
//             <span class="helptxt pull-left"></span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Passengers/capsule</span>
//           </div>
//         </div>
//         <div class="col3">
//           <div>
//             <span class="blue pull-left">2500</span>
//             <span class="helptxt pull-left"></span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Passenger capacity</span>
//           </div>
//         </div>
//         <div class="col3 last">
//           <div>
//             <span class="blue pull-left">0</span>
//             <span class="helptxt pull-left"></span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Carbon emissions</span>
//           </div>
//         </div>
//       </div>

//     </div>

//     <div class="mySlides" [hidden]="slideIndex!==2">
//       <!-- Airplane -->
//       <div class="transport">
//         <div class="head">
//           <span class="pull-left title">Airplane</span>
//           <img class="pull-left" src="../../assets/images/airplane.svg" alt="" />
//         </div>
//         <div class="clear"></div>
//         <div class="col3">
//           <div>
//             <span class="blue pull-left" *ngIf="!airplanTime">0</span>
//             <span class="blue pull-left" *ngIf="airplanTime">{{airplanTime}}</span>
//             <span class="helptxt pull-left">hr</span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Time</span>
//           </div>
//         </div>
//         <div class="col3">
//           <div *ngIf="distInKms">
//             <span class="blue pull-left" *ngIf="airplanSpeed">{{airplanSpeed}}</span>
//             <span class="blue pull-left" *ngIf="!airplanSpeed">0</span>

//             <span class="helptxt pull-left">km/h</span>
//           </div>
//           <div *ngIf="!distInKms">
//             <span class="blue pull-left" *ngIf="airplaneMileSpeed">{{airplaneMileSpeed}}</span>
//             <span class="blue pull-left" *ngIf="!airplaneMileSpeed">0</span>

//             <span class="helptxt pull-left">miles/hr</span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Max speed</span>
//           </div>
//         </div>
//         <div class="col3 last">
//           <div *ngIf="distInKms">
//             <span class="blue pull-left" *ngIf="!distance">0</span>
//             <span class="blue pull-left" *ngIf="distance>200">{{distance}}</span>
//             <span class="blue pull-left" *ngIf="distance<=200">--</span>
//             <span class="helptxt pull-left">km</span>
//           </div>
//           <div *ngIf="!distInKms">
//             <span class="blue pull-left" *ngIf="!miledistance">0</span>
//             <span class="blue pull-left" *ngIf="miledistance>200">{{miledistance}}</span>
//             <span class="blue pull-left" *ngIf="miledistance<=200">--</span>
//             <span class="helptxt pull-left">mi</span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Distance</span>
//           </div>
//         </div>
//         <div class="clear bottom-margin-20"></div>
//         <div class="col3">
//           <div>
//             <span class="blue pull-left">250</span>
//             <span class="helptxt pull-left"></span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Passengers/plane</span>
//           </div>
//         </div>
//         <div class="col3">
//           <div>
//             <span class="blue pull-left">500</span>
//             <span class="helptxt pull-left"></span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Passenger capacity</span>
//           </div>
//         </div>
//         <div class="col3 last">
//           <div>
//             <span class="blue pull-left">0</span>
//             <span class="helptxt pull-left"></span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Carbon emissions</span>
//           </div>
//         </div>

//       </div>
//     </div>

//     <div class="routeSlides" [hidden]="slideIndex!==3">
//       <!-- Train -->
//       <div class="transport">
//         <div class="head">
//           <span class="pull-left title">Train</span>
//           <img class="pull-left" src="../../assets/images/train.svg" alt="" />
//         </div>
//         <div class="clear"></div>
//         <div class="col3">
//           <div *ngIf="!PTTime">
//             <span class="blue pull-left">0</span>
//             <span class="helptxt pull-left"> min</span>
//           </div>
//           <div *ngIf="PTTime">
//             <span class="blue pull-left" *ngFor="let pt of PTTime; let i = index" [class.helptxt]="(i%2)!==0">{{
//               pt==='hours' ? 'hrs' : pt === 'hour' ? 'hr' :pt }}</span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Time</span>
//           </div>
//         </div>
//         <div class="col3">
//           <div *ngIf="distInKms">
//             <span class="blue pull-left">250</span>
//             <span class="helptxt pull-left">km/h</span>
//           </div>
//           <div *ngIf="!distInKms">
//             <span class="blue pull-left">155</span>
//             <span class="helptxt pull-left">miles/hr</span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Max speed</span>
//           </div>
//         </div>
//         <div class="col3 last">
//           <div *ngIf="distInKms">
//             <span class="blue pull-left" *ngIf="!transitDistance">0</span>
//             <span class="blue pull-left" *ngIf="transitDistance">{{transitmile}}</span>
//             <span class="helptxt pull-left">km</span>
//           </div>
//           <div *ngIf="!distInKms">
//             <span class="blue pull-left" *ngIf="!transitmile">0</span>
//             <span class="blue pull-left" *ngIf="transitmile">{{transitDistance}}</span>
//             <span class="helptxt pull-left">{{emperialtrainUnit}}</span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Distance</span>
//           </div>
//         </div>
//         <div class="clear bottom-margin-20"></div>
//         <div class="col3">
//           <div>
//             <span class="blue pull-left">336</span>
//             <span class="helptxt pull-left"></span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Passengers/train</span>
//           </div>
//         </div>
//         <div class="col3">
//           <div>
//             <span class="blue pull-left">672</span>
//             <span class="helptxt pull-left"></span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Passenger capacity</span>
//           </div>
//         </div>
//         <div class="col3 last">
//           <div>
//             <span class="blue pull-left">0</span>
//             <span class="helptxt pull-left"></span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Carbon emissions</span>
//           </div>
//         </div>

//       </div>
//     </div>

//     <div class="mySlides" [hidden]="slideIndex!==4">
//       <!-- Car -->
//       <div class="transport">
//         <div class="head">
//           <span class="pull-left title">Car</span>
//           <img class="pull-left" src="../../assets/images/car.svg" alt="" />
//         </div>
//         <div class="clear"></div>
//         <div class="col3">
//           <div *ngIf="!drivingTime">
//             <span class="blue pull-left">0</span>
//             <span class="helptxt pull-left"> min</span>
//           </div>
//           <div *ngIf="drivingTime">
//             <span class="blue pull-left" *ngFor="let dt of drivingTime; let i = index" [class.helptxt]="(i%2)!==0">{{
//               dt==='hours' ? 'hrs' : dt === 'hour' ? 'hr' :dt }}</span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Time</span>
//           </div>
//         </div>
//         <div class="col3">
//           <div *ngIf="distInKms">
//             <span class="blue pull-left">120</span>
//             <span class="helptxt pull-left">km/h</span>
//           </div>
//           <div *ngIf="!distInKms">
//             <span class="blue pull-left">75</span>
//             <span class="helptxt pull-left">miles/hr</span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Max speed</span>
//           </div>
//         </div>
//         <div class="col3 last">
//           <div *ngIf="distInKms">
//             <span class="blue pull-left" *ngIf="!drivingDistance">0</span>
//             <span class="blue pull-left" *ngIf="drivingDistance">{{drivingmile}}</span>
//             <span class="helptxt pull-left">km</span>
//           </div>
//           <div *ngIf="!distInKms">
//             <span class="blue pull-left" *ngIf="!drivingmile">0</span>
//             <span class="blue pull-left" *ngIf="drivingmile">{{drivingDistance}}</span>
//             <span class="helptxt pull-left">{{emperialcarUnit}}</span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Distance</span>
//           </div>
//         </div>
//         <div class="clear bottom-margin-20"></div>
//         <div class="col3">
//           <div>
//             <span class="blue pull-left">4</span>
//             <span class="helptxt pull-left"></span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Passengers/car</span>
//           </div>
//         </div>
//         <div class="col3">
//           <div>
//             <span class="blue pull-left">4</span>
//             <span class="helptxt pull-left"></span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Passenger capacity</span>
//           </div>
//         </div>
//         <div class="col3 last">
//           <div>
//             <span class="blue pull-left">0</span>
//             <span class="helptxt pull-left"></span>
//           </div>
//           <div>
//             <span class="helptxt pull-left">Carbon emissions</span>
//           </div>
//         </div>

//       </div>
//     </div>
//     <div class="social">
//       <div class="clear"></div>
//       <a href="javascript:void(0)" (click)="twittershare()" class="pull-left">
//         <img class="chevron" src="../../assets/images/twitter.svg" alt="" />
//       </a>
//       <a href="javascript:void(0)" (click)="facebookshare()" class="pull-left">
//         <img class="chevron" src="../../assets/images/facebook.svg" alt="" />
//       </a>
//       <a href="javascript:void(0)" class="pull-left">
//         <img class="chevron" src="../../assets/images/instagram.svg" alt="" />
//       </a>
//       <a href="javascript:void(0)" (click)="linkedInshare()" class="pull-left">
//         <img class="chevron" src="../../assets/images/linkedin.svg" alt="" />
//       </a>
//       <a href="javascript:void(0)" class="pull-left copytxt " (click)="copytxt()">
//         <img class="chevron" src="../../assets/images/message_three_points.svg" alt="" />
//       </a>
//       <a href="javascript:void(0)" (click)="emailshare()" class="pull-left nomargin">
//         <!-- <img class="chevron" src="../../assets/images/email.svg" alt="" /> -->
//         <img class="chevron" src="../../assets/images/link.png" alt="" />
//       </a>
//     </div>
//   </div>

//   <a class="prev" (click)="minusSlide()">&#10094;</a>
//   <a class="next" (click)="plusSlide()">&#10095;</a>

// </div>



// ===============================================================================================
// <!-- <div class="transport" [@hyperloopPanelIn]="hyperLoopPanelState">
//           <div class="head">
//             <span class="pull-left title">HyperloopTT</span>
//             <img class="pull-left" src="../../assets/images/capsule1.svg" alt="" />
//           </div>
//           <div class="clear"></div>
//           <div class="col3">
//             <div>
//               <span class="blue pull-left" *ngIf="hyperloopTime">{{hyperloopTime}}</span>
//               <span class="blue pull-left" *ngIf="!hyperloopTime">0</span>
//               <span class="helptxt pull-left">min</span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Time</span>
//             </div>
//           </div>
//           <div class="col3">
//             <div *ngIf="distInKms">
//               <span class="blue pull-left" *ngIf="hyperloopSpeed">{{hyperloopSpeed}}</span>
//               <span class="blue pull-left" *ngIf="!hyperloopSpeed">0</span>
  
//               <span class="helptxt pull-left">km/h</span>
//             </div>
//             <div *ngIf="!distInKms">
//               <span class="blue pull-left" *ngIf="hyperloopMiledSpeed">{{hyperloopMiledSpeed}}</span>
//               <span class="blue pull-left" *ngIf="!hyperloopMiledSpeed">0</span>
  
//               <span class="helptxt pull-left">miles/hr</span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Max speed</span>
//             </div>
//           </div>
//           <div class="col3 last">
//             <div *ngIf="distInKms">
//               <span class="blue pull-left" *ngIf="!distance">0</span>
//               <span class="blue pull-left" *ngIf="distance">{{distance}}</span>
//               <span class="helptxt pull-left">km</span>
//             </div>
//             <div *ngIf="!distInKms">
//               <span class="blue pull-left" *ngIf="!miledistance">0</span>
//               <span class="blue pull-left" *ngIf="miledistance">{{miledistance}}</span>
//               <span class="helptxt pull-left">mi</span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Distance</span>
//             </div>
//           </div>
//           <div class="clear bottom-margin-20"></div>
//           <div class="col3">
//             <div>
//               <span class="blue pull-left">30</span>
//               <span class="helptxt pull-left"></span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Passengers/capsule</span>
//             </div>
//           </div>
//           <div class="col3">
//             <div>
//               <span class="blue pull-left">2500</span>
//               <span class="helptxt pull-left"></span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Passenger capacity</span>
//             </div>
//           </div>
//           <div class="col3 last">
//             <div>
//               <span class="blue pull-left">0</span>
//               <span class="helptxt pull-left"></span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Carbon emissions</span>
//             </div>
//           </div>
  
//         </div>
//         <div class="transport" [@airplanePanelIn]="airplanePanelState">
//           <div class="head">
//             <span class="pull-left title">Airplane</span>
//             <img class="pull-left" src="../../assets/images/airplane.svg" alt="" />
//           </div>
//           <div class="clear"></div>
//           <div class="col3">
//             <div>
//               <span class="blue pull-left" *ngIf="!airplanTime">0</span>
//               <span class="blue pull-left" *ngIf="airplanTime">{{airplanTime}}</span>
//               <span class="helptxt pull-left">hr</span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Time</span>
//             </div>
//           </div>
//           <div class="col3">
//             <div *ngIf="distInKms">
//               <span class="blue pull-left" *ngIf="airplanSpeed">{{airplanSpeed}}</span>
//               <span class="blue pull-left" *ngIf="!airplanSpeed">0</span>
  
//               <span class="helptxt pull-left">km/h</span>
//             </div>
//             <div *ngIf="!distInKms">
//               <span class="blue pull-left" *ngIf="airplaneMileSpeed">{{airplaneMileSpeed}}</span>
//               <span class="blue pull-left" *ngIf="!airplaneMileSpeed">0</span>
  
//               <span class="helptxt pull-left">miles/hr</span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Max speed</span>
//             </div>
//           </div>
//           <div class="col3 last">
//             <div *ngIf="distInKms">
//               <span class="blue pull-left" *ngIf="!distance">0</span>
//               <span class="blue pull-left" *ngIf="distance>200">{{distance}}</span>
//               <span class="blue pull-left" *ngIf="distance<=200">--</span>
//               <span class="helptxt pull-left">km</span>
//             </div>
//             <!-- <div *ngIf="!distInKms">
//               <span class="blue pull-left" *ngIf="!miledistance">0</span>
//               <span class="blue pull-left" *ngIf="miledistance>200">{{miledistance}}</span>
//               <span class="blue pull-left" *ngIf="miledistance<=200">--</span>
//               <span class="helptxt pull-left">mi</span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Distance</span>
//             </div>
//           </div>
//           <div class="clear bottom-margin-20"></div>
//           <div class="col3">
//             <div>
//               <span class="blue pull-left">250</span>
//               <span class="helptxt pull-left"></span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Passengers/plane</span>
//             </div>
//           </div>
//           <div class="col3">
//             <div>
//               <span class="blue pull-left">500</span>
//               <span class="helptxt pull-left"></span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Passenger capacity</span>
//             </div>
//           </div>
//           <div class="col3 last">
//             <div>
//               <span class="blue pull-left">0</span>
//               <span class="helptxt pull-left"></span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Carbon emissions</span>
//             </div>
//           </div>
  
//         </div>
//         <div class="transport" [@trainPanelIn]="trainPanelState">
//           <div class="head">
//             <span class="pull-left title">Train</span>
//             <img class="pull-left" src="../../assets/images/train.svg" alt="" />
//           </div>
//           <div class="clear"></div>
//           <div class="col3">
//             <div *ngIf="!PTTime">
//               <span class="blue pull-left">0</span>
//               <span class="helptxt pull-left"> min</span>
//             </div>
//             <div *ngIf="PTTime">
//               <span class="blue pull-left" *ngFor="let pt of PTTime; let i = index" [class.helptxt]="(i%2)!==0">{{ pt==='hours'
//                 ? 'hrs' : pt === 'hour' ? 'hr' :pt }}</span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Time</span>
//             </div>
//           </div>
//           <div class="col3">
//             <div *ngIf="distInKms">
//               <span class="blue pull-left">250</span>
//               <span class="helptxt pull-left">km/h</span>
//             </div>
//             <div *ngIf="!distInKms">
//               <span class="blue pull-left">155</span>
//               <span class="helptxt pull-left">miles/hr</span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Max speed</span>
//             </div>
//           </div>
//           <div class="col3 last">
//             <div *ngIf="distInKms">
//               <span class="blue pull-left" *ngIf="!transitDistance">0</span>
//               <span class="blue pull-left" *ngIf="transitDistance">{{transitmile}}</span>
//               <span class="helptxt pull-left">km</span>
//             </div>
//             <div *ngIf="!distInKms">
//               <span class="blue pull-left" *ngIf="!transitmile">0</span>
//               <span class="blue pull-left" *ngIf="transitmile">{{transitDistance}}</span>
//               <span class="helptxt pull-left">{{emperialtrainUnit}}</span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Distance</span>
//             </div>
//           </div>
//           <div class="clear bottom-margin-20"></div>
//           <div class="col3">
//             <div>
//               <span class="blue pull-left">336</span>
//               <span class="helptxt pull-left"></span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Passengers/train</span>
//             </div>
//           </div>
//           <div class="col3">
//             <div>
//               <span class="blue pull-left">672</span>
//               <span class="helptxt pull-left"></span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Passenger capacity</span>
//             </div>
//           </div>
//           <div class="col3 last">
//             <div>
//               <span class="blue pull-left">0</span>
//               <span class="helptxt pull-left"></span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Carbon emissions</span>
//             </div>
//           </div>
  
//         </div>
//         <div class="transport" [@carPanelIn]="carPanelState">
//           <div class="head">
//             <span class="pull-left title">Car</span>
//             <img class="pull-left" src="../../assets/images/car.svg" alt="" />
//           </div>
//           <div class="clear"></div>
//           <div class="col3">
//             <div *ngIf="!drivingTime">
//               <span class="blue pull-left">0</span>
//               <span class="helptxt pull-left"> min</span>
//             </div>
//             <div *ngIf="drivingTime">
//               <span class="blue pull-left" *ngFor="let dt of drivingTime; let i = index" [class.helptxt]="(i%2)!==0">{{ dt==='hours'
//                 ? 'hrs' : dt === 'hour' ? 'hr' :dt }}</span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Time</span>
//             </div>
//           </div>
//           <div class="col3">
//             <div *ngIf="distInKms">
//               <span class="blue pull-left">120</span>
//               <span class="helptxt pull-left">km/h</span>
//             </div>
//             <div *ngIf="!distInKms">
//               <span class="blue pull-left">75</span>
//               <span class="helptxt pull-left">miles/hr</span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Max speed</span>
//             </div>
//           </div>
//           <div class="col3 last">
//             <div *ngIf="distInKms">
//               <span class="blue pull-left" *ngIf="!drivingDistance">0</span>
//               <span class="blue pull-left" *ngIf="drivingDistance">{{drivingmile}}</span>
//               <span class="helptxt pull-left">km</span>
//             </div>
//             <div *ngIf="!distInKms">
//               <span class="blue pull-left" *ngIf="!drivingmile">0</span>
//               <span class="blue pull-left" *ngIf="drivingmile">{{drivingDistance}}</span>
//               <span class="helptxt pull-left">{{emperialcarUnit}}</span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Distance</span>
//             </div>
//           </div>
//           <div class="clear bottom-margin-20"></div>
//           <div class="col3">
//             <div>
//               <span class="blue pull-left">4</span>
//               <span class="helptxt pull-left"></span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Passengers/car</span>
//             </div>
//           </div>
//           <div class="col3">
//             <div>
//               <span class="blue pull-left">4</span>
//               <span class="helptxt pull-left"></span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Passenger capacity</span>
//             </div>
//           </div>
//           <div class="col3 last">
//             <div>
//               <span class="blue pull-left">0</span>
//               <span class="helptxt pull-left"></span>
//             </div>
//             <div>
//               <span class="helptxt pull-left">Carbon emissions</span>
//             </div>
//           </div>
  
//         </div> 
//       </div>-->

//     <!-- <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
//           Tooltip on top
//         </button> -->