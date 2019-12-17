$(document).ready(function() {
console.log('test');
});

$('textarea').keyup(function() {
  // $(this).css("background-color", 'blue');
  let maxLength = 140;
  var length = $(this).val().length;
  var length = maxLength-length;
  if (length <= 0) {
    $(this).siblings("span").text(length).addClass('exceeded');

  } else {
    $(this).siblings("span").text(length).removeClass('exceeded');
  };
  });