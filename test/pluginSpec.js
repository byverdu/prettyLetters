/* global prettyLetters, chai, sinon */
var { expect } = chai;
var pretty;
var stub;

before( function() {
  stub = sinon.spy( prettyLetters );
  pretty = stub( 'h3' );
});

describe( 'PrettyLetter Plugin', function() {
  it( 'is defined', function() {
    expect( stub ).not.eq( undefined );
    expect( stub.called ).to.eq( true );
  });
  it( 'should be called with a css selector', function() {
    stub( 'h3' );
    expect( stub.calledWith( 'h3' )).to.eq( true );
  });
  it( 'should throw an error for an empty css selector', function() {
    expect(() =>  stub()).to.have.throw( 'EmptySelectorError, prettyLetters was called without any CSS selector' );
  });
  it( 'should throw an error for a non valid css selector', function() {
    expect(() =>  stub( 'lol' )).to.have.throw( 'WrongSelectorError, prettyLetters was called with a mismatched CSS selector' );
  });
});
