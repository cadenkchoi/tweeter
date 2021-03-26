$(document).ready(function() {
  $("#tweet-text").on("input", function(event) {
    const charMax = 140;
    const input = $(this).val();
    const charCount = charMax - input.length;
    let counterText = $(this).parent().children(".bottom").children(".counter");
    counterText.text(charCount);
    if (charCount < 0) {
      counterText.addClass("redText");
      counterText.removeClass("negativeCounter");
    } else if (charCount <= 5 && charCount > 0) {
      counterText.addClass("negativeCounter");
      counterText.removeClass("redText");
    } else if (charCount === 0) {
      counterText.addClass("redText");
      counterText.removeClass("negativeCounter");
    } else {
      counterText.removeClass("negativeCounter");
      counterText.removeClass("redText");
    }
  });
});