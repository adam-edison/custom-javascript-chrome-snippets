// When the "Today" button is clicked,
// and that button is disabled (not changing from a different day),
// Scroll to the current time in center of view
$('.toolbar-button.today.disabled').click(function() {
  
  $(".time-indicator-line")[0].scrollIntoView({
    behavior: "instant",
    block: "center"
  });

});
