


/*
* @version  0.1.3
* @author   Lauri Rooden - https://github.com/litejs/liquid-lite
* @license  MIT License  - http://lauri.rooden.ee/mit-license.txt
*/



!function(root, S) {

	function liquid(source) {
		var var_names = {"_=[]":1}
		source = source
		.replace(/\r?\n/g, "\\n")
		.replace(/{{\s*((?:[^}]|}(?!}))+)}}/g, function(_, a) {
			var_names[a.match(/^\w+/)]=1
			return "',(" + a.replace(/([^|])\|\s*([^|\s:]+)(?:\s*\:([^|]+))?/g, "$1).$2($3") + "),'"
		})
		.replace(/{%\s*(for|if|elsif)?\s*(\!?)\s*((?:[^%]|%(?!}))+)%}\\n?/g, function(_, a, c, b) {
			if (a == "for") {
				if (_ = b.match(/^(\w+) in ([\w\.]+)?(.*)/)) {
					a = "var loop={i:0,offset:0},_3=loop,_2="
					  + (_[2]?"_0."+_[2]+"||{}":"")
						+ _[3].replace(/ (limit|offset):\s*(\d+)/ig, ";_3.$1=$2")
						+ ";if(_2)for"
					_ = "_1 in _2)if(_2.hasOwnProperty(_1)&&!(_3.offset&&_3.offset--)){_3.i++;if(_3.limit&&_3.i-_3.offset>_3.limit)break;_3.key=_1;var "+_[1]+"=_2[_1];"
				} else _ = b+"){"
				_ = "');"+a+"(var "+_
			} else if (a) {
				var_names[b.match(/^\w+/)]=1
				_ = "')"+(a == "if" ? ";" : "}else ")+"if("+c+"("+b+")){"
			} else {
				_ = b == "else " ? "')}else{" : "')};"
			}
			return _ + "_.push('"
		})
		delete var_names["null"]

		return new Function("_0", "var "+Object.keys(var_names).join(",")+";with(_0||{}){_.push('" + source + "')}return _.join('')")
	}

	root.liquid = liquid


	// Liquid Standard Filters
	/*
		date - reformat a date syntax reference
		capitalize - capitalize words in the input sentence
		downcase - convert an input string to lowercase
		upcase - convert an input string to uppercase
		first - get the first element of the passed in array
		last - get the last element of the passed in array
		join - join elements of the array with certain character between them
		sort - sort elements of the array
		map - map/collect an array on a given property
		size - return the size of an array or string
		escape - escape a string
		escape_once - returns an escaped version of html without affecting existing escaped entities
		strip_html - strip html from string
		strip_newlines - strip all newlines (\n) from string
		newline_to_br - replace each newline (\n) with html break
		replace - replace each occurrence e.g. {{ 'foofoo' | replace:'foo','bar' }} #=> 'barbar'
		replace_first - replace the first occurrence e.g. {{ 'barbar' | replace_first:'bar','foo' }} #=> 'foobar'
		remove - remove each occurrence e.g.{{ 'foobarfoobar' | remove:'foo' }} #=> 'barbar'`
		remove_first - remove the first occurrence e.g. {{ 'barbar' | remove_first:'bar' }} #=> 'bar'
		truncate - truncate a string down to x characters
		truncatewords - truncate a string down to x words
		prepend - prepend a string e.g. {{ 'bar' | prepend:'foo' }} #=> 'foobar'
		append - append a string e.g. {{ 'foo' | append:'bar' }} #=> 'foobar'
		minus - subtraction e.g. {{ 4 | minus:2 }} #=> 2
		plus - addition e.g. {{ '1' | plus:'1' }} #=> '11', {{ 1 | plus:1 }} #=> 2
		times - multiplication e.gw {{ 5 | times:4 }} #=> 20
		divided_by - division e.g. {{ 10 | divided_by:2 }} #=> 5
		split - split a string on a matching pattern e.g. {{ "a~b" | split:~ }} #=> ['a','b']	
	*/
	S.upcase = S.toUpperCase
	S.downcase = S.toLowerCase
	S.size = function(){
		return this.length
	}


}(this, String.prototype)



