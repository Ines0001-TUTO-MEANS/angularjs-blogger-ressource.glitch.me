
'use strict'

angular.module('spBlogger.admin.controllers',[]).controller('AdminPostsController',['$scope','$routeParams','$location','Post', function($scope,$routeParams,$location,Post){
      $scope.posts =[];

      Post.query().$promise.then(function(data){
          // success
          console.log('spBlogger.admin.controllers:PostListController:Post:Query:success');
          $scope.posts = data
      },function(data){
          // error
          console.log('spBlogger.admin.controllers:PostListController:Post:Query:error')
      });

      $scope.updatePost = function(post){
        
          $location.path('/posts/'+post._id+'/update');
      }
      

}]).controller('ErrorController',['$scope',function($scope){

    $scope.redirectionPage={title:'Page Not Found',
                            buttonText:'Take Me Home',
                            content:'the page you requested could not be found, either contact your webmaster or try again. Use your browsers <b>Back</b> button to navigate to the page you have prevously come from<b>Or you could just press this neat little button:</b>',
                            error:'Error 404'}

}]).controller('PostUpdateController',['$scope','$routeParams','$location','Post','Comment','popupService', function($scope,$routeParams,$location,Post,Comment,popupService){
    var endPromise = {postService:false, commentsServices:false};
    $scope.post = {};
    $scope.post.messages = {};  
    $scope.buttonText="Update";
    $scope.redirectionPage={title:'Searching...',
                            buttonText:'Cancel',
                            content:'your request is processing...</br>Either contact your webmaster or try again if no result',
                            error:''};

    $scope.updatePost= function(){
      $scope.buttonText="Updating...";
      $scope.post.$update(function(){
        $location.path('/');
      })      
    };
  
    $scope.deletePost= function(post){
      if (popupService.showPopup('Really delete this?')) {
            post.$delete(function() {
                $location.path('/');
              });
        }      
    };
  

    
    $scope.isDisplayed = function(){
      return endPromise.postService&endPromise.commentsService
    }
  
    /*
    $scope.updateMessageLike = function(m){
      
      Comment.update({},m).$promise.then(function(data){
        
        console.log('PostUpdateController: call updateMessageLike :',data);
      })
    };*/
    
    Post.get({id:$routeParams.id}).$promise.then(function(data){
      $scope.post = data;
      endPromise.postService=true;      
    },function(data){
         console.log('PostUpdateController: Error get Post factory',data);
    });
  
    Comment.query({id_parent:$routeParams.id}).$promise.then(function(data){
        $scope.post.messages = data; 
        endPromise.commentsService=true;
        console.log('PostUpdateController: Success query Comment query',$routeParams.id);
      },function(data){
           console.log('PostUpdateController: Error query Comment factory',data);
      });
  
      
    
  
}]).controller('PostNewController',['$scope','$location','Post',function($scope,$location,Post){
    $scope.post = new Post();
    $scope.buttonText="Create";
  
    $scope.addPost= function(){
        $scope.buttonText="Saving. . .";
        $scope.post.$save(function(){
          console.log('PostNewController: save data');
          $location.path('/');
        })
      
    }
    
  
  
}])