webpackJsonp([0],{

/***/ 154:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 154;

/***/ }),

/***/ 196:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 196;

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__content_content__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_service__ = __webpack_require__(459);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { AuthService } from '../../providers/auth.service';
// import { User } from '../../models/users';


// Global vars from JS
//declare var User: any;
var HomePage = (function () {
    // Get the elements in the Global var User
    //private email: any = User.email;
    //private password: any = User.password;
    function HomePage(navCtrl, db, homePageService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.db = db;
        this.homePageService = homePageService;
        // 'BBC/articles' is the name of the list in Firebase Realtime Database
        // this.newsFromBrand = db.list('BBC/articles').valueChanges();
        // Get Now Playing Movies data
        this.homePageService.getNowPlayingMovies()
            .then(function (result) {
            for (var i = 0; i < result.results.length; i++) {
                result.results[i].poster_path = "https://image.tmdb.org/t/p/w500" + result.results[i].poster_path;
            }
            _this.movies = result.results;
            console.log(_this.movies);
        })
            .catch(function (error) {
            console.log(error);
        });
        // console.log(this.newsFromBrand);
    }
    HomePage.prototype.itemTapped = function (event, item) {
        // Push to content page
        console.log("Movie clicked!");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__content_content__["a" /* ContentPage */], {
            item: item
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/Jay/Documents/Comp/FYP/News-Recommendation-Frontend/NewsRecommendation/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <!--\n    <div class="signup_login" *ngIf="displayInputBox"><ion-input max=20 type="password" placeholder="Password" [(ngModel)]="password"></ion-input></div>\n    <div class="signup_login" *ngIf="displayInputBox"><ion-input max=20 type="email" placeholder="Email" [(ngModel)]="email"></ion-input></div>\n    -->\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card *ngFor="let movie of movies" (click)="itemTapped($event, movie)">\n    <img [src]="movie.poster_path"/>\n    <ion-card-content>\n      <ion-card-title>\n        {{movie.title}}\n        <ion-badge float-end>{{movie.vote_average}}</ion-badge>\n      </ion-card-title>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/Jay/Documents/Comp/FYP/News-Recommendation-Frontend/NewsRecommendation/src/pages/home/home.html"*/,
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__home_service__["a" /* HomePageService */]
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__home_service__["a" /* HomePageService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__content_service__ = __webpack_require__(458);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { EscapeHtmlPipe } from '../../pipes/keep-html.pipe';
var ContentPage = (function () {
    function ContentPage(navCtrl, navParams, db, contentPageService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.contentPageService = contentPageService;
        this.genres = [];
        this.spoken_languages = [];
        // Get the item from page navigation from home page
        this.movie = navParams.get('item');
        console.log(this.movie);
        this.contentPageService.sendMovieDetails(this.movie.id)
            .then(function (result) {
            _this.overview = result.overview;
            _this.adult = result.adult;
            _this.genres = result.genres;
            _this.popularity = result.popularity;
            _this.tagline = result.tagline;
            _this.vote_average = result.vote_average;
            _this.release_date = result.release_date;
            _this.runtime = result.runtime;
            _this.spoken_languages = result.spoken_languages;
        })
            .catch(function (error) {
            console.log(error);
        });
        // Replace \n to <br /> to display content with formatting in content.html
        // this.news.text = this.news.text.replace(new RegExp('\n', 'g'), "<br />")
        // console.log(JSON.stringify(this.news));
        // console.log(this.news.text);
    }
    return ContentPage;
}());
ContentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-content',template:/*ion-inline-start:"/Users/Jay/Documents/Comp/FYP/News-Recommendation-Frontend/NewsRecommendation/src/pages/content/content.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{\'Content\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>{{movie.title}}</h3>\n  <h6 ion-text color="primary">{{tagline}}</h6>\n  <img class="resize" [src]=\'movie.poster_path\'/>\n  <ion-grid>\n    <ion-row>\n      <ion-col>Release Date: {{release_date}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>Runtime: {{runtime}} mins</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>Languages: <ion-badge *ngFor="let lang of spoken_languages">{{lang.name}}</ion-badge></ion-col>\n    </ion-row>\n    <ion-row *ngIf="adult">\n      <ion-col>Adult: <ion-badge color="danger">adult-only</ion-badge></ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>Genres: <ion-badge *ngFor="let type of genres">{{type.name}}</ion-badge></ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>Rating: <ion-badge>{{vote_average}}</ion-badge></ion-col>\n    </ion-row>\n    <ion-row><ion-col></ion-col></ion-row>\n    <ion-row>\n      <ion-col>Overview:</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>{{overview}}</ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n<!-- <ion-content padding>\n  <h3>{{news.title}}</h3>\n  <img [src]=\'news.top_image\'/>\n  <br><br>\n  Source: <a [href]="news.url">{{news.url}}</a>\n  <p [innerHTML]="news.text"></p>\n</ion-content> -->\n'/*ion-inline-end:"/Users/Jay/Documents/Comp/FYP/News-Recommendation-Frontend/NewsRecommendation/src/pages/content/content.html"*/,
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__content_service__["a" /* ContentPageService */]
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__content_service__["a" /* ContentPageService */]])
], ContentPage);

//# sourceMappingURL=content.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = ListPage_1 = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    return ListPage;
}());
ListPage = ListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"/Users/Jay/Documents/Comp/FYP/News-Recommendation-Frontend/NewsRecommendation/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Jay/Documents/Comp/FYP/News-Recommendation-Frontend/NewsRecommendation/src/pages/list/list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], ListPage);

