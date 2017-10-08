// prettyLetters plugin

// var emptySelectorError = 'EmptySelectorError, prettyLetters was called without any CSS selector';
// var wrongSelectorError = 'WrongSelectorError, prettyLetters was called with a mismatched CSS selector';

var utils = {
  emptySelectorError: 'EmptySelectorError, prettyLetters was called without any CSS selector',
  wrongSelectorError: 'WrongSelectorError, prettyLetters was called with a mismatched CSS selector',
  hasWhiteSpace: function() {}
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
});
/* end-dev-code */

