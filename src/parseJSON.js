// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here

  // take the first char
  // array, object, string, t or f, n, numbers
  
  

  var digested = digest(json);
  var result = digested.val;

  if ( digested.t === 'array'){
  	// split somehow and get it's elements

  } 

  else if ( digested.t === 'object' ){

  	// grab the keys and values
  	// digest each
  	var key;
  	// keys will be string up to first :
  	[key, json] = getKey(json);
  	// update str

  	// value will be string up to ,


  }
  

};

var getKey = function(json){
	// gets the key
	// updates json
	var colon = json.indexOf(':');
	key = json.slice(0,colon);
	json = json.slice(colon+1);

	return [ key, json ];
}

var digest = function(json){
	// return updated container, updated json
	var first = json[0];
	var result;
	var t;

	if ( first === '['){
		// its array
		result = [];
		json = json.slice(1, json.length);
		t = "array";
	}

	else if ( first === '{'){
		//  object
		result = {};
		json = json.slice(1, json.length);
		t = "object";
	}

	else if ( first === '"' ){
		// string
		result = '"' + json + '"';
		json = json.slice(1, json.length);
		t = "string";
	}

	else if ( first === 't' || first === 'f' ){
		// booleans
		result = Boolean(json);
		json = null;
		t = 'boolean';
	}

	else if ( first === 'n' ){
		// null
		result = null;
		json = null;
		t = "null";
	}

	else {
		// numbers
		result = Number(json);
		json = null;
		t = 'number';
	}

	console.log("result: "+ JSON.stringify(result) );
	return { val: result, json: json, t: t };
}
