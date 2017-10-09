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
  createElement: function( tag, className, content ) {
    var tempTag = document.createElement( tag );
    tempTag.textContent = content;
    tempTag.className = className;
    return tempTag;
  },
  createElementsGroup: function( sentence, createElement ) {
    var count = 0;
    var result = [];
    while ( count < sentence.length ) {
      const span = createElement( 'span', `group-${count}`, '' );
      const temp = sentence[ count ].map(( item, index ) => {
        return createElement( 'b', `char-${index}`, item );
      });
      temp.forEach( elem => span.appendChild( elem ));
      result.push( span );
      count += 1;
    }
    return result;
  },
  createNewContent: function( element, content ) {
    element.innerHTML = '';
    content.forEach( function( elem ) {
      element.appendChild( elem );
    });
  }
};

function prettyLetters( selector ) {
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
    if ( utils.hasWhiteSpace( element.textContent )) {
      var whiteSpaceText = utils.splitTextWhiteSpace( element.textContent );
      var tempSpanWhiteSpace = utils.createElementsGroup( whiteSpaceText, utils.createElement );

      utils.createNewContent( element, tempSpanWhiteSpace );
    } else {
      var textSplit = utils.splitText( element.textContent );
      var tempSpan = textSplit.map( function( text, index ) {
        var className = 'char-' + index;
        return utils.createElement( 'span',  className, text );
      });

      utils.createNewContent( element, tempSpan );
    }
  });
}

/* dev-code */
var stub;
var utilsMock;

before( function() {
  stub = sinon.spy( prettyLetters );
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

