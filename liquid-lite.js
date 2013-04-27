


/*
* @version  0.2.2
* @author   Lauri Rooden - https://github.com/litejs/liquid-lite
* @license  MIT License  - http://lauri.rooden.ee/mit-license.txt
*/



!function(root, S) {

	function liquid(source) {
		var var_names = {"_=[]":1}
		function add_name(s) {
			s = s.match(/^[a-z]\w+/)
			;/^(null|new|typeof|instanceof|void)$/.test(s) || (var_names[s+'=""']=1)
		}
		source = source
		.replace(/\r?\n/g, "\\n")
		.replace(/{{\s*((?:[^}]|}(?!}))+)}}/g, function(_, a) {
			add_name(a)
			return "',(" + a.replace(/([^|])\|\s*([^|\s:]+)(?:\s*\:([^|]+))?/g, "$1).$2($3") + "),'"
		})
		.replace(/{%\s*(for|if|elsif)?\s*(\!?)\s*((?:[^%]|%(?!}))+)%}(?:\\n)?/g, function(_, a, c, b) {
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
				add_name(b)
				_ = "')"+(a == "if" ? ";" : "}else ")+"if("+c+"("+b+")){"
			} else {
				_ = b == "else " ? "')}else{" : "')};"
			}
			return _ + "_.push('"
		})

		return new Function("_0", "var "+Object.keys(var_names).join(",")+";with(_0||{}){_.push('" + source + "')}return _.join('')")
	}

	root.liquid = liquid


	/*
	* Liquid Filters are in https://github.com/litejs/liquid-filters-lite
	*/

}(this)



