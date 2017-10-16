/* global prettyLetters, chai, sinon, $ */
( function( $ ) {
  var { expect } = chai;
  var jQueryMock;

  before( function() {
    // stub = sinon.spy( prettyLetters );
    jQueryMock = $( '.single' ).prettyLetters();
  });

  describe( 'PrettyLetters jQuery Plugin', function() {
    it( 'is defined', function() {
      expect( $.fn ).to.have.property( 'prettyLetters' );
    });
    it( 'returns an array within the selectors', function() {
      expect( jQueryMock ).to.have.length.least( 1 );
    });
    it( 'can be chainable', function() {
      jQueryMock.addClass( 'noMore' );
      expect( jQueryMock.attr( 'class' ))
        .to.contain( 'noMore' );
    });
    it( 'should split all letters for a word', function() {
      $( '.single' ).prettyLetters();
      var letters = $( '.single span[class*=char]' );
      expect( letters ).to.have.length( 6 );
    });
    it( 'should work for multiple selectors', function() {
      $( '.single2' ).prettyLetters();
      var letters2 = $( '.single2 span[class*=char]' );
      expect( letters2 ).to.have.length( 12 );
    });
    it( 'creates groups of letters for sentences', function() {
      $( '.jquery' ).prettyLetters();
      var group2 = $( '.double span[class*=group]' );
      var letters2 = $( '.double span[class*=char]' );
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
      $( '.jquery2' ).prettyLetters( options );
      var group2 = $( '.jquery2 i[class*=groupClass]' );
      var letters2 = $( '.jquery2 b[class*=charClass]' );
      expect( letters2 ).to.have.length( 14 );
      expect( group2 ).to.have.length( 2 );
    });
  });
})( jQuery );
