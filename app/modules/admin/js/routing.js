'use strict'

angular.module('spBlogger.admin',['spBlogger.admin.controllers','spBlogger.admin.services','ngRoute']);

angular.module('spBlogger.admin').config(function($routeProvider,$httpProvider,$locationProvider,AUTH_KEY){
  $routeProvider
    .when('/',{templateUrl:'/modules/admin/views/admin-all-posts.html',controller:'AdminPostsController'})
    .when('/error',{templateUrl:'/modules/common/views/alert-page.html',controller:'ErrorController'})
    .when('/posts/:id/update',{templateUrl:'/modules/admin/views/admin-update-post.html',controller:'PostUpdateController'})
    .when('/posts/new',{templateUrl:'/modules/admin/views/admin-new-post.html',controller:'PostNewController'})
    .otherwise({redirectTo:'/error'});
  
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
  $httpProvider.defaults.headers.common['x-apikey'] =  AUTH_KEY ;
  
})