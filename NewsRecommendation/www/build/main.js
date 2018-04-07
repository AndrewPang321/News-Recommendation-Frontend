webpackJsonp([0],{

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__content_content__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_service__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_spinner_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_common_util_service__ = __webpack_require__(150);
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
    function HomePage(navCtrl, toastCtrl, db, translate, homePageService, spinnerService, commonUtilService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
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
        if (User.email === null || User.firebase_user === null) {
            this.commonUtilService.customizePopup(event, this.navCtrl, this.translate.instant("NOT_LOGIN"), this.translate.instant("NOT_LOGIN_SUBTITLE"));
        }
        else {
            // Present toast
            this.presentToast("Liked " + movie.title);
            // Delete clicked movie in the "dislike" list in DB
            var dislikedRef = this.db.list("Users/" + User.firebase_user.uid + "/movie/dislike");
            dislikedRef.remove(movie.id.toString());
            // Add clicked movie in the "like" list in DB
            var likedRef = this.db.list("Users/" + User.firebase_user.uid + "/movie/like");
            likedRef.set(movie.id.toString(), { id: movie.id, title: movie.title, vote_average: movie.vote_average, genre_ids: movie.genre_ids, poster_path: movie.poster_path });
        }
    };
    HomePage.prototype.dislike = function (event, movie) {
        if (User.email === null || User.firebase_user === null) {
            this.commonUtilService.customizePopup(event, this.navCtrl, this.translate.instant("NOT_LOGIN"), this.translate.instant("NOT_LOGIN_SUBTITLE"));
        }
        else {
            // Present toast
            this.presentToast("Disliked " + movie.title);
            // Delete clicked movie in the "like" list in DB
            var likedRef = this.db.list("Users/" + User.firebase_user.uid + "/movie/like");
            likedRef.remove(movie.id.toString());
            // Add clicked movie in the "dislike" list in DB
            var dislikedRef = this.db.list("Users/" + User.firebase_user.uid + "/movie/dislike");
            dislikedRef.set(movie.id.toString(), { id: movie.id, title: movie.title, vote_average: movie.vote_average, genre_ids: movie.genre_ids, poster_path: movie.poster_path });
        }
    };
    HomePage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: "" + msg,
            duration: 2000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    HomePage.prototype.itemTapped = function (event, movie) {
        // Save to History in DB if login
        if (User.email != null && User.firebase_user != null) {
            var historyRef = this.db.list("Users/" + User.firebase_user.uid + "/movie/history");
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{\'Movie\' | translate}}</ion-title>\n    <!--\n    <div class="signup_login" *ngIf="displayInputBox"><ion-input max=20 type="password" placeholder="Password" [(ngModel)]="password"></ion-input></div>\n    <div class="signup_login" *ngIf="displayInputBox"><ion-input max=20 type="email" placeholder="Email" [(ngModel)]="email"></ion-input></div>\n    -->\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-card *ngFor="let movie of movies">\n    <ion-card-content (click)="itemTapped($event, movie)">\n      <img [src]="movie.poster_path"/>\n      <ion-card-title>\n        {{movie.title}}\n        <ion-badge float-end>{{movie.vote_average}}</ion-badge>\n      </ion-card-title>\n    </ion-card-content>\n\n    <ion-row no-padding>\n      <ion-col text-center>\n        <button ion-button clear small color="primary" icon-start (click)="like($event, movie)">\n          <ion-icon name=\'thumbs-up\'></ion-icon>\n          Like\n        </button>\n      </ion-col>\n      <ion-col text-center>\n        <button ion-button clear small color="danger" icon-start (click)="dislike($event, movie)">\n          <ion-icon name=\'thumbs-down\'></ion-icon>\n          Dislike\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n\n  <ion-infinite-scroll (ionInfinite)="$event.waitFor(doInfinite())">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>\n'/*ion-inline-end:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/home/home.html"*/,
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__home_service__["a" /* HomePageService */],
            __WEBPACK_IMPORTED_MODULE_6__services_spinner_service__["a" /* SpinnerService */],
            __WEBPACK_IMPORTED_MODULE_7__services_common_util_service__["a" /* CommonUtilService */]
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_5__home_service__["a" /* HomePageService */],
        __WEBPACK_IMPORTED_MODULE_6__services_spinner_service__["a" /* SpinnerService */],
        __WEBPACK_IMPORTED_MODULE_7__services_common_util_service__["a" /* CommonUtilService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonUtilService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(38);
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

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NewsContentPage = (function () {
    function NewsContentPage(navCtrl, navParams, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        // Get the item from page navigation from home page
        this.news = navParams.get('item');
        // Replace \n to <br /> to display content with formatting in content.html
        this.news.text = this.news.text.replace(new RegExp('\n', 'g'), "<br />");
        console.log(JSON.stringify(this.news));
        // console.log(this.news.text);
    }
    NewsContentPage.prototype.ionViewWillEnter = function () {
        this.startTime = new Date().getTime();
    };
    NewsContentPage.prototype.ionViewWillLeave = function () {
        this.endTime = new Date().getTime();
        // Unit of timeSession is milliseconds
        var timeSession = this.endTime - this.startTime;
        console.log("time sessioni: " + timeSession + " ms");
        if (User.email != null && User.firebase_user != null && this.news.title != "") {
            var historyRef = this.db.list("Users/" + User.firebase_user.uid + "/news/history");
            historyRef.update(this.news.id.toString(), { activeTime: timeSession });
        }
    };
    return NewsContentPage;
}());
NewsContentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-news-content',template:/*ion-inline-start:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/news-content/news-content.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{\'News\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>{{news.title}}</h3>\n  <img [src]=\'news.top_image\'/>\n  <br /><br />\n  Source: <a [href]="news.url">{{news.url}}</a>\n  <br />\n  <p class="clear" [innerHTML]="news.text"></p>\n</ion-content>\n'/*ion-inline-end:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/news-content/news-content.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], NewsContentPage);

//# sourceMappingURL=news-content.js.map

/***/ }),

/***/ 160:
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
webpackEmptyAsyncContext.id = 160;

/***/ }),

/***/ 202:
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
webpackEmptyAsyncContext.id = 202;

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(293);
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
        //this.user = firebaseAuth.authState;
    }
    AuthService.prototype.signup = function (newEmail, newUserName, newPassword) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.firebaseAuth
                .auth
                .createUserWithEmailAndPassword(newEmail, newPassword)
                .then(function (newUser) {
                _this.db.object("Users/" + newUser.uid).set({ email: "" + newEmail, userName: "" + newUserName });
                User.email = newEmail;
                User.user_name = newUserName;
                User.firebase_user = newUser;
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
                User.email = email;
                User.firebase_user = firebaseUser;
                console.log(User.firebase_user.uid);
                _this.db.object("Users/" + User.firebase_user.uid + "/userName").valueChanges().subscribe(function (data) {
                    User.user_name = data;
                    console.log(User.user_name);
                });
            })
                .catch(function (error) {
                if (error.code === 'auth/wrong-password') {
                    reject("Wrong password");
                }
                else {
                    reject(error.message);
                }
                console.log(error);
                reject("false");
            });
        });
    };
    AuthService.prototype.logout = function () {
        this.firebaseAuth
            .auth
            .signOut()
            .then(function (result) {
            console.log("success");
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    AuthService.prototype.retrieveMovieHistory = function () {
        this.db.list("Users/" + User.firebase_user.uid + "/movie/like").valueChanges()
            .subscribe(function (result) {
            User.movie_history.Like = result;
            console.log(result);
        }, function (error) {
            console.log("Error received in calling this.db.list-LIKE");
        });
        this.db.list("Users/" + User.firebase_user.uid + "/movie/dislike").valueChanges()
            .subscribe(function (result) {
            User.movie_history.Dislike = result;
            console.log(result);
        }, function (error) {
            console.log("Error received in calling this.db.list-DISLIKE");
        });
        this.db.list("Users/" + User.firebase_user.uid + "/movie/history").valueChanges()
            .subscribe(function (result) {
            User.movie_history.History = result;
            console.log(result);
        }, function (error) {
            console.log("Error received in calling this.db.list-HISTORY");
        });
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _b || Object])
], AuthService);

