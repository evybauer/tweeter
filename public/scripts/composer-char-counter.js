$(document).ready(function() {
  $('textarea').keyup(function() {
    let maxLength = 140;
    let length = $(this).val().length;
    let totalLength = maxLength - length;
    if (totalLength <= 0) {
      $(this).siblings("span").text(totalLength).addClass('exceeded');
    } else {
      $(this).siblings("span").text(totalLength).removeClass('exceeded');
    }
  });
});

