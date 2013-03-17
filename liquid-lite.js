


/*
* @version  0.1.3-dev
* @author   Lauri Rooden - https://github.com/litejs/liquid-lite
* @license  MIT License  - http://lauri.rooden.ee/mit-license.txt
*/



!function(root, S) {

	function liquid(s) {
		s = s
		.replace(/\r?\n/g, "\\n")
		.replace(/{{((?:[^}]|}(?!}))+)}}/g, function(_, a) {
			return "',(" + a.replace(/([^|])\|\s*([^|\s:]+)(?:\s*\:([^|]+))?/g, "$1).$2($3") + "),'"
		})
		.replace(/{%\s*(for|if|elsif)?\s*(\!?)\s*((?:[^%]|%(?!}))+)%}\\n?/g, function(_, a, c, b) {
			if (a == "for") {
				if (_ = b.match(/^(\w+) in (\w+)?(.*)/)) {
					a = "var loop={i:0,offset:0},_0=loop,_2=o."+_[2]
						+ _[3].replace(/^ (limit|offset):\s*(\d+)/ig, ";_0.$1=$2")
						+ ";if(_2)for"
					_ = "_1 in _2)if(_2.hasOwnProperty(_1)){if(_0.offset&&_0.offset--)continue;_0.i++;if(_0.limit&&_0.i-_0.offset>_0.limit)break;_0.key=_1;var "+_[1]+"=_2[_1];"
				} else _ = b+"){"
				_ = "');"+a+"(var "+_
			} else if (a) {
				_ = "')"+(a == "if" ? ";" : "}else ")+"if("+c+"("+b.replace(/^[\w]+\s*$/, "o.$&")+")){"
			} else {
				_ = b == "else " ? "')}else{" : "')};"
			}
			return _ + "_.push('"
		})

		return new Function("o", "var _=[];with(o||{}){_.push('" + s + "')}return _.join('')")
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