var _a, _b;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_spinner_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__signup_login_service__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_common_util_service__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__content_content__ = __webpack_require__(83);
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
    function SignUpLoginPage(navCtrl, db, authService, 
        //public fbService: FirebaseService,
        loadingCtrl, alertCtrl, translate, appCtrl, signUpLoginPageService, spinnerService, commonUtilService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.db = db;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.appCtrl = appCtrl;
        this.signUpLoginPageService = signUpLoginPageService;
        this.spinnerService = spinnerService;
        this.commonUtilService = commonUtilService;
        this.toastCtrl = toastCtrl;
        this.unauthorized = User.unauthorized;
        // Get the elements in the Global var User
        this.email = User.email;
        this.user_name = User.user_name;
        this.movie_history = User.movie_history;
        this.auth_select = "login";
        // Get recommendation results
        if (!this.unauthorized) {
            this.prepareUserData();
            this.getMovies(333339);
            console.log(this.user_name);
            console.log(this.email);
        }
    }
    SignUpLoginPage.prototype.signup = function () {
        var _this = this;
        if (this.password == this.confirm_password) {
            this.authService.signup(this.email, this.user_name, this.password)
                .then(function (result) {
                console.log(result);
                var loader = _this.loadingCtrl.create({
                    content: "Signing up...",
                    duration: 2000
                });
                loader.present();
                var alert = _this.alertCtrl.create({
                    title: 'Success',
                    subTitle: 'You have sucessfully created your account!',
                    buttons: ['OK']
                });
                alert.present();
                _this.unauthorized = User.unauthorized = false;
                //this.navCtrl.push(HomePage);
                _this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
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
        else {
            var alert = this.alertCtrl.create({
                title: 'Sign Up Failed',
                subTitle: 'The confirm password should be the same as your passowrd',
                buttons: ['OK']
            });
            alert.present();
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
            _this.unauthorized = User.unauthorized = false;
            // Push back to root page
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
            // Get User's data
            _this.authService.retrieveMovieHistory();
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
    // Prepare user's data to get recommendation
    SignUpLoginPage.prototype.prepareUserData = function () {
        console.log("like: " + User.movie_history.Like[0].id);
        console.log("dislike: " + User.movie_history.Dislike[0].id);
        console.log("history: " + User.movie_history.History[0].id);
    };
    SignUpLoginPage.prototype.getMovies = function (movieId) {
        var _this = this;
        this.spinnerService.show();
        this.signUpLoginPageService.sendMovieDetails(movieId)
            .then(function (result) {
            for (var i = 0; i < result.results.length; i++) {
                result.results[i].poster_path = "https://image.tmdb.org/t/p/w500" + result.results[i].poster_path;
            }
            _this.movies = result.results;
            _this.spinnerService.hide();
        })
            .catch(function (error) {
            _this.spinnerService.hide();
            console.log(error);
        });
    };
    SignUpLoginPage.prototype.like = function (event, movie) {
        if (User.email === null || User.firebase_user === null) {
            this.commonUtilService.customizePopup(event, this.navCtrl, this.translate.instant("NOT_LOGIN"), this.translate.instant("NOT_LOGIN_SUBTITLE"));
        }
        else {
            // Present toast
            this.presentToast("Liked " + movie.title);
            // Delete clicked movie in the "dislike" list in DB
            var dislikedRef = this.db.list("Users/" + User.firebase_user.uid + "/movie/dislike");
            dislikedRef.remove(movie.id.toString());
            // Add clicked movie in the "like" list in DB
            var likedRef = this.db.list("Users/" + User.firebase_user.uid + "/movie/like");
            likedRef.set(movie.id.toString(), { id: movie.id, title: movie.title, vote_average: movie.vote_average, genre_ids: movie.genre_ids, poster_path: movie.poster_path });
        }
    };
    SignUpLoginPage.prototype.dislike = function (event, movie) {
        if (User.email === null || User.firebase_user === null) {
            this.commonUtilService.customizePopup(event, this.navCtrl, this.translate.instant("NOT_LOGIN"), this.translate.instant("NOT_LOGIN_SUBTITLE"));
        }
        else {
            // Present toast
            this.presentToast("Disliked " + movie.title);
            // Delete clicked movie in the "like" list in DB
            var likedRef = this.db.list("Users/" + User.firebase_user.uid + "/movie/like");
            likedRef.remove(movie.id.toString());
            // Add clicked movie in the "dislike" list in DB
            var dislikedRef = this.db.list("Users/" + User.firebase_user.uid + "/movie/dislike");
            dislikedRef.set(movie.id.toString(), { id: movie.id, title: movie.title, vote_average: movie.vote_average, genre_ids: movie.genre_ids, poster_path: movie.poster_path });
        }
    };
    SignUpLoginPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: "" + msg,
            duration: 2000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SignUpLoginPage.prototype.itemTapped = function (event, movie) {
        // Save to History in DB if login
        if (User.email != null && User.firebase_user != null) {
            var historyRef = this.db.list("Users/" + User.firebase_user.uid + "/movie/history");
            historyRef.set(movie.id.toString(), { id: movie.id, title: movie.title, vote_average: movie.vote_average, genre_ids: movie.genre_ids, poster_path: movie.poster_path });
        }
        // Push to content page
        console.log("Movie clicked!");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__content_content__["a" /* ContentPage */], {
            item: movie
        });
    };
    SignUpLoginPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        console.log(this.movie_history.Dislike);
        this.authService.retrieveMovieHistory();
        //this.movie_history.Dislike.forEach(element => {
        //        console.log(element.key, element.value);
        //    });
        refresher.complete();
    };
    return SignUpLoginPage;
}());
SignUpLoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/signup_login/signup_login.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title *ngIf="!unauthorized">Recommended Movies</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content id="signup_login" *ngIf="unauthorized">\n  <div class="outer-container">\n    <div class="inner-container">\n      <div style="padding-bottom: 15px;">\n        <ion-segment [(ngModel)]="auth_select">\n          <ion-segment-button value="sign_up">\n            {{\'SIGN_UP\' | translate}}\n          </ion-segment-button>\n          <ion-segment-button value="login">\n            {{\'LOGIN\' | translate}}\n          </ion-segment-button>\n        </ion-segment>\n      </div>\n\n      <!-- showing up signup/login div -->\n      <div [ngSwitch]="auth_select">\n        <!-- login div -->\n        <div *ngSwitchCase="\'login\'">\n          <ul class="form-container">\n            <li class="list-format"><div><ion-input class="input" max=20 type="email" placeholder="Email" [(ngModel)]="email"></ion-input></div></li>\n            <li class="list-format"><div><ion-input class="input" max=20 type="password" placeholder="Password" [(ngModel)]="password"></ion-input></div></li>\n            <li>\n              <div>\n                <button ion-button (click)="login()">\n                  {{\'LOGIN\' | translate}}\n                </button>\n              </div>\n            </li>\n          </ul>\n          <a>Forgot your password?</a>\n        </div>\n        <!-- signup div -->\n        <div *ngSwitchCase="\'sign_up\'" class="input-container">\n          <ul class="form-container">\n            <li class="list-format"><div><ion-input class="input" max=20 placeholder="User Name" [(ngModel)]="user_name"></ion-input></div></li>\n            <li class="list-format"><div><ion-input class="input" max=20 type="email" placeholder="Email" [(ngModel)]="email"></ion-input></div></li>\n            <li class="list-format"><div><ion-input class="input" max=20 type="password" placeholder="Password" [(ngModel)]="password"></ion-input></div></li>\n            <li class="list-format"><div><ion-input class="input" max=20 type="password" placeholder="Confirm Password" [(ngModel)]="confirm_password"></ion-input></div></li>\n            <li>\n              <div>\n                <button ion-button (click)="signup()">\n                  {{\'Sign Up\' | translate}}\n                </button>\n              </div>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  <p>Photo by Aleksandrs Tihonovs</p>\n  </div>\n</ion-content>\n\n<!-- Recommendation results displayed after login -->\n<ion-content *ngIf="!unauthorized">\n  <div>\n    <ion-card *ngFor="let movie of movies">\n      <ion-card-content (click)="itemTapped($event, movie)">\n        <img [src]="movie.poster_path"/>\n        <ion-card-title>\n          {{movie.title}}\n          <ion-badge float-end>{{movie.vote_average}}</ion-badge>\n        </ion-card-title>\n      </ion-card-content>\n  \n      <ion-row no-padding>\n        <ion-col text-center>\n          <button ion-button clear small color="primary" icon-start (click)="like($event, movie)">\n            <ion-icon name=\'thumbs-up\'></ion-icon>\n            Like\n          </button>\n        </ion-col>\n        <ion-col text-center>\n          <button ion-button clear small color="danger" icon-start (click)="dislike($event, movie)">\n            <ion-icon name=\'thumbs-down\'></ion-icon>\n            Dislike\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-card>\n  </div>\n\n  <ion-refresher *ngIf="!unauthorized" (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content\n    pullingIcon="arrow-dropdown"\n    pullingText="Pull to update recommendation"\n    refreshingSpinner="circles"\n    refreshingText="Updating...">\n    </ion-refresher-content>\n  </ion-refresher>\n</ion-content>\n'/*ion-inline-end:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/signup_login/signup_login.html"*/,
        providers: [
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_6__signup_login_service__["a" /* SignUpLoginPageService */],
            __WEBPACK_IMPORTED_MODULE_5__services_spinner_service__["a" /* SpinnerService */],
            __WEBPACK_IMPORTED_MODULE_8__services_common_util_service__["a" /* CommonUtilService */]
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* LoadingController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__signup_login_service__["a" /* SignUpLoginPageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__signup_login_service__["a" /* SignUpLoginPageService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_5__services_spinner_service__["a" /* SpinnerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_spinner_service__["a" /* SpinnerService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_8__services_common_util_service__["a" /* CommonUtilService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_common_util_service__["a" /* CommonUtilService */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* ToastController */]) === "function" && _l || Object])
], SignUpLoginPage);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
//# sourceMappingURL=signup_login.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__content_content__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__news_content_news_content__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_spinner_service__ = __webpack_require__(63);
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
        this.history = {
            Movie: [],
            News: [],
            selectType: "Movie"
        };
        this.spinnerService.show();
        if (User.email != null && User.firebase_user != null) {
            this.isLogin = true;
            this.history.Movie = this.db.list("Users/" + User.firebase_user.uid + "/movie/history").valueChanges();
            this.history.News = this.db.list("Users/" + User.firebase_user.uid + "/news/history").valueChanges();
        }
        else {
            this.isLogin = false;
        }
        this.spinnerService.hide();
    }
    HistoryPage.prototype.movieTapped = function (event, item) {
        // Push to content page
        console.log("Movie in History clicked!");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__content_content__["a" /* ContentPage */], {
            item: item
        });
    };
    HistoryPage.prototype.newsTapped = function (event, item) {
        // Push to news-content page
        console.log("News in History clicked!");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__news_content_news_content__["a" /* NewsContentPage */], {
            item: item
        });
    };
    return HistoryPage;
}());
HistoryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/history/history.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{\'History\' | translate}}</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="history.selectType">\n      <ion-segment-button value="Movie">\n        {{\'Movie\' | translate}}\n      </ion-segment-button>\n      <ion-segment-button value="News">\n        {{\'News\' | translate}}\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list *ngIf="isLogin">\n    <div *ngIf="history.selectType == \'Movie\'">\n      <button ion-item *ngFor="let movie of history.Movie | async" (click)="movieTapped($event, movie)">\n        <ion-label>{{movie.title}}</ion-label>\n      </button>\n    </div>\n    <div *ngIf="history.selectType == \'News\'">\n      <button ion-item *ngFor="let news of history.News | async" (click)="newsTapped($event, news)">\n        <ion-label>{{news.title}}</ion-label>\n      </button>\n    </div>\n  </ion-list>\n\n  <ion-list *ngIf="!isLogin">\n    <ion-item>\n      <ion-label>{{\'NOT_LOGIN_HISTORY\' | translate}}</ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/history/history.html"*/,
        providers: [
            __WEBPACK_IMPORTED_MODULE_6__services_spinner_service__["a" /* SpinnerService */]
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_6__services_spinner_service__["a" /* SpinnerService */]])
], HistoryPage);

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__news_content_news_content__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_spinner_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_common_util_service__ = __webpack_require__(150);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NewsPage = (function () {
    function NewsPage(navCtrl, toastCtrl, db, translate, spinnerService, commonUtilService) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.db = db;
        this.translate = translate;
        this.spinnerService = spinnerService;
        this.commonUtilService = commonUtilService;
        // 'BBC/articles' is the name of the list in Firebase Realtime Database
        this.newsFromBrand = db.list('BBC/articles').valueChanges();
        console.log(this.newsFromBrand);
    }
    NewsPage.prototype.like = function (event, news) {
        if (User.email === null || User.firebase_user === null) {
            this.commonUtilService.customizePopup(event, this.navCtrl, this.translate.instant("NOT_LOGIN"), this.translate.instant("NOT_LOGIN_SUBTITLE"));
        }
        else {
            // Present toast
            this.presentToast("Liked " + news.title);
            // Delete clicked movie in the "dislike" list in DB
            var dislikedRef = this.db.list("Users/" + User.firebase_user.uid + "/news/dislike");
            dislikedRef.remove(news.id.toString());
            // Add clicked movie in the "like" list in DB
            var likedRef = this.db.list("Users/" + User.firebase_user.uid + "/news/like");
            likedRef.set(news.id.toString(), { id: news.id, url: news.url, title: news.title, all_categories: news.all_categories, main_category: news.main_category, keywords: news.keywords, summary: news.summary, text: news.text, top_image: news.top_image });
        }
    };
    NewsPage.prototype.dislike = function (event, news) {
        if (User.email === null || User.firebase_user === null) {
            this.commonUtilService.customizePopup(event, this.navCtrl, this.translate.instant("NOT_LOGIN"), this.translate.instant("NOT_LOGIN_SUBTITLE"));
        }
        else {
            // Present toast
            this.presentToast("Disliked " + news.title);
            // Delete clicked movie in the "like" list in DB
            var likedRef = this.db.list("Users/" + User.firebase_user.uid + "/news/like");
            likedRef.remove(news.id.toString());
            // Add clicked movie in the "dislike" list in DB
            var dislikedRef = this.db.list("Users/" + User.firebase_user.uid + "/news/dislike");
            dislikedRef.set(news.id.toString(), { id: news.id, url: news.url, title: news.title, all_categories: news.all_categories, main_category: news.main_category, keywords: news.keywords, summary: news.summary, text: news.text, top_image: news.top_image });
        }
    };
    NewsPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: "" + msg,
            duration: 2000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    NewsPage.prototype.itemTapped = function (event, news) {
        // Save to History in DB if login
        if (User.email != null && User.firebase_user != null) {
            var historyRef = this.db.list("Users/" + User.firebase_user.uid + "/news/history");
            historyRef.set(news.id.toString(), { id: news.id, url: news.url, title: news.title, all_categories: news.all_categories, main_category: news.main_category, keywords: news.keywords, summary: news.summary, text: news.text, top_image: news.top_image });
        }
        // Push to news-content page
        console.log("News clicked!");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__news_content_news_content__["a" /* NewsContentPage */], {
            item: news
        });
    };
    return NewsPage;
}());
NewsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/news/news.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{\'News\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-card *ngFor="let news of newsFromBrand | async">\n    <ion-card-content (click)="itemTapped($event, news)">\n      <img [src]=\'news.top_image\'/>\n      <ion-card-title>\n        {{news.title}}\n      </ion-card-title>\n    </ion-card-content>\n\n    <ion-row no-padding>\n        <ion-col text-center>\n          <button ion-button clear small color="primary" icon-start (click)="like($event, news)">\n            <ion-icon name=\'thumbs-up\'></ion-icon>\n            Like\n          </button>\n        </ion-col>\n        <ion-col text-center>\n          <button ion-button clear small color="danger" icon-start (click)="dislike($event, news)">\n            <ion-icon name=\'thumbs-down\'></ion-icon>\n            Dislike\n          </button>\n        </ion-col>\n      </ion-row>\n  </ion-card>\n   \n</ion-content>\n'/*ion-inline-end:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/news/news.html"*/,
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__services_spinner_service__["a" /* SpinnerService */],
            __WEBPACK_IMPORTED_MODULE_6__services_common_util_service__["a" /* CommonUtilService */]
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_5__services_spinner_service__["a" /* SpinnerService */],
        __WEBPACK_IMPORTED_MODULE_6__services_common_util_service__["a" /* CommonUtilService */]])
], NewsPage);

