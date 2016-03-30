var common = {
	isSet: function(value) {
		if (value)
			return true;
		else
			return false;
	},
	isString: function(variable) {
		return typeof variable == 'string' || variable instanceof String;
	},
	isNumber: function(variable) {
		return typeof variable == 'number' || variable.toFixed;
	},
	isArray: function(variable) {
		return variable.constructor === Array;
	},
	isFunction: function(functionToCheck) {
 		var getType = {};
 		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	},
	isObject: function(objectToCheck) {
		return objectToCheck !== null && typeof objectToCheck === 'object';
	},
	arrayValues: function(input) {
		//  discuss at: http://phpjs.org/functions/array_values/
		// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// improved by: Brett Zamir (http://brett-zamir.me)
		//   example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
		//   returns 1: {0: 'Kevin', 1: 'van Zonneveld'}

		var tmpArr = [],
		key = '';

		// if (input && typeof input === 'object' && input.changeKeyCase) {
		// 	// Duck-type check for our own array()-created PHPJSArray
		// 	return input.values();
		// }

		for (key in input) {
			// exclude functions (since these are likely just part of the prototype or just unwanted in general)
			if ( ! common.isFunction(input[key]) )
				tmpArr[tmpArr.length] = input[key];
		}

		return tmpArr;
	}
};
