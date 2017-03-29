angular.module('starter')
.directive('myRefresher', function() 
{
	return {
		restrict: 'E',
		replace: true,
		require: ['^?ionContent', '^?ionList'],
		template: '<div class="scroll-refresher"><div class="ionic-refresher-content"><i class="icon ion-arrow-down-c icon-pulling"></i><i class="icon ion-loading-c icon-refreshing"></i></div></div>',
		scope: true
	};
})