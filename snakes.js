/*
     If you're not as drunk reading it, as I was writing it, you don't
     deserve to understand this code.

     This was "written" by Nick Clifford zaf@crypto.geek.nz.
     Licence is CC0. Read the LICENCE file if you really want.
*/
/* The required CSS
  .word {
    display:inline-block;
  }
  .snake {
    display:inline-block;
    border: 12px solid transparent;
    border-top:0;
    border-image:url("snake.png") 24 20 repeat;

  }
  */

function snakemake(el)
{
  'use strict';
  el = $(el);

  // HAHAH, Now we add our CSS dynamically!
  // Additional: Bawahahah. Image is embedded!
  $('head').append('<style>' +
      '.word { display:inline-block; }' +
      '.snake { display:inline-block; border: 12px solid transparent; ' +
      ' border-top:0; border-image: ' +
      ' url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAAgCAQAAADuvX1LAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADE4AAAxOAX93jCMAAAAHdElNRQfgBQwKMBp3Fcu1AAAAHWlUWHRDb21tZW50AAAAAABDcmVhdGVkIHdpdGggR0lNUGQuZQcAAAKISURBVFjD7ZhLSFRRHMZ/o2WO4yOfMUqL0szRCoNoY6ZuKqiQyB6QZtBCF1KLoJ0IvZBoISRZq1okJUgQgUmUYEGYWRqNQ2lWipLmI3JyfI5fi1QcH5MLKRf3u7tzv3v+P75z7oH/MUmsEPmAgWKgGCgGioFioBgoBoqBsjSt+nel+ijDQQSbOYz1f6bSyHZaySSGF9gowjXfolka0Clt1Ual6bI6tbxKVp4k6YPSVKN9StLgHIdHKmZsWOkgiFpS+LyMmXRi5xIAVrLYTRUbyPOWyh89UJg6dVJ7lzGTEiXMGSmTrw6qadYIC32YoFIFy6KBZUPJFrogqUEnlKMCHVCIjilfiYst0LRSqWMn4zz9a/BjdPGSOtoZ8eJqpRJ4AxTTQzphpPOI+5TgpIhn5PJl4QWS7ilOkzoiqyrkmvd2Qg7dUpaShXwUKISQSanK1FU9lEPuGW+3ypUtP6FQPZEUrTKPuRzK0VFtU4sk00Ld4SCx3KSGG/iymjiiCEeM4sLJMK1TCZSSxVqcZGAHIJIzvKeKX1iIJJwQGnEygZV6fhDPGio5TgfR8+oN4SZ44VSk2wrRczXrq7p0VwFCyE8VqtUrnVaEEnRtxjukcl3UdfVKkoqnUpp+bLoz5auWv6542U+mxXrmMs5TSAEBwEce08MeMjwc32lnFBfDuAnEnyCS8APsVNOPhRREAtGAi2rKqaOQfC87yrR4+97AOd5yiP1Y8OEbvowB8JMWerHThhkroYTgZIRxOphkHVuIIRYbZqCPPtpo4DVWcjlLqNdfwOT9JqGeKt7RxSTrceOPCxNmwoknml3EeHjH+UQ/rXyjiWb86SYRC1HsIINNSzgGTSvnUuM379nmKpVmA4AAAAAASUVORK5CYII=")' +
      ' 24 20 repeat;}</style>');

  var txt = el.text();

  //Someone mentioned something about documentation once. They said it
  //would be a good idea, one day, if someone, somewhere, wrote some.
  //Today is not that day. Today you get scrawls in the margin.

  // Grab the text, its not actually words, its words and spaces.
  var words = txt.split(/(\s+)/);
  var spans = [];

  if (words[0].match(/^\s*$/)) words.shift();

  //Get rid of that ugly boring text in the element, we need SNAKES!!!
  el.empty();

  // BADGER BADGER BADGER BADGER BADGER
  _.each(words,function(word) {
      // Skip the space. Pull request for a better regex that doesn't
      // give me spaces gladly accepted (see earlier comment regarding
      // alcohol)
      if (word.match(/^\s+$/)) { return }

      // JQuery, because if you're sober enough to write javascript
      // without it, you don't want to.
      var span = $("<span class='word'>" + word + "</span>");
      el.append(span);
      // Oh, we still need spaces between the boring non snake words.
      // I shall call those MUSHROOM MUSHROOM.
      el.append(" ");
      spans.push(span);
    });

  var endsOfLine = [];
  var farRight = 0;

  // Sexy underscore.js can't help us here. Well it probably can, but
  // it saw the code and doesn't want to.
  // I need i+1. can't use _.each
  for(var i = 0; i < spans.length; i++) {
    var right = spans[i].position().left + spans[i].width();
    // track the furthest right part.
    if (right > farRight) { farRight = right}
    // If there is no next word at all, we are at end of line.
    // If the next word's left occurs before ours, then we are the end
    // of the line.
    if (!spans[i+1] || spans[i].position().left > spans[i+1].position().left) {
      endsOfLine.push({
        span:spans[i],
        left:spans[i].position().left,
        width:spans[i].width(),
        right:spans[i].position().left + spans[i].width()
      });
    }
  }
  // Debugers are for wimps, console.log FTW..
//  console.log("far right is " + farRight);

//  console.log("Line ends are" + _.map(endsOfLine,function(x){return x.right +":" + (farRight-x.right)}).join(",\n"));

  _.each(endsOfLine, function(lastWord) {
    if (lastWord.right == farRight) return;
    // So you can't make the div smaller than the borders, which add up
    // to 24px to represent the smallest snake.
    // Pull request welcome with a vertical snake that fits in the smallest
    // space.
    if (farRight - lastWord.right < 24) {
      // Poo
    } else {
      $("<span class='snake'></span>")
          .insertAfter(lastWord.span)
          .width(farRight-lastWord.right-24);
    }

  });

}
