const userName = document.getElementById("userName");
const welcomeBtn = document.getElementById("welcomeBtn");
const welcomeMessage = document.querySelector("#welcomeMessage");

if (welcomeBtn) {
  welcomeBtn.addEventListener("click", function(){
    const name = userName.value.trim();
    if (name===""){
      welcomeMessage.textContent="Please enter your name.";
    }else{
      welcomeMessage.textContent= `Welcome to Dream&Strings, ${name}!`;
    }
  });
}


const themeBtn = document.getElementById("themeBtn");
const headerLogo = document.querySelector(".logo img");

if (themeBtn) {
  themeBtn.addEventListener("click",function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
      themeBtn.textContent = "Switch to Light Theme";
      headerLogo.src = "images/logo-inverted.png"; 
    }else{
      themeBtn.textContent = "Switch to Dark Theme";
      headerLogo.src = "images/logo.png";
    }
  });
}




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


searchInput.addEventListener("input", filterCards);


filterCards();



const favouriteForm = document.getElementById("favouriteForm");
const favouriteInput = document.getElementById("favouriteInput");
const favouriteList = document.getElementById("favouriteList");
const favouriteCount = document.getElementById("favouriteCount");
const favouriteError = document.getElementById("favouriteError");


function updateFavouriteCount() {
    favouriteCount.textContent =
        "Total items: " + favouriteList.children.length;
}


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