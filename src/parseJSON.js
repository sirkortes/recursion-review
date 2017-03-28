// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here

  // take the first char
  // array, object, string, t or f, n, numbers
  
  

  var digested = digest(json);
  var result = digested.val;
  json = digested.json;
  
  if ( digested.t === 'array'){
  	// split somehow and get it's elements
  	var element;

 	while (json) {
 		[element, json] = getValue(json);
 		result.push(element);
 	}
  } 

  else if ( digested.t === 'object' ){

  	// grab the keys and values
  	// digest each
  	var key;
  	var value;

  	while (json && json.indexOf(':') !== -1) {
	  	// keys will be string up to first :
	  	[key, json] = getKey(json);
	  	// update str
	  	// value will be string up to ,
	  	[value, json] = getValue(json);
  		result[key] = value;
	}

  } else if (digested.t === 'string') {
  		// not needed
  }

  console.log("result: " + result);
  console.log("result stringified: " + JSON.stringify(result));
  console.log("")
  return result;
};

var getKey = function(json){
	// gets the key
	// updates json
	var colon = json.indexOf(':');
	var key = json.slice(0,colon);
	key = parseJSON(key);
	json = json.slice(colon+1);

	return [ key, json ];
}

var getValue = function(json) {
	// gets the value
	// updates json
	var comma = json.indexOf(',');
	var value;
	if (comma === -1) {
		console.log('no commas', json);
		value = json;
		json = null;
	} else {
		console.log('else', json)
		value = json.slice(0, comma);
		json = json.slice(comma + 1);
	}

	return [ value, json ];
}

var digest = function(json){
	// return updated container, updated json
	var first = json[0];
	var result;
	var t;

	if ( first === '['){
		// its array
		result = [];
		json = json.slice(1, json.length - 1);
		t = "array";
	}

	else if ( first === '{'){
		//  object
		result = {};
		json = json.slice(1, json.length - 1);
		t = "object";
	}

	else if ( first === '"' ){
		// string
		// result = '"' + json + '"';
		result = json;//.slice(1, json.length -1);
		json = null;
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
