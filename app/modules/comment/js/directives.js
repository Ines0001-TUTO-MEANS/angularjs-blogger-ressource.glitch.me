'use strict'

angular.module('spBlogger.comment.directives',[]).directive('ngTabs',function(){
  return {
    restrict:'E',
    scope:{},
    //replace:true,
    controller:function($scope,$element){
      var tabs = $scope.tabs=[];
      this.addTab=function(tab){
        tab.selected=false;
        if (tabs.length === 0) {
            tab.selected=true;
          }
        tabs.push(tab);
      }
      
      
    },
    link:function(scope){
      scope.$watchCollection(['title','number'],function(){
        console.log('link ngTabs parameters:',{title:scope.title,number:scope.number});
      })
      
    },
    transclude:true,
    templateUrl:'/modules/comment/views/tabs.html'
  }
}).directive('ngTab',function(){
  return {
    restrict:'E',
    scope:{
      title:'@',
      number:'='
    },
    replace:true,
    require:'^ngTabs',
    transclude:true,
    link:function(scope,element,attribs,tabsCtrl){
      tabsCtrl.addTab(scope);
    },
    templateUrl:'/modules/comment/views/tab.html'
  }
})