'use strict'

angular.module('spBlogger.posts',['spBlogger.posts.controllers','spBlogger.posts.services','spBlogger.comment','ngRoute']);

angular.module('spBlogger.posts').config(function($routeProvider,AUTH_KEY){
  $routeProvider
    .when('/posts',{templateUrl:'/modules/posts/views/posts.html',controller:'PostsController'})
    .when('/posts/:id/edit',{templateUrl:'/modules/posts/views/edit-post.html',controller:'PostEditController'});
})