app.directive('uiPlacaFormat', function($filter){
	// Runs during compile
	return {
		require: "ngModel",
		link: function(scope, element, attrs, ctrl) {
			element.bind("keyup", function(){
				var _formatDate = function(date) {
					date = date.replace(/\-+/g, "");

					if(date.length > 3) {
						date = date.substring(0,3) + "-" + date.substring(3,7);
					}
					date.toUpperCase();
					console.log(date.toUpperCase());
					return date.toUpperCase();
				}
				ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
				ctrl.$render();

			});

			ctrl.$parsers.push(function (value) {
				if (value.length === 8) {
					return value;
				}
			});

			ctrl.$formatters.push(function (value) {
				return value;
			});
		}
	};
});