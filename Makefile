

include package.mk


.PHONY: test

all: compile update-readme test

compile:
	# Call Google Closure Compiler to produce a minified version
	@curl -s \
		    --data-urlencode 'output_info=compiled_code' \
				--data-urlencode 'output_format=text' \
				--data-urlencode 'js_code@$(FILE)' \
				'http://closure-compiler.appspot.com/compile' > $(FILE_MIN)

update-readme: SIZE=$(shell cat $(FILE_MIN) | wc -c)
update-readme: SIZE_GZ=$(shell gzip -c $(FILE_MIN) | wc -c)
update-readme:
	@printf "Original Size %s Compiled Size %s or %s gzipped\n" \
	        "$$(cat $(FILE) | wc -c) bytes" \
	        "$(SIZE) bytes" \
	        "$(SIZE_GZ) bytes"
	@sed -i '/ bytes or .* gzipped/s/.*/($(SIZE) bytes or $(SIZE_GZ) bytes gzipped)/' README.md 

error:
	@curl -s \
		    --data-urlencode 'output_info=errors' \
				--data-urlencode 'output_format=text' \
				--data-urlencode 'js_code@$(FILE)' \
				'http://closure-compiler.appspot.com/compile'

test:
	@node test/run.js

