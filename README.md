
[1]: https://github.com/Shopify/liquid/ "Shopify in github"
[2]: https://raw.github.com/litejs/liquid-lite/master/test/test.html "test/test.html"
[3]: https://raw.github.com/litejs/liquid-lite/master/liquid-lite.min.js
[4]: https://raw.github.com/litejs/liquid-lite/master/liquid-lite.js
[5]: https://github.com/darthapo/liquid.js

Liquid template engine
======================

This is a not complete port of [Liquid][1] template engine.
Download [compressed][3] 
(1055 bytes or 666 bytes gzipped)
or [uncompressed][4] source.
A complete port is available [by darthapo][5].

### Currently supported tags

- if
- for

## When to use liquid-lite

- When you trust your templates


## How to use in browser

```html
<script src=liquid-lite.min.js></script>

<script id=products type="text/liquid">
<ul class="products">
  {% for product in products %}
    <li>
      <h2>{{ product.title | upcase }}</h2>
      Only {{ product.price }}
      <p>{{ product.description }}</p>
    </li>
  {% endfor %}
</ul>
</script>

<div id=page></div>

<script>
var template = liquid( document.getElementById("products").innerHTML )

var data = { products:
  [ { title: "Product A", price: 1.01, description: "Hello a" }
  , { title: "Product B", price: 1.02, description: "Hello b" }
  , { title: "Product C", price: 1.03, description: "Hello c" }
  ]
}

document.getElementById("page").innerHTML = template(data)
</script>
```

See [test.html][2] for more examples

## How to use in node.js

npm install liquid-lite

```javascript
var liquid = require("liquid-lite").liquid

var template = liquid( my_template_string )

var data = { products:
  [ { title: "Product A", price: 1.01, description: "Hello a" }
  , { title: "Product B", price: 1.02, description: "Hello b" }
  , { title: "Product C", price: 1.03, description: "Hello c" }
  ]
}

var output = template(data)
```

**Liquid Filters** are available thru prototypes.
Make as many as you need.

```javascript
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1)
}
String.prototype.upcase = String.prototype.toUpperCase
String.prototype.downcase = String.prototype.toLowerCase
String.prototype.size = function() {
	return this.length
}
Array.prototype.first = function() {
	return this[0]
}
```


### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


