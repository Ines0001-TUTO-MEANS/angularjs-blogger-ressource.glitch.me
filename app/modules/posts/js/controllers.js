'use strict'

angular.module('spBlogger.posts.controllers',['ngSanitize']).controller('PostsController',['$scope','Post','$location', function($scope,Post,$location){
  $scope.posts =[];

  Post.query().$promise.then(function(data){
      // success
      
      $scope.posts = data
  },function(data){
      // error
    console.log('spBlogger.admin.controllers:PostListController:Post:Query:error')
  });
  
  $scope.editPost = function(post){
        
          $location.path('/posts/'+post._id+'/edit');
  }
      

}]).controller('PostEditController',['$scope','$routeParams','$location','Post','Comment', function($scope,$routeParams,$location,Post,Comment){
    var endPromise = {postService:false, commentsServices:false}; 
    $scope.redirectionPage={title:'Searching...',
                            buttonText:'Cancel',
                            content:'your request is processing...</br>Either contact your webmaster or try again if no result',
                            error:''};
    
    $scope.isDisplayed = function(){
      return endPromise.postService&endPromise.commentsService
    }
  
    Post.get({id:$routeParams.id}).$promise.then(function(data){
      $scope.post = data;
      endPromise.postService=true;      
    },function(data){
         console.log('PostEditController: Error get Post factory',data);
    });
  
    Comment.query({id_parent:$routeParams.id}).$promise.then(function(data){
        $scope.post.messages = data; 
        endPromise.commentsService=true;
        console.log('PostEditController: Success query Comment query',$routeParams.id);
      },function(data){
           console.log('PostEditController: Error query Comment factory',data);
      });    

}]).controller('CommentNewController',['$scope','$routeParams','Comment', function($scope,$routeParams,Comment){
    
    $scope.comment =  new Comment();
   
    $scope.buttonText="Create";
     
    
  
    $scope.newComment= function(){
      $scope.buttonText="Creating...";
            
      $scope.comment.$save({id_parent:$routeParams.id},function(data){
        
        $scope.post.messages.push($scope.comment);
        $scope.comment=new Comment();
        $scope.buttonText="Create";
      });
      
    }
  
    
  
    
  
}])