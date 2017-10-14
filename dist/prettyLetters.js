// prettyLetters plugin

var utils = {
  emptySelectorError: 'EmptySelectorError, prettyLetters was called without any CSS selector',
  wrongSelectorError: 'WrongSelectorError, prettyLetters was called with a mismatched CSS selector',
  hasWhiteSpace: function( sentence ) {
    return sentence.indexOf( ' ' ) > -1;
  },
  splitText: function( word ) {
    return word.split( '' );
  },
  splitTextWhiteSpace: function( sentence ) {
    return sentence.split( ' ' )
    .map( function ( word ) { return word.split( '' );});
  },
  createElement: function(
    tag,
    className,
    content
  ) {
    var tempTag = document.createElement( tag );
    tempTag.textContent = content;
    tempTag.className = className;
    return tempTag;
  },
  createElementsGroup: function(
    sentence,
    createElement,
    opts
  ) {
    var count = 0;
    var result = [];
    while ( count < sentence.length ) {
      var groupName = opts.groupClass + count;
      var groupTag = createElement(
        opts.groupTag,
        groupName,
        ''
      );
      var temp = sentence[ count ].map( function ( item, index ) {
        var className = opts.charClass + index;
        return createElement(
          opts.charTag,
          className,
          item
        );
      });
      temp.forEach( function( elem ) {
        groupTag.appendChild( elem );
      });
      result.push( groupTag );
      count += 1;
    }
    return result;
  },
  createNewContent: function(
    element,
    content
  ) {
    element.innerHTML = '';
    content.forEach( function( elem ) {
      element.appendChild( elem );
    });
  },
  createOptions: function( opts ) {
    var options = opts || {};
    options.charClass = options.charClass || 'char-';
    options.groupClass = options.groupClass || 'group-';
    options.groupTag = options.groupTag || 'span';
    options.charTag = options.charTag || 'span';

    return options;
  }
};

function prettyLetters(
  selector,
  opts
) {
  // setting default options
  var options = utils.createOptions( opts );
  // emptySelectorError
  if ( !selector ) {
    throw new Error( utils.emptySelectorError );
  }

  var elements = document.querySelectorAll( selector );
  // wrongSelectorError
  if ( elements.length === 0 ) {
    throw new Error( utils.wrongSelectorError );
  }

  [].forEach.call( elements, function( element ) {
    var trimmedText = element.textContent.trim();
    if ( utils.hasWhiteSpace( trimmedText )) {
      var whiteSpaceText = utils.splitTextWhiteSpace( trimmedText );
      var tempSpanWhiteSpace = utils.createElementsGroup(
        whiteSpaceText,
        utils.createElement,
        options
      );

      utils.createNewContent( element, tempSpanWhiteSpace );
    } else {
      var textSplit = utils.splitText( trimmedText );
      var tempSpan = textSplit.map( function( text, index ) {
        var className = options.charClass + index;
        return utils.createElement(
          options.charTag,
          className,
          text
        );
      });

      utils.createNewContent(
        element,
        tempSpan
      );
    }
  });
}