//# sourceMappingURL=news.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(318);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* unused harmony export createTranslateLoader */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_http_loader__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__environment__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_content_content__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_signup_login_signup_login__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_history_history__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_news_news__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_news_content_news_content__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__ = __webpack_require__(299);
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
            __WEBPACK_IMPORTED_MODULE_15__pages_history_history__["a" /* HistoryPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_news_news__["a" /* NewsPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_news_content_news_content__["a" /* NewsContentPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {}, {
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
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_content_content__["a" /* ContentPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_signup_login_signup_login__["a" /* SignUpLoginPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_history_history__["a" /* HistoryPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_news_news__["a" /* NewsPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_news_content_news_content__["a" /* NewsContentPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_5__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 453:
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

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_service__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_signup_login_signup_login__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_history_history__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_news_news__ = __webpack_require__(303);
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
    function MyApp(platform, statusBar, splashScreen, translate, authService) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.translate = translate;
        this.authService = authService;
        //@ViewChild('otherBlocks')
        //otherBlocks: TemplateRef<any>|null = null;
        //@ViewChild('profileBlock')
        //profileBlock: TemplateRef<any>|null = null;
        //displayBlock: TemplateRef<any>|null = null;
        this.user_name = User.user_name;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // Set English as default language
        translate.setDefaultLang('en');
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Movie', component: __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */] },
            { title: 'News', component: __WEBPACK_IMPORTED_MODULE_9__pages_news_news__["a" /* NewsPage */] },
            { title: 'History', component: __WEBPACK_IMPORTED_MODULE_8__pages_history_history__["a" /* HistoryPage */] },
            { title: 'Sign Up/Login', component: __WEBPACK_IMPORTED_MODULE_7__pages_signup_login_signup_login__["a" /* SignUpLoginPage */] },
            { title: 'Log Out', component: null }
        ];
        this.icons = ["home", "filing", "log-in", "exit", "videocam", "book"];
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
        if (page.title == 'Log Out') {
            if (User.email != null && User.firebase_user != null) {
                this.authService.logout();
                User.unauthorized = true;
                User.email = null;
                User.user_name = null;
                User.firebase_user = null;
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
            }
            else {
                console.log("haven't logged in");
            }
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    MyApp.prototype.titleCheck = function (pageTitle) {
        return (pageTitle == 'History' || pageTitle == 'Log Out') ? false : true;
    };
    MyApp.prototype.profileCheck = function (pageTitle) {
        return (pageTitle == 'Sign Up/Login') ? true : false;
    };
    MyApp.prototype.unauthorizedCheck = function () {
        this.user_name = User.user_name;
        return User.unauthorized ? true : false;
    };
    MyApp.prototype.getTitle = function (pageTitle) {
        switch (pageTitle) {
            case 'Home': return this.icons[0];
            case 'History': return this.icons[1];
            case 'Sign Up/Login': return this.icons[2];
            case 'Log Out': return this.icons[3];
            case 'Movie': return this.icons[4];
            case 'News': return this.icons[5];
        }
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <div *ngFor="let p of pages">\n        <button menuClose ion-item *ngIf="(unauthorizedCheck()&&titleCheck(p.title))||(!unauthorizedCheck() && !profileCheck(p.title)); else (!unauthorizedCheck() && profileCheck(p.title))? profileBlock : otherBlock" (click)="openPage(p)">\n          <ion-icon [name]=getTitle(p.title)></ion-icon> {{p.title}}\n        </button>\n        <ng-template #profileBlock>\n          <button menuClose ion-item (click)="openPage(p)">\n            <!-- <ion-icon name="contact"></ion-icon> {{this.user_name}} -->\n            <ion-icon name="contact"></ion-icon> Recommendation\n          </button>\n        </ng-template>\n        <ng-template #otherBlock></ng-template>\n      </div>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/app/app.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_5__providers_auth_service__["a" /* AuthService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_5__providers_auth_service__["a" /* AuthService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentPageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(65);
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

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(65);
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

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpLoginPageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SignUpLoginPageService = (function () {
    function SignUpLoginPageService(http) {
        this.http = http;
        this.APIKey = "a6ffbc3c2a4dd66577851418f32b6da0";
        this.basePath = "https://api.themoviedb.org/3/";
    }
    // Set HTTP REQUEST header
    SignUpLoginPageService.prototype.setAuthHeader = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/json");
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
    };
    SignUpLoginPageService.prototype.sendMovieDetailsRequest = function (movieId) {
        return this.http.get(this.basePath + "movie/" + movieId + "/recommendations?api_key=" + this.APIKey + "&language=en-US", this.setAuthHeader())
            .map(function (response) { return response.json(); });
    };
    SignUpLoginPageService.prototype.sendMovieDetails = function (movieId) {
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
    return SignUpLoginPageService;
}());
SignUpLoginPageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], SignUpLoginPageService);

