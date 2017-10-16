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
  },
  runProgramBlock: function( options, element, methods ) {
    var trimmedText = element.textContent.trim();
    if ( methods.hasWhiteSpace( trimmedText )) {
      var whiteSpaceText = methods.splitTextWhiteSpace( trimmedText );
      var tempSpanWhiteSpace = methods.createElementsGroup(
        whiteSpaceText,
        methods.createElement,
        options
      );

      methods.createNewContent( element, tempSpanWhiteSpace );
    } else {
      var textSplit = methods.splitText( trimmedText );
      var tempSpan = textSplit.map( function( text, index ) {
        var className = options.charClass + index;
        return methods.createElement(
          options.charTag,
          className,
          text
        );
      });

      methods.createNewContent(
        element,
        tempSpan
      );
    }
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

  if ( typeof jQuery === 'undefined' ) {
    var elements = document.querySelectorAll( selector );
    // wrongSelectorError
    if ( elements.length === 0 ) {
      throw new Error( utils.wrongSelectorError );
    }
    [].forEach.call( elements, function( element ) {
      utils.runProgramBlock( options, element, utils );
    });
  } else {
    var $elem = $( selector );
    if ( $elem.length === 0 ) {
      throw new Error( utils.wrongSelectorError );
    }
    $.each( $elem, function( index, $element ) {
      utils.runProgramBlock( options, $element, utils );
    });
  }
}

// jQuery setup
if ( typeof jQuery !== 'undefined' ) {
  $.fn.prettyLetters = function( options ) {
    var pluginName = 'prettyLetters';
    var dataKey = 'plugin_' + pluginName;
    return this.each( function() {
      if ( !$.data( this, dataKey )) {
        $.data( this, dataKey, prettyLetters( this, options ));
      }
    });
  };
}

// Browser setup
if ( !( 'prettyLetters' in window )) {
  window.prettyLetters = prettyLetters;
}

// CommonJS support
if ( typeof module === 'object' && typeof module.exports === 'object' ) {
  module.exports = prettyLetters;
}

/* dev-code */
var utilsMock;

before( function() {
  var utilsMock = utils;
});

describe( 'Utils', function() {
  it( 'is defined', function() {
    expect( utils ).to.not.eq( undefined );
    expect( utils ).and.be.an( 'Object' );
  });
  it( 'has the errors properties', function() {
    expect( utils ).to.property( 'emptySelectorError' ).and.eq( 'EmptySelectorError, prettyLetters was called without any CSS selector' );
    expect( utils ).to.property( 'wrongSelectorError' ).and.eq( 'WrongSelectorError, prettyLetters was called with a mismatched CSS selector' );
  });
  it( 'has a hasWhiteSpace property', function() {
    expect( utils ).to.have.property( 'hasWhiteSpace' )
      .and.is.a( 'Function' );
  });
  it( 'hasWhiteSpace, checks if a string has white space', function() {
    expect( utils.hasWhiteSpace( 'single' )).to.eq( false );
    expect( utils.hasWhiteSpace( 'single single' )).to.eq( true );
  });
  it( 'has a splitText property', function() {
    expect( utils ).to.have.property( 'splitText' )
      .and.is.a( 'Function' );
  });
  it( 'splitText, split a word into letters', function() {
    expect( utils.splitText( 'single' )).to.eql(['s', 'i', 'n', 'g', 'l', 'e']);
  });
  it( 'has a splitTextWhiteSpace property', function() {
    expect( utils ).to.have.property( 'splitTextWhiteSpace' )
      .and.is.a( 'Function' );
  });
  it( 'splitTextWhiteSpace, split a word into letters', function() {
    expect( utils.splitTextWhiteSpace( 'single single' )).to.eql([['s', 'i', 'n', 'g', 'l', 'e'], ['s', 'i', 'n', 'g', 'l', 'e']]);
  });
  it( 'has a createElement property', function() {
    expect( utils ).to.have.property( 'createElement' )
      .and.is.a( 'Function' );
  });
  it( 'createElement, creates elements for the parameter passed', function() {
    const spanTag = utils.createElement( 'span', 'char-0', 'A' );
    expect( spanTag.nodeName ).to.eq( 'SPAN' );
    expect( spanTag.textContent ).to.eq( 'A' );
    expect( spanTag.className ).to.eq( 'char-0' );
  });
});
/* end-dev-code */

