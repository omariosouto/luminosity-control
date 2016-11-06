app.directive('uiCpfFormat', function($filter){
	// Runs during compile
	return {
		require: "ngModel",
		link: function(scope, element, attrs, ctrl) {
			element.bind("keyup", function(){
				var _formatDate = function(date) {
					date = date.replace(/[^0-9]+/g, "");

					if(date.length > 3) {
						date = date.substring(0,3) + "." + date.substring(3);
					}
					if(date.length > 7) {
						date = date.substring(0,7) + "." + date.substring(7);
					}
					if(date.length > 11) {
						date = date.substring(0,11) + "-" + date.substring(11,13);
					}
					return date;
					//10/10/2002
				}

				ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
				ctrl.$render();

			});

			ctrl.$parsers.push(function (value) {
				if (value.length === 14) {
					return value;
				}
			});

			ctrl.$formatters.push(function (value) {
				return value;
			});
		}
	};
});