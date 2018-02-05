webpackJsonp([0],{

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__content_service__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_spinner_service__ = __webpack_require__(148);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ContentPage = (function () {
    function ContentPage(navCtrl, navParams, db, contentPageService, spinnerService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.contentPageService = contentPageService;
        this.spinnerService = spinnerService;
        this.genres = [];
        this.spoken_languages = [];
        this.spinnerService.show();
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
            _this.spinnerService.hide();
        })
            .catch(function (error) {
            _this.spinnerService.hide();
            console.log(error);
        });
        // Replace \n to <br /> to display content with formatting in content.html
        // this.news.text = this.news.text.replace(new RegExp('\n', 'g'), "<br />")
        // console.log(JSON.stringify(this.news));
        // console.log(this.news.text);
    }
    ContentPage.prototype.ionViewWillEnter = function () {
        this.startTime = new Date().getTime();
    };
    ContentPage.prototype.ionViewWillLeave = function () {
        this.endTime = new Date().getTime();
        // Unit of timeSession is milliseconds
        var timeSession = this.endTime - this.startTime;
        console.log("time sessioni: " + timeSession + " ms");
        if (User.email != null && User.password != null && User.firebase_user != null && this.movie.id != null) {
            var historyRef = this.db.list("Users/" + User.firebase_user.uid + "/history");
            historyRef.update(this.movie.id.toString(), { activeTime: timeSession });
        }
    };
    return ContentPage;
}());
ContentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-content',template:/*ion-inline-start:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/content/content.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{\'Content\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>{{movie.title}}</h3>\n  <h6 ion-text color="primary">{{tagline}}</h6>\n  <img class="resize" [src]=\'movie.poster_path\'/>\n  <ion-grid>\n    <ion-row>\n      <ion-col>{{\'RELEASE_DATE\' | translate}}: {{release_date}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>{{\'RUNTIME\' | translate}}: {{runtime}} {{\'MINUTE\' | translate}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>{{\'LANGUAGES\' | translate}}: <ion-badge *ngFor="let lang of spoken_languages">{{lang.name}}</ion-badge></ion-col>\n    </ion-row>\n    <ion-row *ngIf="adult">\n      <ion-col>{{\'Adult\' | translate}}: <ion-badge color="danger">{{\'ADULT_ONLY\' | translate}}</ion-badge></ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>{{\'GENRES\' | translate}}: <ion-badge *ngFor="let type of genres">{{type.name}}</ion-badge></ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>{{\'RATING\' | translate}}: <ion-badge>{{vote_average}}</ion-badge></ion-col>\n    </ion-row>\n    <ion-row><ion-col></ion-col></ion-row>\n    <ion-row>\n      <ion-col>{{\'OVERVIEW\' | translate}}:</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>{{overview}}</ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n<!-- <ion-content padding>\n  <h3>{{news.title}}</h3>\n  <img [src]=\'news.top_image\'/>\n  <br><br>\n  Source: <a [href]="news.url">{{news.url}}</a>\n  <p [innerHTML]="news.text"></p>\n</ion-content> -->\n'/*ion-inline-end:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/content/content.html"*/,
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__content_service__["a" /* ContentPageService */],
            __WEBPACK_IMPORTED_MODULE_4__services_spinner_service__["a" /* SpinnerService */]
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__content_service__["a" /* ContentPageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__content_service__["a" /* ContentPageService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_spinner_service__["a" /* SpinnerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_spinner_service__["a" /* SpinnerService */]) === "function" && _e || Object])
], ContentPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=content.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpinnerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SpinnerService = (function () {
    function SpinnerService(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
    }
    SpinnerService.prototype.show = function () {
        // console.log("Show spinner");
        this.loadingSpinner = this.loadingCtrl.create();
        this.loadingSpinner.present();
    };
    SpinnerService.prototype.hide = function () {
        // console.log("Hide spinner");
        if (this.loadingSpinner) {
            this.loadingSpinner.dismiss();
        }
    };
    return SpinnerService;
}());
SpinnerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], SpinnerService);

//# sourceMappingURL=spinner-service.js.map

/***/ }),

/***/ 157:
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
webpackEmptyAsyncContext.id = 157;

/***/ }),

/***/ 199:
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
webpackEmptyAsyncContext.id = 199;

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__content_content__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_service__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_spinner_service__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_common_util_service__ = __webpack_require__(461);
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




