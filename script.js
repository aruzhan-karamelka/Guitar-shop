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





const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".product-card");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");


function filterCards() {
    const searchText = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(function(card) {
        const title = card.querySelector("h3").textContent.toLowerCase();

        if (title.includes(searchText)) {
            card.hidden = false;
            visibleCount++;
        } else {
            card.hidden = true;
        }
    });

    resultCount.textContent = "Results: " + visibleCount;
    noResults.hidden = visibleCount !== 0;
}

if(searchInput) {
  searchInput.addEventListener("input", filterCards);
  filterCards();
}

const favouriteForm = document.getElementById("favouriteForm");
const favouriteInput = document.getElementById("favouriteInput");
const favouriteList = document.getElementById("favouriteList");
const favouriteCount = document.getElementById("favouriteCount");
const favouriteError = document.getElementById("favouriteError");


function updateFavouriteCount() {
    favouriteCount.textContent =
        "Total items: " + favouriteList.children.length;
}

if(favouriteForm) {
  favouriteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = favouriteInput.value.trim();

    if (name === "") {
        favouriteError.textContent = "Please enter a guitar name.";
        return;
    }

    favouriteError.textContent = "";

    const item = document.createElement("li");
    const guitarName = document.createElement("span");
    const removeButton = document.createElement("button");

    guitarName.textContent = name;
    removeButton.textContent = "Remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", function() {
        item.remove();
        updateFavouriteCount();
    });

    item.append(guitarName, " ", removeButton);
    favouriteList.append(item);

    favouriteInput.value = "";
    favouriteInput.focus();

    updateFavouriteCount();
});
}


$(function() {
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