//# sourceMappingURL=signup_login-service.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpinnerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
], SpinnerService);

//# sourceMappingURL=spinner-service.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__content_service__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_spinner_service__ = __webpack_require__(63);
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
    }
    ContentPage.prototype.ionViewWillEnter = function () {
        this.startTime = new Date().getTime();
    };
    ContentPage.prototype.ionViewWillLeave = function () {
        this.endTime = new Date().getTime();
        // Unit of timeSession is milliseconds
        var timeSession = this.endTime - this.startTime;
        console.log("time sessioni: " + timeSession + " ms");
        if (User.email != null && User.firebase_user != null && this.movie.id != null) {
            var historyRef = this.db.list("Users/" + User.firebase_user.uid + "/movie/history");
            historyRef.update(this.movie.id.toString(), { activeTime: timeSession });
        }
    };
    return ContentPage;
}());
ContentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-content',template:/*ion-inline-start:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/content/content.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{\'Movie\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>{{movie.title}}</h3>\n  <h6 ion-text color="primary">{{tagline}}</h6>\n  <img class="resize" [src]=\'movie.poster_path\'/>\n  <ion-grid>\n    <ion-row>\n      <ion-col>{{\'RELEASE_DATE\' | translate}}: {{release_date}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>{{\'RUNTIME\' | translate}}: {{runtime}} {{\'MINUTE\' | translate}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>{{\'LANGUAGES\' | translate}}: <ion-badge *ngFor="let lang of spoken_languages">{{lang.name}}</ion-badge></ion-col>\n    </ion-row>\n    <ion-row *ngIf="adult">\n      <ion-col>{{\'Adult\' | translate}}: <ion-badge color="danger">{{\'ADULT_ONLY\' | translate}}</ion-badge></ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>{{\'GENRES\' | translate}}: <ion-badge *ngFor="let type of genres">{{type.name}}</ion-badge></ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>{{\'RATING\' | translate}}: <ion-badge>{{vote_average}}</ion-badge></ion-col>\n    </ion-row>\n    <ion-row><ion-col></ion-col></ion-row>\n    <ion-row>\n      <ion-col>{{\'OVERVIEW\' | translate}}:</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>{{overview}}</ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/AndrewPang/git/News-Recommendation-Frontend/NewsRecommendation/src/pages/content/content.html"*/,
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__content_service__["a" /* ContentPageService */],
            __WEBPACK_IMPORTED_MODULE_4__services_spinner_service__["a" /* SpinnerService */]
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__content_service__["a" /* ContentPageService */],
        __WEBPACK_IMPORTED_MODULE_4__services_spinner_service__["a" /* SpinnerService */]])
], ContentPage);

//# sourceMappingURL=content.js.map

/***/ })

},[304]);
//# sourceMappingURL=main.js.map