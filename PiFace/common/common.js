var common = {
	isSet: function(value) {
		if (value)
			return true;
		else
			return false;
	},
	isString: function(variable) {
		return variable !== undefined && variable !== null && (typeof variable === 'string' || variable instanceof String);
	},
	isNumber: function(variable) {
		return variable !== undefined && variable !== null && (typeof variable === 'number' || variable.toFixed);
	},
	isArray: function(variable) {
		return variable !== undefined && variable !== null && variable.constructor === Array;
	},
	isFunction: function(variable) {
 		var getType = {};
 		return variable !== undefined && variable !== null && getType.toString.call(variable) === '[object Function]';
	},
	isObject: function(variable) {
		return variable !== undefined && variable !== null && typeof variable === 'object';
	},
	isNonEmptyArray: function(arr) {
    return arr && common.isArray(arr) && arr.length > 0;
  },
	arrayContainsIndex: function(arr, i) {
		if ( ( i !== 0 && ! i ) || ! arr )
		 	return false;

		if ( common.isArray(arr) && common.isNumber(parseInt(i)) ) {
			return parseInt(i) >= 0 && parseInt(i) < arr.length;
		}  else if ( common.isObject(arr) ) {
			return arr[i] ? true : false;
		}

		return false;
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
	},
	copyArray: function(arr) {
		if ( common.isArray(arr) )
			return arr.slice();
		else
			return arr;
	},
	sortArrayOfNumbers: function(arr) {
		if ( ! common.isArray(arr) )
			return arr;

		arr.sort(function(a, b) {
			if ( common.isNumber(parseInt(a)) && common.isNumber(parseInt(b)) )
				return parseInt(a) - parseInt(b);
		});

		return arr;
	}
};