var ListPage_1;
//# sourceMappingURL=list.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//declare var Unauthorized: boolean = true;
var SignUpLoginPage = (function () {
    function SignUpLoginPage(navCtrl, db, authService, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.db = db;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.authorized = __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */].Authorized;
        // Get the elements in the Global var User
        this.email = User.email;
        this.password = User.password;
        this.confirm_password = User.confirm_password;
        this.user_name = User.user_name;
        this.auth_select = "login";
        console.log(this.authorized);
    }
    SignUpLoginPage.prototype.signup = function () {
        var _this = this;
        if (this.password == this.confirm_password) {
            this.authService.signup(this.email, this.user_name, this.password)
                .then(function (result) {
                console.log(result);
                var loader = _this.loadingCtrl.create({
                    content: "Signing up...",
                    duration: 1500
                });
                loader.present();
                var alert = _this.alertCtrl.create({
                    title: 'Success',
                    subTitle: 'You have sucessfully created your account!',
                    buttons: ['OK']
                });
                alert.present();
            })
                .catch(function (error) {
                var alert = _this.alertCtrl.create({
                    title: 'Sign Up Failed',
                    subTitle: error,
                    buttons: ['OK']
                });
                alert.present();
            });
        }
    };
    SignUpLoginPage.prototype.login = function () {
        var _this = this;
        this.authService.login(this.email, this.password)
            .then(function (result) {
            console.log(result);
            var loader = _this.loadingCtrl.create({
                content: "Logging in...",
                duration: 1000
            });
            loader.present();
            console.log(_this.authorized);
            _this.authorized = true;
            console.log(_this.authorized);
        })
            .catch(function (error) {
            console.log(error);
            var alert = _this.alertCtrl.create({
                title: 'Login Failed',
                subTitle: error,
                buttons: ['OK']
            });
            alert.present();
        });
    };
    return SignUpLoginPage;
}());
SignUpLoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/Jay/Documents/Comp/FYP/News-Recommendation-Frontend/NewsRecommendation/src/pages/signup_login/signup_login.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content id="signup_login">\n  <div class="outer-container">\n    <div class="inner-container" ng-hide="authorized">\n      <div style="padding-bottom: 15px;">\n        <ion-segment [(ngModel)]="auth_select">\n          <ion-segment-button value="sign_up">\n            Sign Up\n          </ion-segment-button>\n          <ion-segment-button value="login">\n            Login\n          </ion-segment-button>\n        </ion-segment>\n      </div>\n\n      <!-- showing up signup/login div -->\n      <div [ngSwitch]="auth_select">\n        <!-- login div -->\n        <div *ngSwitchCase="\'login\'">\n          <ul class="form-container">\n            <li class="list-format"><div><ion-input class="input" max=20 type="email" placeholder="Email" [(ngModel)]="email"></ion-input></div></li>\n            <li class="list-format"><div><ion-input class="input" max=20 type="password" placeholder="Password" [(ngModel)]="password"></ion-input></div></li>\n            <li>\n              <div>\n                <button ion-button (click)="login()">\n                  Login\n                </button>\n              </div>\n            </li>\n          </ul>\n          <a>Forgot your password?</a>\n        </div>\n        <!-- signup div -->\n        <div *ngSwitchCase="\'sign_up\'" class="input-container">\n          <ul class="form-container">\n            <li class="list-format"><div><ion-input class="input" max=20 placeholder="User Name" [(ngModel)]="user_name"></ion-input></div></li>\n            <li class="list-format"><div><ion-input class="input" max=20 type="email" placeholder="Email" [(ngModel)]="email"></ion-input></div></li>\n            <li class="list-format"><div><ion-input class="input" max=20 type="password" placeholder="Password" [(ngModel)]="password"></ion-input></div></li>\n            <li class="list-format"><div><ion-input class="input" max=20 type="password" placeholder="Confirm Password" [(ngModel)]="confirm_password"></ion-input></div></li>\n            <li>\n              <div>\n                <button ion-button (click)="signup()">\n                  Sign Up\n                </button>\n              </div>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  <p>Photo by Aleksandrs Tihonovs</p>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Jay/Documents/Comp/FYP/News-Recommendation-Frontend/NewsRecommendation/src/pages/signup_login/signup_login.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* LoadingController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object])
], SignUpLoginPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=signup_login.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(313);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* unused harmony export createTranslateLoader */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_http_loader__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__environment__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_list_list__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_content_content__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_signup_login_signup_login__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__ = __webpack_require__(294);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_content_content__["a" /* ContentPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_signup_login_signup_login__["a" /* SignUpLoginPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_7_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_10__environment__["a" /* firebaseConfig */], 'news-recommendation'),
            __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HttpClient */]]
                }
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_content_content__["a" /* ContentPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_signup_login_signup_login__["a" /* SignUpLoginPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_5__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
// Initialize Firebase
// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAG09BHjSrhR8BmIMkqaO_LjggUP96xEqA",
    authDomain: "news-recommendation-fyp.firebaseapp.com",
    databaseURL: "https://news-recommendation-fyp.firebaseio.com",
    projectId: "news-recommendation-fyp",
    storageBucket: "news-recommendation-fyp.appspot.com",
    messagingSenderId: "562146193976"
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_signup_login_signup_login__ = __webpack_require__(298);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, translate) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.translate = translate;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // Set English as default language
        translate.setDefaultLang('en');
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] },
            { title: 'List', component: __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */] },
            { title: 'Sign Up/Login', component: __WEBPACK_IMPORTED_MODULE_7__pages_signup_login_signup_login__["a" /* SignUpLoginPage */] },
            { title: 'Log Out', component: null }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]) === "function" && _a || Object)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/Jay/Documents/Comp/FYP/News-Recommendation-Frontend/NewsRecommendation/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/Jay/Documents/Comp/FYP/News-Recommendation-Frontend/NewsRecommendation/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]) === "function" && _e || Object])
], MyApp);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentPageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContentPageService = (function () {
    function ContentPageService(http) {
        this.http = http;
        this.APIKey = "a6ffbc3c2a4dd66577851418f32b6da0";
        this.basePath = "https://api.themoviedb.org/3/";
    }
    // Set HTTP REQUEST header
    ContentPageService.prototype.setAuthHeader = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/json");
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
    };
    ContentPageService.prototype.sendMovieDetailsRequest = function (movieId) {
        return this.http.get(this.basePath + "movie/" + movieId + "?api_key=" + this.APIKey + "&language=en-US", this.setAuthHeader())
            .map(function (response) { return response.json(); });
    };
    ContentPageService.prototype.sendMovieDetails = function (movieId) {
        var _this = this;
        console.log("ready to do HTTP GET, sendMovieDetailsRequest(movieId) called");
        return new Promise(function (resolve, reject) {
            _this.sendMovieDetailsRequest(movieId)
                .subscribe(function (result) {
                resolve(result);
            }, function (error) {
                console.log("Error received in calling this.sendMovieDetailsRequest(movieId)");
                reject(error);
            });
        });
    };
    return ContentPageService;
}());
ContentPageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], ContentPageService);

