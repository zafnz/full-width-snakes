

See https://xkcd.com/1676/ for context.

Licence is CC0. Read the LICENCE file if you really want.

DEMO: http://zafnz.github.io/snakes.html Much wow

Usage:
```HTML
  <script src="snakes.js"></script>
  <script>
    $().ready(function() {
      // SNAKE! SNAKE! SNAKE
      snakemake('#quotation');
    });
  </script>
  <p id='quotation' style='display:block; width:200px'>
    ...on the relationship between industrialization and the growth,... you fill in the rest
  </p>
```
You can supply anything jQuery accepts as the argument. It turns that block of text into snake text.
Note: Sadly, only elements containing plain text currently works.

There are some more disclaimers in the source. It's probably better you check there. There are various bugs (badgers) in the code.
