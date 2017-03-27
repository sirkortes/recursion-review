// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	var result = ''

 	if (typeof obj === 'number' || typeof obj === 'boolean') {

  		result += String(obj);

 	} else if (obj === null) {

 		result += 'null';

 	} else if (typeof obj === 'string' ) {

 		result += ('"' + obj + '"' );

 	} else if ( typeof obj === 'object' ){

 		if (Array.isArray(obj)) {

	 		result += '[';
	 		obj.forEach(function(ele, idx) {
	 			if (idx === 0) {
	 				result += stringifyJSON(ele);
	 			} else {
	 				result += ',' + stringifyJSON(ele);
	 			}
	 		})
	 		result += ']';

	 	} else if ( Object.keys(obj) ){

	 		result += "{";
	 		Object.keys(obj).forEach(function(key, index){

	 			if ( typeof obj[key] !== "function" && typeof obj[key] !== 'undefined' ){

		 			if ( index === 0 ){
						result += ( stringifyJSON(key) +":"+ stringifyJSON( obj[key] ) );
		 			} else {
		 				result += ( ","+stringifyJSON(key)+":"+stringifyJSON(obj[key] ) );
		 			}
		 		}

	 		});
	 		result += "}";

	 	} 

 	}
 	return result;
};