//# sourceMappingURL=content-service.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePageService = (function () {
    function HomePageService(http) {
        this.http = http;
        this.APIKey = "a6ffbc3c2a4dd66577851418f32b6da0";
        this.basePath = "https://api.themoviedb.org/3/";
    }
    // Set HTTP REQUEST header
    HomePageService.prototype.setAuthHeader = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        // headers.append("Authorization", "Bearer " + this.writeToken);
        headers.append("Content-Type", "application/json");
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
    };
    HomePageService.prototype.sendNowPlayingMoviesRequest = function () {
        return this.http.get(this.basePath + "movie/now_playing?api_key=" + this.APIKey + "&language=en-US&page=1", this.setAuthHeader())
            .map(function (response) { return response.json(); });
    };
    HomePageService.prototype.getNowPlayingMovies = function () {
        var _this = this;
        console.log("ready to do HTTP GET, sendNowPlayingMoviesRequest() called");
        return new Promise(function (resolve, reject) {
            _this.sendNowPlayingMoviesRequest()
                .subscribe(function (result) {
                resolve(result);
            }, function (error) {
                console.log("Error received in calling this.sendNowPlayingMoviesRequest()");
                reject(error);
            });
        });
    };
    return HomePageService;
}());
HomePageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], HomePageService);

