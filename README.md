
[1]: https://github.com/Shopify/liquid/ "Shopify in github"
[2]: https://raw.github.com/litejs/liquid-lite/master/test/test.html "test/test.html"
[3]: https://raw.github.com/litejs/liquid-lite/master/min.js
[4]: https://raw.github.com/litejs/liquid-lite/master/liquid-lite.js
[5]: https://github.com/darthapo/liquid.js
[date-format-lite]: http://www.litejs.com/date-format-lite/
[liquid-filters-lite]: http://www.litejs.com/liquid-filters-lite/

Liquid template engine
======================

This is a not complete port of [Liquid][1] template engine.
Download [compressed][3] 
(930 bytes, 584 bytes gzipped)
or [uncompressed][4] source.
A complete port is available [by darthapo][5].

[![Build Status](https://travis-ci.org/litejs/liquid-lite.png?branch=master)](https://travis-ci.org/litejs/liquid-lite)

## When to use liquid-lite

- When you trust your templates


## How to use in browser

```html
<script src=liquid-lite.js></script>

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

## Tags

### if / elsif / else

```javascript
{% if user %}
  Hello {{ user.name }}
{% endif %}
{% if user.name == "bob" %}
  Hello Bob
{% endif %}
```

### for

```javascript
{% for product in products %}
  {{ product.title }}
{% endfor %}

{% for i = 3; i > 0; i-- %}
  {{ i }}
{% endfor %}

{% for item in ["a", "b", "c"] %}
  {{ item }}
{% endfor %}
```

The following helper variables are available:

-   loop.key - named key when iterated over Object
-   loop.i - index

## Liquid Filters

Standard Filters are not implemented by default 
but you have access to prototypes.
Make as many as you need
or use [liquid-filters-lite][].

- **date** - reformat a date syntax reference  
    Implemented in [date-format-lite][]
    ```javascript
    var item = { "timestamp": 1363770186, "datetime": "2013-03-20T09:03:06Z" }
    {{ timestamp | date:"isoUtcDateTime" }}
    {{ datetime | date:"hh:mm" }}
    ```

- **capitalize** - capitalize words in the input sentence
    ```javascript
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1)
    }
    ```

- **downcase** - convert an input string to lowercase
    ```javascript
    String.prototype.downcase = String.prototype.toLowerCase
    ```

See [liquid-filters-lite][] for more examples

## Notes

-   You can access to properties named by reserved words thru _0 object,
    `{% for val in _0["enum"] %}`.

### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


