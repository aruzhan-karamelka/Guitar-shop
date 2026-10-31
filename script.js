$(function(){
  const savedTheme = localStorage.getItem("theme") || "light";

  function applyTheme(theme){
    const isDark = theme==="dark";
    $("body").toggleClass("dark-theme", isDark);
    $("body").toggleClass("light-theme", !isDark);
    $("#themeBtn")
       .text(isDark ? "Light mode" : "Dark mode")
       .attr("aria-pressed", String(isDark));
    $(".logo img").attr(
      "src",
      isDark ? "images/logo-inverted.png" : "images/logo.png"
    );
  }

  applyTheme(savedTheme);
  $(document).on("click", "#themeBtn", function(){
    const isDark = $("body").hasClass("dark-theme");
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  });
});



$(function(){
  $("#welcomeBtn").on("click", function(){
    const name = $("#userName").val().trim();
    if(name===""){
      $("#welcomeMessage").text("Please enter your name.");
    }else{
      $("#welcomeMessage").text(`Welcome to Dream&Strings, ${name}!`);
    }
  });
});



$(function () {
  const $form = $("#registrationForm");
  if (!$form.length) {
    return;
  }
  const $password = $("#password");
  const $confirmPassword = $("#confirmPassword");
  const $passwordFeedback = $("#passwordFeedback");
  const $successMessage = $("#successMessage");

  function checkPassword() {
    const password = $password.val();
    const confirmPassword = $confirmPassword.val();
    if (confirmPassword !== "" && confirmPassword !== password) {
      $confirmPassword[0].setCustomValidity(
        "Passwords do not match"
      );
      $passwordFeedback.text("Passwords do not match.");
    } else {
      $confirmPassword[0].setCustomValidity("");
      $passwordFeedback.text(
        "Please enter the same password in both fields."
      );
    }
  }
  $form.on("input", "#password, #confirmPassword", function () {
    checkPassword();
  });
  $form.on("submit", function (event) {
    event.preventDefault();
    checkPassword();
    $form.addClass("was-validated");
    $successMessage.addClass("d-none").hide();
    if (!$form[0].checkValidity()) {
      event.stopPropagation();
      return;
    }
    $successMessage
      .removeClass("d-none")
      .hide()
      .fadeIn(250);
  });

  $form.on("reset", function () {
    $form.removeClass("was-validated");
    $confirmPassword[0].setCustomValidity("");
    $passwordFeedback.text(
      "Please enter the same password in both fields."
    );
    $successMessage.addClass("d-none").hide();
  });
});





$(function () {
  if (!$("#searchInput").length) return;

  let selectedCategory = "all";

  function filterProducts() {
    const searchText = $("#searchInput").val().trim().toLowerCase();
    let count = 0;

    $(".product-card").each(function () {
      const name = $(this).find("h3").text().toLowerCase();
      const category = $(this).attr("data-category");
      const matches = name.includes(searchText) &&
        (selectedCategory === "all" || category === selectedCategory);

      $(this).toggle(matches);

      if (matches) count++;
    });

    $("#resultCount").text(count + " products found");
    $("#noResults").prop("hidden", count !== 0);
  }

  $("#searchInput").on("input", filterProducts);

  $(".filter-btn").on("click", function () {
    selectedCategory = $(this).attr("data-category");
    $(".filter-btn").removeClass("active").attr("aria-pressed", "false");
    $(this).addClass("active").attr("aria-pressed", "true");
    filterProducts();
  });

  filterProducts();

  function updateFavourites() {
    const count = $("#favouriteList li").length;
    $("#favouriteCount").text("Total items: " + count);
    $("#emptyFavourites").prop("hidden", count !== 0);
  }

  function showFavouriteStatus(message) {
    $("#favouriteStatus")
      .stop(true, true)
      .text(message)
      .removeAttr("hidden")
      .hide()
      .fadeIn(200)
      .delay(1200)
      .fadeOut(300);
  }

  $("#favouriteForm").on("submit", function (event) {
    event.preventDefault();

    const name = $("#favouriteInput").val().trim();

    if (!name) {
      $("#favouriteError").text("Please enter a guitar name.");
      return;
    }

    $("#favouriteError").text("");

    const item = $("<li></li>");
    item.append($("<span></span>").text(name));
    item.append(
      $("<button></button>")
        .attr("type", "button")
        .addClass("remove-favourite")
        .text("Remove")
    );

    $("#favouriteList").append(item);
    $("#favouriteInput").val("").trigger("focus");

    updateFavourites();
    showFavouriteStatus("Guitar added to favourites.");
  });

  $("#favouriteList").on("click", ".remove-favourite", function () {
    $(this).closest("li").remove();
    updateFavourites();
    showFavouriteStatus("Guitar removed from favourites.");
  });

  updateFavourites();

  $("#guitarEnquiry").on("submit", function (event) {
    event.preventDefault();

    const name = $("#enquiryName").val().trim();
    const email = $("#enquiryEmail").val().trim();
    const message = $("#enquiryMessage").val().trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    $("#nameError").text(name ? "" : "Please enter your name.");
    $("#emailError").text(validEmail ? "" : "Please enter a valid email address.");
    $("#messageError").text(message ? "" : "Please enter your question.");
    $("#enquirySuccess").prop("hidden", true);

    if (name && validEmail && message) {
      this.reset();
      $("#enquirySuccess").removeAttr("hidden").hide().fadeIn(250);
    }
  });
});


$(function() {
  $('.faq-answer').hide();
  $('.faq-question').on('click', function() {
    $(this).next('.faq-answer').stop(true, true).slideToggle(300);
    let isExpanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', !isExpanded);
  });
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    let email = $('#email').val().trim();
    let isEmailValid = email.includes('@') && email.includes('.');
    if (this.checkValidity() && isEmailValid) {
      $('#successMessage').removeClass('d-none').hide().fadeIn(300);
      this.reset();
      $(this).removeClass('was-validated');
      $('.form-control').removeClass('is-invalid is-valid');
    } else {
      $(this).addClass('was-validated');
      if (!isEmailValid) {
        $('#email').addClass('is-invalid');
      }
    }
  });
});