var HomePage = (function () {
    // Get the elements in the Global var User
    //private email: any = User.email;
    //private password: any = User.password;
    function HomePage(navCtrl, db, translate, homePageService, spinnerService, commonUtilService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.db = db;
        this.translate = translate;
        this.homePageService = homePageService;
        this.spinnerService = spinnerService;
        this.commonUtilService = commonUtilService;
        this.current_page = 1;
        // 'BBC/articles' is the name of the list in Firebase Realtime Database
        // this.newsFromBrand = db.list('BBC/articles').valueChanges();
        // Get Now Playing Movies data
        this.homePageService.getNowPlayingMovies(this.current_page)
            .then(function (result) {
            _this.spinnerService.show();
            for (var i = 0; i < result.results.length; i++) {
                result.results[i].poster_path = "https://image.tmdb.org/t/p/w500" + result.results[i].poster_path;
            }
            _this.movies = result.results;
            _this.total_pages = result.total_pages;
            _this.spinnerService.hide();
            // console.log(this.movies)
        })
            .catch(function (error) {
            _this.spinnerService.hide();
            console.log(error);
        });
        // console.log(this.newsFromBrand);
    }
    HomePage.prototype.like = function (event, movie) {
        if (User.email === null || User.password === null || User.firebase_user === null) {
            this.commonUtilService.customizePopup(event, this.navCtrl, this.translate.instant("NOT_LOGIN"), this.translate.instant("NOT_LOGIN_SUBTITLE"));
        }
        else {
            // Delete clicked movie in the "dislike" list in DB
            var dislikedRef = this.db.list("Users/" + User.firebase_user.uid + "/dislike");
            dislikedRef.remove(movie.id.toString());
            // Add clicked movie in the "like" list in DB
            var likedRef = this.db.list("Users/" + User.firebase_user.uid + "/like");
            likedRef.set(movie.id.toString(), { id: movie.id, title: movie.title, vote_average: movie.vote_average, genre_ids: movie.genre_ids, poster_path: movie.poster_path });
        }
    };
    HomePage.prototype.dislike = function (event, movie) {
        if (User.email === null || User.password === null || User.firebase_user === null) {
            this.commonUtilService.customizePopup(event, this.navCtrl, this.translate.instant("NOT_LOGIN"), this.translate.instant("NOT_LOGIN_SUBTITLE"));
        }
        else {
            // Delete clicked movie in the "like" list in DB
            var likedRef = this.db.list("Users/" + User.firebase_user.uid + "/like");
            likedRef.remove(movie.id.toString());
            // Add clicked movie in the "dislike" list in DB
            var dislikedRef = this.db.list("Users/" + User.firebase_user.uid + "/dislike");
            dislikedRef.set(movie.id.toString(), { id: movie.id, title: movie.title, vote_average: movie.vote_average, genre_ids: movie.genre_ids, poster_path: movie.poster_path });
        }
    };
    HomePage.prototype.itemTapped = function (event, movie) {
        // Save to History in DB if login
        if (User.email != null && User.password != null && User.firebase_user != null) {
            var historyRef = this.db.list("Users/" + User.firebase_user.uid + "/history");
            historyRef.set(movie.id.toString(), { id: movie.id, title: movie.title, vote_average: movie.vote_average, genre_ids: movie.genre_ids, poster_path: movie.poster_path });
        }
        // Push to content page
        console.log("Movie clicked!");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__content_content__["a" /* ContentPage */], {
            item: movie
        });
    };
    HomePage.prototype.doInfinite = function () {
        var _this = this;
        console.log('Begin async operation');
        return new Promise(function (resolve) {
            if (_this.current_page < _this.total_pages) {
                // Increase requested page by 1
                _this.current_page++;
                _this.homePageService.getNowPlayingMovies(_this.current_page)
                    .then(function (result) {
                    for (var i = 0; i < result.results.length; i++) {
                        result.results[i].poster_path = "https://image.tmdb.org/t/p/w500" + result.results[i].poster_path;
                    }
                    // Add later contents into the original array
                    _this.movies = _this.movies.concat(result.results);
                    resolve();
                });
            }
            else {
                // Finish the infinite scroll otherwise
                resolve();
            }
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{\'Home\' | translate}}</ion-title>\n    <!--\n    <div class="signup_login" *ngIf="displayInputBox"><ion-input max=20 type="password" placeholder="Password" [(ngModel)]="password"></ion-input></div>\n    <div class="signup_login" *ngIf="displayInputBox"><ion-input max=20 type="email" placeholder="Email" [(ngModel)]="email"></ion-input></div>\n    -->\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-card *ngFor="let movie of movies">\n    <ion-card-content (click)="itemTapped($event, movie)">\n      <img [src]="movie.poster_path"/>\n      <ion-card-title>\n        {{movie.title}}\n        <ion-badge float-end>{{movie.vote_average}}</ion-badge>\n      </ion-card-title>\n    </ion-card-content>\n\n    <ion-row no-padding>\n      <ion-col text-center>\n        <button ion-button clear small color="primary" icon-start (click)="like($event, movie)">\n          <ion-icon name=\'thumbs-up\'></ion-icon>\n          Like\n        </button>\n      </ion-col>\n      <ion-col text-center>\n        <button ion-button clear small color="danger" icon-start (click)="dislike($event, movie)">\n          <ion-icon name=\'thumbs-down\'></ion-icon>\n          Dislike\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n\n  <ion-infinite-scroll (ionInfinite)="$event.waitFor(doInfinite())">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n   \n</ion-content>\n'/*ion-inline-end:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/home/home.html"*/,
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__home_service__["a" /* HomePageService */],
            __WEBPACK_IMPORTED_MODULE_6__services_spinner_service__["a" /* SpinnerService */],
            __WEBPACK_IMPORTED_MODULE_7__services_common_util_service__["a" /* CommonUtilService */]
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_5__home_service__["a" /* HomePageService */],
        __WEBPACK_IMPORTED_MODULE_6__services_spinner_service__["a" /* SpinnerService */],
        __WEBPACK_IMPORTED_MODULE_7__services_common_util_service__["a" /* CommonUtilService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignUpLoginPage = (function () {
    function SignUpLoginPage(navCtrl, db, authService, translate) {
        this.navCtrl = navCtrl;
        this.db = db;
        this.authService = authService;
        this.translate = translate;
        this.displayInputBox = true;
        // Get the elements in the Global var User
        this.email = User.email;
        this.password = User.password;
        this.auth_select = "login";
    }
    SignUpLoginPage.prototype.signup = function () {
        this.authService.signup(this.email, this.password);
    };
    SignUpLoginPage.prototype.login = function () {
        var _this = this;
        this.authService.login(this.email, this.password)
            .then(function (result) {
            console.log(result);
            _this.displayInputBox = false;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    return SignUpLoginPage;
}());
SignUpLoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/signup_login/signup_login.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content id="signup_login">\n  <div class="outer-container">\n    <div class="inner-container">\n      <div>\n        <ion-segment [(ngModel)]="auth_select">\n          <ion-segment-button value="sign_up">\n            {{\'SIGN_UP\' | translate}}\n          </ion-segment-button>\n          <ion-segment-button value="login">\n            {{\'LOGIN\' | translate}}\n          </ion-segment-button>\n        </ion-segment>\n      </div>\n\n      <!-- showing up signup/login div -->\n      <div [ngSwitch]="auth_select">\n        <!-- login div -->\n        <div *ngSwitchCase="\'login\'">\n          <div *ngIf="displayInputBox" class="input"><ion-input style="width: 250px;" max=20 type="email" placeholder="Email" [(ngModel)]="email"></ion-input></div>\n          <div *ngIf="displayInputBox" class="input"><ion-input style="width: 250px;" max=20 type="password" placeholder="Password" [(ngModel)]="password"></ion-input></div>\n          <div>\n            <button ionic-button (click)="login()">\n              {{\'LOGIN\' | translate}}\n            </button>\n          </div>\n        </div>\n        <!-- signup div -->\n        <div *ngSwitchCase="\'sign_up\'" class="input-container">\n        </div>\n      </div>\n    </div>\n  </div>\n  <p>Photo by Aleksandrs Tihonovs</p>\n</ion-content>\n'/*ion-inline-end:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/signup_login/signup_login.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
], SignUpLoginPage);

//# sourceMappingURL=signup_login.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__content_content__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_spinner_service__ = __webpack_require__(148);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HistoryPage = (function () {
    function HistoryPage(navCtrl, db, translate, spinnerService) {
        this.navCtrl = navCtrl;
        this.db = db;
        this.translate = translate;
        this.spinnerService = spinnerService;
        this.spinnerService.show();
        if (User.email != null && User.password != null && User.firebase_user != null) {
            this.isLogin = true;
            this.history = this.db.list("Users/" + User.firebase_user.uid + "/history").valueChanges();
        }
        else {
            this.isLogin = false;
        }
        this.spinnerService.hide();
    }
    HistoryPage.prototype.itemTapped = function (event, item) {
        // Push to content page
        console.log("Movie in History clicked!");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__content_content__["a" /* ContentPage */], {
            item: item
        });
    };
    return HistoryPage;
}());
HistoryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/history/history.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{\'History\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list *ngIf="isLogin">\n    <button ion-item *ngFor="let movie of history | async" (click)="itemTapped($event, movie)">\n      <ion-label>{{movie.title}}</ion-label>\n    </button>\n  </ion-list>\n  \n  <ion-list *ngIf="!isLogin">\n    <ion-item>\n      <ion-label>{{\'NOT_LOGIN_HISTORY\' | translate}}</ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/history/history.html"*/,
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__services_spinner_service__["a" /* SpinnerService */]
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_5__services_spinner_service__["a" /* SpinnerService */]])
], HistoryPage);

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(314);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* unused harmony export createTranslateLoader */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_http_loader__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__environment__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_content_content__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_signup_login_signup_login__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_history_history__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__ = __webpack_require__(296);
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
            __WEBPACK_IMPORTED_MODULE_13__pages_content_content__["a" /* ContentPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_signup_login_signup_login__["a" /* SignUpLoginPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_history_history__["a" /* HistoryPage */]
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
            __WEBPACK_IMPORTED_MODULE_13__pages_content_content__["a" /* ContentPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_signup_login_signup_login__["a" /* SignUpLoginPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_history_history__["a" /* HistoryPage */]
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

