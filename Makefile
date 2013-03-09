
.PHONY: test


all: compile
all: SIZE=$(shell cat liquid-lite.min.js | wc -c)
all: SIZE_GZ=$(shell gzip -c liquid-lite.min.js | wc -c)
all:
	@printf "Original Size %s Compiled Size %s or %s gzipped\n" \
	        "$$(cat liquid-lite.js | wc -c) bytes" \
	        "$(SIZE) bytes" \
	        "$(SIZE_GZ) bytes"
	@sed -i '/ bytes or .* gzipped/s/.*/($(SIZE) bytes or $(SIZE_GZ) bytes gzipped)/' README.md 

compile:
	# Call Google Closure Compiler to produce a minified version
	@curl -s \
		    --data-urlencode 'output_info=compiled_code' \
				--data-urlencode 'output_format=text' \
				--data-urlencode 'js_code@liquid-lite.js' \
				'http://closure-compiler.appspot.com/compile' > liquid-lite.min.js

error:
	@curl -s \
		    --data-urlencode 'output_info=errors' \
				--data-urlencode 'output_format=text' \
				--data-urlencode 'js_code@liquid-lite.js' \
				'http://closure-compiler.appspot.com/compile'

test:
	@node test/run.js

