
[1]: https://github.com/Shopify/liquid/ "Shopify in github"
[2]: https://raw.github.com/litejs/liquid-lite/master/test/test.html "test/test.html"
[3]: https://raw.github.com/litejs/liquid-lite/master/liquid-lite.min.js
[4]: https://raw.github.com/litejs/liquid-lite/master/liquid-lite.js

Liquid template engine
======================

Lite version of Liquid markup template engine writen in javascript.
Download [compressed][3] 
(924 bytes or 594 bytes gzipped)
or [uncompressed][4] source.

Full version in ruby is available [by Shopify][1]


## What does it look like?

```html
<ul class="products">
  {% for product in products limit:5 %}
    <li>
      <h2>{{ product.title | upcase }}</h2>
      Only {{ product.price }}
      <p>{{ product.description }}</p>
    </li>
  {% endfor %}

  {% for product in products offset:5 %}
    <li>{{ product.title }} {{ product.price }}</li>
  {% endfor %}
</ul>
```

See [test.html][2] for more examples

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