//# sourceMappingURL=home-service.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(288);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = (function () {
    function AuthService(db, firebaseAuth) {
        this.db = db;
        this.firebaseAuth = firebaseAuth;
        this.Authorized = false;
        this.user = firebaseAuth.authState;
    }
    AuthService.prototype.signup = function (newEmail, newUserName, newPassword) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.firebaseAuth
                .auth
                .createUserWithEmailAndPassword(newEmail, newPassword)
                .then(function (newUser) {
                _this.db.object("Users/" + newUser.uid).set({ email: "" + newEmail }, { userName: "" + newUserName });
            })
                .then(function (firebaseUser) {
                resolve("success");
            })
                .catch(function (error) {
                console.log('Something went wrong:', error);
                reject(error.message);
            });
        });
    };
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.firebaseAuth
                .auth
                .signInWithEmailAndPassword(email, password)
                .then(function (firebaseUser) {
                resolve("success");
            })
                .catch(function (error) {
                if (error.code === 'auth/wrong-password') {
                    reject("Wrong password");
                }
                else {
                    reject(error.message);
                }
                console.log(error);
                //reject("false");
                // return new Promise(function(resolve, reject) {
                //   // resolve("false");
                //   reject('some fail stuff');
                // });
            });
        });
    };
    AuthService.prototype.logout = function () {
        this.firebaseAuth
            .auth
            .signOut();
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _b || Object])
], AuthService);

var _a, _b;
//# sourceMappingURL=auth.service.js.map

/***/ })

},[299]);
//# sourceMappingURL=main.js.map