# PrettyLetters

PrettyLetters is a Javascript plugin highly inspired by Lettering.js, why do not use the other one? because that one it is only available for jQuery and it is not registered in npm.

Basically what this plugin does is to give you the ability and freedom to style any HTML tag that has some text.

# How to use the plugin

You will only need `prettyLetters.min.js`.

You can grab them on unpkg CDN and use it like this:

```xml
<!-- Only if using it with jQuery -->
<script src="https://code.jquery.com/jquery-3.1.1.js"></script>
<script src="https://unpkg.com/pretty-letters@1.0.0/dist/prettyLetters.min.js"></script>  
```

or find it under `/dist/**` folder and use it like this:

```xml
<!-- Only if using it with jQuery -->
<script src="https://code.jquery.com/jquery-3.1.1.js"></script>
<script src="prettyLetters.min.js"></script>  
```

or use npm to install the plugin and require the module within your project.

```javascript
const prerttyLetters = require( 'pretty-letters' );

prettyLetters( 'h2.title', {options});
```

## How?

When you pass any CSS selector to the function `prettyLetters('.myClass')` it will split the text in words and wrap individual of those with another HTML tag so you have absolute control over the text.

```xml
<!-- Let's say you have this markup -->
<h2 class="foo">Foo</h2>
<script>
  prettyLetters('.foo');
</script>
<!-- After call the method the result would be  -->
<h2 class="foo">
  <span class="char-0">F</span>
  <span class="char-1">o</span>
  <span class="char-2">o</span>
</h2>

<!-- What about a text with sapces? -->
<h2 class="fooBar">Foo Bar</h2>
<script>
  prettyLetters('.fooBar');
</script>
<!-- After call the method the result would be  -->
<h2 class="fooBar">
  <span class="group-0">
    <span class="char-0">F</span>
    <span class="char-1">o</span>
    <span class="char-2">o</span>
  </span>
  <span class="group-1">
    <span class="char-0">B</span>
    <span class="char-1">a</span>
    <span class="char-2">r</span>
  </span>
```

The plugin is set with some default options that can be overwritten by passing an object as second argument to the function.

The possible options are for the CSS classes and HTML wrapper elements that will generate the function.

```js
// default values
var options = {
  charClass: 'char-',
  groupClass: 'group-',
  charTag: 'span',
  groupTag: 'span',
};

prettyLetters( 'selector', options);
```

That is pretty much what this plugin can do.