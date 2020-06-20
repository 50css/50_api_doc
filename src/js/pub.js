//数组里是否存在某个值
function inArray(value,arr){
	for(var i in arr){
		if(arr[i] == value)return true;
	}
	return false;
}

//格式化日期时间
function convertDate(dateValue,isShort){
	var date;
	if(typeof dateValue == 'object'){
		date = dateValue;
	}else{
		date = new Date(dateValue);
	}
	Y = date.getFullYear() + '-';
	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	D = (date.getDate()+1  < 10 ? '0'+date.getDate()  : date.getDate())  + ' ';
	if(isShort){
		return Y+M+D;
	}else{
		h = date.getHours() + ':';
		m = date.getMinutes() + ':';
		s=  (date.getSeconds() < 10 ? '0'+ date.getSeconds()  : date.getSeconds());
		return Y+M+D+h+m+s;
	}
}

// 格式化json字符串
function formatJson(json, options) {
	var reg = null,
		formatted = '',
		pad = 0,
		PADDING = '    '; // one can also use '\t' or a different number of spaces
	// optional settings
	options = options || {};
	// remove newline where '{' or '[' follows ':'
	options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
	// use a space after a colon
	options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

	// begin formatting...

	// make sure we start with the JSON as a string
	if (typeof json !== 'string') {
		json = JSON.stringify(json);
	}
	// parse and stringify in order to remove extra whitespace
	json = JSON.parse(json);
	json = JSON.stringify(json);

	// add newline before and after curly braces
	reg = /([\{\}])/g;
	json = json.replace(reg, '\r\n$1\r\n');

	// add newline before and after square brackets
	reg = /([\[\]])/g;
	json = json.replace(reg, '\r\n$1\r\n');

	// add newline after comma
	reg = /(\,)/g;
	json = json.replace(reg, '$1\r\n');

	// remove multiple newlines
	reg = /(\r\n\r\n)/g;
	json = json.replace(reg, '\r\n');

	// remove newlines before commas
	reg = /\r\n\,/g;
	json = json.replace(reg, ',');

	// optional formatting...
	if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
		reg = /\:\r\n\{/g;
		json = json.replace(reg, ':{');
		reg = /\:\r\n\[/g;
		json = json.replace(reg, ':[');
	}
	if (options.spaceAfterColon) {
		reg = /\:/g;
		json = json.replace(reg, ': ');
	}

	var arr = json.split('\r\n');
	for (var index = 0; index < arr.length; index++) {
		var node = arr[index];
		var i = 0,
			indent = 0,
			padding = '';

		if (node.match(/\{$/) || node.match(/\[$/)) {
			indent = 1;
		} else if (node.match(/\}/) || node.match(/\]/)) {
			if (pad !== 0) {
				pad -= 1;
			}
		} else {
			indent = 0;
		}

		for (i = 0; i < pad; i++) {
			padding += PADDING;
		}
		formatted += padding + node + '\r\n';
		pad += indent;
	}

	return formatted.trim();
};