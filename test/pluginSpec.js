/* global prettyLetters, chai, sinon */
var { expect } = chai;
var pretty;
var stub;

before( function() {
  stub = sinon.spy( prettyLetters );
  pretty = stub( '.empty' );
});

describe( 'PrettyLetters Plugin', function() {
  it( 'is defined', function() {
    expect( stub ).not.eq( undefined );
    expect( stub.called ).to.eq( true );
  });
  it( 'should be called with a css selector', function() {
    stub( '.empty' );
    expect( stub.calledWith( '.empty' )).to.eq( true );
  });
  it( 'should throw an error for an empty css selector', function() {
    expect(() =>  stub()).to.have.throw( 'EmptySelectorError, prettyLetters was called without any CSS selector' );
  });
  it( 'should throw an error for a non valid css selector', function() {
    expect(() =>  stub( 'lol' )).to.have.throw( 'WrongSelectorError, prettyLetters was called with a mismatched CSS selector' );
  });
  it( 'should split all letters for a word', function() {
    var oneElem = document.querySelector( '.single' );
    prettyLetters( '.single' );
    var letters = oneElem.querySelectorAll( 'span[class*=char]' );
    expect( letters ).to.have.length( 6 );
  });
  it( 'should work for multiple selectors', function() {
    prettyLetters( '.single2' );
    var letters2 = document.querySelectorAll( '.single2 span[class*=char]' );
    expect( letters2 ).to.have.length( 12 );
  });
  it( 'creates groups of letters for sentences', function() {
    prettyLetters( '.double' );
    var group2 = document.querySelectorAll( '.double span[class*=group]' );
    var letters2 = document.querySelectorAll( '.double span[class*=char]' );
    expect( letters2 ).to.have.length( 12 );
    expect( group2 ).to.have.length( 2 );
  });
  it( 'classes and tags should be configurable', function() {
    var options = {
      charClass: 'charClass-',
      groupClass: 'groupClass-',
      charTag: 'b',
      groupTag: 'i'
    };
    prettyLetters( '.double2', options );
    var group2 = document.querySelectorAll( '.double2 i[class*=groupClass]' );
    var letters2 = document.querySelectorAll( '.double2 b[class*=charClass]' );
    expect( letters2 ).to.have.length( 14 );
    expect( group2 ).to.have.length( 2 );
  });
});
