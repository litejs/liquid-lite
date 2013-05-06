


/*
* @version  0.2.4
* @author   Lauri Rooden - https://github.com/litejs/liquid-lite
* @license  MIT License  - http://lauri.rooden.ee/mit-license.txt
*/



/*
* _this_ is _exports_ in NodeJS and _window_ in browser,
* so it works in both places.
*/

this.liquid =	function(source) {
	var var_names = {"_=[]":1}
	function add_name(s, obj) {
		s = s.match(/^[a-z]\w*/)
		if (s && !/^(new|typeof)$/.test(s)) var_names[ obj ? s+'={}' : s+'=""' ] = 1
	}
	source = source
	.replace(/\r?\n/g, "\\n")
	.replace(/{{(.+?)}}/g, function(_, a) {
		add_name(a)
		return "',(" + a.replace(/([^|])\|\s*(\w+)(?:\s*\:([^|]+))?/g, "$1).$2($3") + "),'"
	})
	.replace(/{%\s*(for|if|elsif)?\s*(\!?)\s*(.+?)%}(?:\\n)?/g, function(_, tag, negation, rest) {
		if (tag == "for") {
			if (_ = rest.match(/^(\w+) in (\w*)(.*)/)) {
				tag = "var loop={i:0,offset:0},_3=loop,_2="
					+ _[2]
					+ _[3].replace(/ (limit|offset):\s*(\d+)/ig, ";_3.$1=$2")
					+ ";if(_2)for"
				_ = "_1 in _2)if(_2.hasOwnProperty(_1)&&!(_3.offset&&_3.offset--)){_3.i++;if(_3.limit&&_3.i-_3.offset>_3.limit)break;_3.key=_1;var "+_[1]+"=_2[_1];"
			  add_name(_[2], 1)
			} else _ = rest+"){"
			_ = "');"+tag+"(var "+_
		/*
		* tag equals if or elsif here
		*/
		} else if (tag) {
			add_name(rest)
			_ = "')"+(tag == "if" ? ";" : "}else ")+"if("+negation+"("+rest+")){"
		} else {
			_ = rest == "else " ? "')}else{" : "')};"
		}
		return _ + "_.push('"
	})

	return new Function("_0", "var "+Object.keys(var_names).join(",")+";with(_0||{}){_.push('" + source + "')}return _.join('')")
}


/*
* Liquid Filters are in https://github.com/litejs/liquid-filters-lite
*/



