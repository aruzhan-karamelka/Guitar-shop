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
    if(name.length<2){
      $("#welcomeMessage").text("Please enter your name (at least 2 characters).");
    }else{
      $("#welcomeMessage").text(`Welcome to Dream&Strings, ${name}!`);
    }
  });
});




$(function () {
    function showSignUp() {
      $("#registrationForm").show();
      $("#loginSection").prop("hidden", true);
      $("#showSignUp").addClass("active");
      $("#showLogin").removeClass("active");
    }
    function showLogin() {
      $("#registrationForm").hide();
      $("#loginSection").prop("hidden", false);
      $("#showLogin").addClass("active");
      $("#showSignUp").removeClass("active");
    }
    $("#showSignUp, #showSignUpLink").on("click", showSignUp);
    $("#showLogin, #showLoginLink").on("click", showLogin);
    const $form = $("#registrationForm");
    if ($form.length) {
      const passwordInput = $("#password")[0];
      const confirmPasswordInput = $("#confirmPassword")[0];
      const $successMessage = $("#successMessage");

      function checkPasswordStrength() {
          const value = passwordInput.value;
          const strongPassword =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
          if (!strongPassword.test(value)) {
            passwordInput.setCustomValidity("Weak password");
          } else {
            passwordInput.setCustomValidity("");
          }
      }

      function checkConfirmPassword() {
        if (
          confirmPasswordInput.value !== passwordInput.value ||
          confirmPasswordInput.value === ""
        ) {
          confirmPasswordInput.setCustomValidity(
            "Passwords do not match"
          );
        } else {
          confirmPasswordInput.setCustomValidity("");
        }
    }
    $form.on("reset", function () {
    $form.removeClass("was-validated");
    $confirmPassword[0].setCustomValidity("");
    $passwordFeedback.text(
      "Please enter the same password in both fields."
    );
    $successMessage.addClass("d-none").hide();
   });
   function resetRegistrationForm() {
      passwordInput.setCustomValidity("");
      confirmPasswordInput.setCustomValidity("");
        $form[0].reset();
        clearValidationUI();
        $successMessage
          .removeClass("alert-success alert-danger")
          .text("")
          .hide();
    }

    $form.on("input", "#password", function () {
      checkPasswordStrength();
      checkConfirmPassword();
    });

    $form.on("input", "#confirmPassword", function () {
      checkConfirmPassword();
    });

    $form.on("submit", function (event) {
      event.preventDefault();
      checkPasswordStrength();
      checkConfirmPassword();
      $form.addClass("was-validated");
      if (!$form[0].checkValidity()) {
        event.stopPropagation();
        return;
      }

      const user = {
        firstName: $("#firstName").val().trim(),
        lastName: $("#lastName").val().trim(),
        email: $("#email").val().trim().toLowerCase(),
        password: passwordInput.value,
        phone: $("#phone").val(),
        gender: $("input[name='gender']:checked").val() || "",
        musicalInterests: $("input[name='musicalInterests']:checked")
          .map(function () {
              return this.value;
          }).get(),
            country: $("#country").val()
      };

      const existingUser = JSON.parse(
        localStorage.getItem("dreamStringsUser")
      );
      if (existingUser && existingUser.email === user.email) {
        $successMessage
          .removeClass("alert-success success-hidden d-none")
          .addClass("alert-danger")
          .text("This email is already registered.")
          .hide()
          .fadeIn(250);
        return;
      }

      localStorage.setItem(
        "dreamStringsUser",
        JSON.stringify(user)
      );
      $successMessage
        .removeClass("alert-danger success-hidden d-none")
        .addClass("alert-success")
        .text("Registration successful! Please log in.")
        .hide()
        .fadeIn(250);

       resetRegistrationForm();

        setTimeout(function () {
          showLogin();
          $("#loginEmail").val(user.email);
        }, 1000);
      });
    }

    const $loginForm = $("#loginForm");
    if ($loginForm.length) {
      $loginForm.on("submit", function (event) {
        event.preventDefault();
        $loginForm.addClass("was-validated");
        const email = $("#loginEmail")
            .val().trim().toLowerCase();
        const password = $("#loginPassword").val();
        const savedUser = JSON.parse(
            localStorage.getItem("dreamStringsUser")
        );
        $("#loginError").text("");
        if (!$loginForm[0].checkValidity()) {
            return;
        }

        if (
            !savedUser ||
            savedUser.email !== email ||
            savedUser.password !== password
        ) {
            $("#loginError").text(
                "Incorrect email or password. Please try again."
            );

            return;

        }

        localStorage.setItem(
            "dreamStringsCurrentUser",
            JSON.stringify({
              email: savedUser.email
            })
        );

          window.location.href = "profile.html";

      });

    }

    const $profile = $("#profileContent");

    if ($profile.length) {
      const savedUser = JSON.parse(
        localStorage.getItem("dreamStringsUser")
      );
      const currentUser = JSON.parse(
        localStorage.getItem("dreamStringsCurrentUser")
      );

      if (
        !savedUser ||
        !currentUser ||
        currentUser.email !== savedUser.email
      ) {
        window.location.href = "registration.html";
        return;
      }

      $("#profileFirstName").text(savedUser.firstName);
      $("#profileLastName").text(savedUser.lastName);
      $("#profileEmail").text(savedUser.email);
      $("#profilePhone").text(savedUser.phone);
      $("#profileCountry").text(savedUser.country);
      $("#profileGender").text(
        savedUser.gender || "Not specified"
      );
      $("#profileInterests").text(
        savedUser.musicalInterests.length
            ? savedUser.musicalInterests.join(", ")
            : "Not specified"
      );

      $("#logoutBtn").on("click", function () {
        localStorage.removeItem("dreamStringsCurrentUser");
        window.location.href = "index.html";
      });
    }
});
    


$(function(){
  const currentUser = JSON.parse(
    localStorage.getItem("dreamStringsCurrentUser")
  );
  if(currentUser){
    $("#accountLink").text("My Profile").attr("href", "profile.html");
  } else{
    $("#accountLink").text("Sign Up / Log In").attr("href", "registration.html");
  }
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