/***/ 449:
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

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_signup_login_signup_login__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_history_history__ = __webpack_require__(299);
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
            { title: 'History', component: __WEBPACK_IMPORTED_MODULE_7__pages_history_history__["a" /* HistoryPage */] },
            { title: 'Sign Up/Login', component: __WEBPACK_IMPORTED_MODULE_6__pages_signup_login_signup_login__["a" /* SignUpLoginPage */] }
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
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentPageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(87);
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

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(87);
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
    HomePageService.prototype.sendNowPlayingMoviesRequest = function (page) {
        return this.http.get(this.basePath + "movie/now_playing?api_key=" + this.APIKey + "&language=en-US&page=" + page, this.setAuthHeader())
            .map(function (response) { return response.json(); });
    };
    HomePageService.prototype.getNowPlayingMovies = function (page) {
        var _this = this;
        console.log("ready to do HTTP GET, sendNowPlayingMoviesRequest() called");
        return new Promise(function (resolve, reject) {
            _this.sendNowPlayingMoviesRequest(page)
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

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonUtilService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CommonUtilService = (function () {
    function CommonUtilService(alertCtrl, translate) {
        this.alertCtrl = alertCtrl;
        this.translate = translate;
    }
    CommonUtilService.prototype.customizePopup = function (event, navCtrl, textTitle, textSubtitle) {
        var alert = this.alertCtrl.create({
            title: textTitle,
            subTitle: textSubtitle,
            buttons: [{
                    text: this.translate.instant('COMMON_OK'),
                    handler: function () {
                        console.log("Popup dismissed.");
                    }
                }]
        });
        alert.present();
    };
    return CommonUtilService;
}());
CommonUtilService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]])
], CommonUtilService);

