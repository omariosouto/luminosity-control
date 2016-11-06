app.directive('uiTelFormat', function($filter){
	// Runs during compile
	return {
		require: "ngModel",
		link: function(scope, element, attrs, ctrl) {
			element.bind("keyup", function(){
				var _formatDate = function(date) {
					date = date.replace(/[^0-9]+/g, "");

					if(date.length > 0) {
						date = date.substring(0,0) + "(" + date.substring(0);
					}

					if(date.length > 3) {
						date = date.substring(0,3) + ")" + date.substring(3);
					}
					if(date.length > 8) {
						date = date.substring(0,8) + "-" + date.substring(8,12);
					}
					return date;
					//10/10/2002
				}
				ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
				ctrl.$render();

			});

			ctrl.$parsers.push(function (value) {
				if (value.length === 13) {
					return value;
				}
			});

			ctrl.$formatters.push(function (value) {
				return value;
			});
		}
	};
});