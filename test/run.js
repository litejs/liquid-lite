process.chdir( process.argv[1].replace(/[^/]+$/, "") )

var found = 0
, failed = []
, fs = require("fs")
, liquid = require("../liquid-lite.js").liquid
, test_data = 
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


function test_file(err, source) {
	var result = liquid(source)(test_data)

	fs.readFile(file, 'utf8', test_file)
	console.log("result\n", result)

}

fs.readdir(".", function(err, files) {
	var source, result, result_file
	for (var i = 0, file; file = files[i++];) {
		if (file.slice(-7) == ".liquid") {
			result_file = file.slice(0, -7) + ".result"

			source = fs.readFileSync(file, "utf8")
			result = liquid(source)(test_data)

			if (fs.existsSync(result_file)) {
				found++
				if (fs.readFileSync(result_file, "utf8") != result) failed.push(file)
			} else {
				fs.writeFileSync(result_file, result, "utf8")
				console.log("NEW TEST: " + file + "\n" + source + "\nRESULT:\n" + result)
			}
		}
	}

	console.log(found + " tests found, " + failed.length + " failed.")
	if (failed.length) throw failed.join("\n")
})


