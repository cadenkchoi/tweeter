$(document).ready(function() {
  $("#tweet-text").on("input", function(event) {
    const totalCount = $(this).val().length;
    $(".counter").text(140 - totalCount);
    if (totalCount > 140) {
      $(".counter").addClass("negativeCounter")
    } else {
      $(".counter").removeClass("negativeCounter")
    }
  })
});