<script src="../liquid-lite.min.js"></script>

%s

<div id=result></div>

<script>
	var el
	, i = 0
	, out = []
	, list = document.getElementsByTagName("script")
	, data = 
		{ products:
			[ { title: "Product A", price: 1.01, description: "Hello" }
			, { title: "Product B", price: 1.02, description: "Hello" }
			, { title: "Product C", price: 1.03, description: "Hello" }
			, { title: "Product D", price: 1.04, description: "Hello" }
			, { title: "Product E", price: 1.05, description: "Hello" }
			, { title: "Product F", price: 1.06, description: "Hello" }
			, { title: "Product G", price: 1.07, description: "Hello" }
			, { title: "Product H", price: 1.08, description: "Hello" }
			, { title: "Product I", price: 1.09, description: "Hello" }
			, { title: "Product J", price: 1.10, description: "Hello" }
			]
		, user: { name: "tobi", age: 19 }
		, deeper: { object: { key: "value" } }
		, array: [ 1, 2, 3 ]
		, string: "hello world"
		}

	while (el = list[i++]) if (el.type == "text/liquid") {
		out.push(liquid(el.innerHTML)(data))
	}

	document.getElementById("result").innerHTML = out.join("<hr>")

</script>



