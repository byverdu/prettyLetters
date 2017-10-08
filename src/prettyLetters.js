// prettyLetters plugin

// var emptySelectorError = 'EmptySelectorError, prettyLetters was called without any CSS selector';
// var wrongSelectorError = 'WrongSelectorError, prettyLetters was called with a mismatched CSS selector';

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
  createElement: function( tag, content, className ) {
    var tempTag = document.createElement( tag );
    tempTag.textContent = content;
    tempTag.className = className;
    return tempTag;
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
    const spanTag = utils.createElement( 'span', 'A', 'char-0' );
    expect( spanTag.nodeName ).to.eq( 'SPAN' );
    expect( spanTag.textContent ).to.eq( 'A' );
    expect( spanTag.className ).to.eq( 'char-0' );
  });
});
/* end-dev-code */

