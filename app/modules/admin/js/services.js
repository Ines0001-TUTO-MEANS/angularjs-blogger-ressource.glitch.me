'use strict'

angular.module('spBlogger.admin.services',['ngResource']).service('popupService',['$window',function($window){
    this.showPopup=function(message){
        return $window.confirm(message); //Ask the users if they really want to delete the post entry
    }
}]).factory('Post',['$resource','API_RESTDB_POSTS',function($resource,API_RESTDB_POSTS){

  return $resource(API_RESTDB_POSTS,
                   // paramètre résolue automatiquement sur $save(), $update(), $delete()
                   {id: '@_id',metafields:'true'},
                   {'update': {  method: 'PUT'}});
 
}]).factory('Comment',['$resource','API_RESTDB_POSTS_MESSAGES','API_RESTDB_PUT_MESSAGES',function($resource,API_RESTDB_POSTS_MESSAGES,API_RESTDB_PUT_MESSAGES){

  return $resource(API_RESTDB_POSTS_MESSAGES,
                   // paramètre résolue automatiquement sur $save(), $update(), $delete()
                   {id: '@_id',metafields:'true'},
                   {'update': {  method: 'PUT',url:API_RESTDB_PUT_MESSAGES,params:{id: '@_id'}}});
 
}]);

angular.module('spBlogger.admin.services').value('API_RESTDB_POSTS','https://angulartest-4422.restdb.io/rest/posts/:id'); // This is our end point
angular.module('spBlogger.admin.services').value('API_RESTDB_PUT_MESSAGES','https://angulartest-4422.restdb.io/rest/messages/:id');
angular.module('spBlogger.admin.services').value('API_RESTDB_POSTS_MESSAGES','https://angulartest-4422.restdb.io/rest/posts/:id_parent/messages/:id');
//angular.module('spBlogger.admin.services').value('AUTH_KEY','59ef5a7016d89bb778329508');

/*
angular.module('spBlogger.admin.services').run(['$http','AUTH_KEY',function($http,AUTH_KEY){
  $http.defaults.headers.common['Content-Type'] = 'application/json';
  $http.defaults.headers.common['x-apikey'] =  AUTH_KEY ;
  
}])
  */