//# sourceMappingURL=common-util-service.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(290);
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
        this.user = firebaseAuth.authState;
    }
    AuthService.prototype.signup = function (newEmail, newPassword) {
        var _this = this;
        this.firebaseAuth
            .auth
            .createUserWithEmailAndPassword(newEmail, newPassword)
            .then(function (newUser) {
            _this.db.object("Users/" + newUser.uid).set({ email: "" + newEmail });
            User.email = newEmail;
            User.password = newPassword;
            User.firebase_user = newUser;
            // console.log(`User.email: ${User.email}`);
            // console.log(`User.pw: ${User.password}`);
            // console.log(`User.firebaseUserUid: ${User.firebase_user.uid}`);
        })
            .then(function (value) {
            console.log('Success!', value);
        })
            .catch(function (err) {
            console.log('Something went wrong:', err.message);
        });
    };
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.firebaseAuth
                .auth
                .signInWithEmailAndPassword(email, password)
                .then(function (firebaseUser) {
                User.email = email;
                User.password = password;
                User.firebase_user = firebaseUser;
                // console.log(`User.email: ${User.email}`);
                // console.log(`User.pw: ${User.password}`);
                // console.log(`User.firebaseUserUid: ${User.firebase_user.uid}`);
                resolve("true");
            })
                .catch(function (error) {
                if (error.code === 'auth/wrong-password') {
                    alert('Wrong password.');
                }
                else {
                    alert(error.message);
                }
                console.log(error);
                reject("false");
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
], AuthService);

//# sourceMappingURL=auth.service.js.map

/***/ })

},[300]);
//# sourceMappingURL=main.js.map