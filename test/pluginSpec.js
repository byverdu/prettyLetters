/* global prettyLetters, chai, sinon */
var { expect } = chai;
var pretty;
var stub;

before( function() {
  stub = sinon.spy( prettyLetters );
  pretty = stub();
});

describe( 'PrettyLetter Plugin', function() {
  it( 'is defined', function() {
    expect( stub ).not.eq( undefined );
    expect( stub.called ).to.eq( true );
  });
});

