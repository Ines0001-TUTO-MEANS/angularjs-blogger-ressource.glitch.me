'use strict'

angular.module('spBlogger.controllers',[]).controller('BodyController',function($scope){
  
}).controller('FooterController',['$scope','version',function($scope,version){
  $scope.ver = version;
}]).controller('TopbarController',['$scope',function($scope){
    var that = $scope.blog ={};
    
    that.title = 'AngularJS Blog App';
}])
  