this.liquid=function(c){function e(a,b){(a=a.match(/^[a-z]\w*/))&&!/^(new|typeof)$/.test(a)&&(f[b?a+"={}":a+'=""']=1)}var f={"_=[]":1};c=c.replace(/\r?\n/g,"\\n").replace(/{{(.+?)}}/g,function(a,b){e(b);return"',("+b.replace(/([^|])\|\s*(\w+)(?:\s*\:([^|]+))?/g,"$1).$2($3")+"),'"}).replace(/{%\s*(for|if|elsif)?\s*(\!?)\s*(.+?)%}(?:\\n)?/g,function(a,b,c,d){"for"==b?((a=d.match(/^(\w+) in (\w*)(.*)/))?(b="var loop={i:0,offset:0},_3=loop,_2="+a[2]+a[3].replace(/ (limit|offset):\s*(\d+)/ig,";_3.$1=$2")+
";if(_2)for",a="_1 in _2)if(_2.hasOwnProperty(_1)&&!(_3.offset&&_3.offset--)){_3.i++;if(_3.limit&&_3.i-_3.offset>_3.limit)break;_3.key=_1;var "+a[1]+"=_2[_1];",e(a[2],1)):a=d+"){",a="');"+b+"(var "+a):b?(e(d),a="')"+("if"==b?";":"}else ")+"if("+c+"("+d+")){"):a="else "==d?"')}else{":"')};";return a+"_.push('"});return new Function("_0","var "+Object.keys(f).join(",")+";with(_0||{}){_.push('"+c+"')}return _.join('')")};
