# PrettyLetters

PrettyLetters is a Javascript plugin highly inspired by Lettering.js, why do not use the other one? because that one it is only available for jQuery and it is not registered in npm.

Basically what this plugin does is to give you the ability and freedom to style any HTML tag that has some text.

# How to use the plugin

You will only need `prettyLetters.min.js`.

You can grab them on `unpkg CDN` and use it like this:

```xml
<!-- Only if using it with jQuery -->
<script src="https://code.jquery.com/jquery-3.1.1.js"></script>
<script src="https://unpkg.com/pretty-letters@check_latest_version/dist/prettyLetters.min.js"></script>  
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

When you pass any CSS selector to the function `prettyLetters('.myClass')` it will split the text in letters and wrap each one of those with another HTML tag so you have absolute control over the text.

```xml
<!-- Let's say you have this markup -->
<h2 class="foo">Foo</h2>
<script>
  prettyLetters('.foo');
  
  // the jQuery version would be
  $( '.foo' ).prettyLetters();
</script>
<!-- After the method is called the result would be  -->
<h2 class="foo">
  <span class="char-0">F</span>
  <span class="char-1">o</span>
  <span class="char-2">o</span>
</h2>

<!-- What about a text with spaces? -->
<h2 class="fooBar">Foo Bar</h2>
<script>
  prettyLetters('.fooBar');
  // the jQuery version would be
  $( '.fooBar' ).prettyLetters();
</script>
<!-- After the method is called the result would be  -->
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
</h2>

<!-- Handles a couple of errors if something goes wrong. -->
<h2 class="fooBar">Foo Bar</h2>
<script>
  prettyLetters('.barFoo');
  // Will throw Error => 'WrongSelectorError, prettyLetters was called with a mismatched CSS selector'

  prettyLetters();
  // Will throw Error => 'EmptySelectorError, prettyLetters was called without any CSS selector'
</script>
```

### How to use it with React

```js
const prettyLetter = require( 'pretty-letters' );

class App extends Component {
  componentDidMount() {
    var options = {
      groupClass: 'lol-',
      groupTag: 'div'
    };
    prettyLetter( 'h1', options );
  }
  render() {
    return(
      <div>
        <h1>Helllo World</h1>
      </div>
    );
  }
}
```

### How to use it with Angular

```xml
<body ng-app="playground">
  <section ng-controller="angularCtrl">
    <h1 class="selector" pretty-letter=".selector">
      {{title}}
    </h1>
  </section>
</body>
```

```js
const prettyLetter = require( 'pretty-letters' );

angular.module('playground', [])
  .directive('prettyLetter', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        // attrs['prettyLetter'] === '.selector'
        $timeout(function() {
          prettyLetter(
            attrs['prettyLetter'],
            scope.prettyLetterOpts
          );
        })
      }
    };
  })
  .controller('angularCtrl', function ( $scope ) {
    $scope.title = 'prettyForm in Angular';
    $scope.prettyLetterOpts = {
      groupClass: 'lol-',
      groupTag: 'div'
    };
  });
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

// the jQuery version would be
$( 'selector' ).prettyLetters( options );
```

That is pretty much what this plugin can do.
