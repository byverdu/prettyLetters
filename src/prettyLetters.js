// prettyLetters plugin

var emptySelectorError = 'EmptySelectorError, prettyLetters was called without any CSS selector';
var wrongSelectorError = 'WrongSelectorError, prettyLetters was called with a mismatched CSS selector';

function prettyLetters( selector ) {
  var elements = document.querySelectorAll( selector );

  // emptySelectorError
  if ( !selector ) {
    throw new Error( emptySelectorError );
  }
  // wrongSelectorError
  if ( elements.length === 0 ) {
    throw new Error( wrongSelectorError );
  }
}
