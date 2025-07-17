import $ from "jquery";

$(function () {
  if (!localStorage.getItem("is_hint_show") && window.innerWidth >= 640) {
    $("#keyboardHintModal").fadeIn();
  }

  $("#closeModal").on("click", function () {
    if ($("#dontShowAgain").is(":checked")) {
      localStorage.setItem("is_hint_show", "true");
    }
    $("#keyboardHintModal").fadeOut();
  });
});
