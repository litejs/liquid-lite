

NAME=$(shell sed '/"name":/!d;s///;s/[ ,"]//g' package.json)
FILE=$(shell sed '/"main":/!d;s///;s/[ ,"]//g' package.json)
VERSION=$(shell sed '/"version":/!d;s///;s/[ ,"]//g' package.json)

.PHONY: test

all: update-version compile test update-readme

compile:
	# Call Google Closure Compiler to produce a minified version of $(FILE)
	@curl -s \
		    --data-urlencode 'output_info=compiled_code' \
				--data-urlencode 'output_format=text' \
				--data-urlencode 'js_code@$(FILE)' \
				'http://closure-compiler.appspot.com/compile' > min.js

update-readme: SIZE=$(shell cat min.js | wc -c)
update-readme: SIZE_GZ=$(shell gzip -c min.js | wc -c)
update-readme:
	@printf "Original Size %s Compiled Size %s or %s gzipped\n" \
	        "$$(cat $(FILE) | wc -c) bytes" \
	        "$(SIZE) bytes" \
	        "$(SIZE_GZ) bytes"
	@sed -i '/ bytes, .* gzipped/s/.*/($(SIZE) bytes, $(SIZE_GZ) bytes gzipped)/' README.md

update-readme-from-source:
	@sed -e '/\/\*/,/\*\//!d' -e 's,[ /]*\*[ /]\?,,' -e 's/^@/    @/' $(FILE) > README.md

update-version:
	@sed -i '/@version/s/[^ ]*$$/$(VERSION)/' $(FILE)

update-tests:
	@printf "$$(cat test/html.tpl)" "$$(for file in test/*.liquid; do printf '\n\n\n<script type="text/liquid">\n%s\n</script>' "$$(cat $$file)"; done)" > test/test.html

css-docs:
	@styledocco -n "$(NAME)" css

error:
	@curl -s \
		    --data-urlencode 'output_info=errors' \
				--data-urlencode 'output_format=text' \
				--data-urlencode 'js_code@$(FILE)' \
				'http://closure-compiler.appspot.com/compile'

test:
	@node test/run.js

