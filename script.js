const userName = document.getElementById("userName");
const welcomeBtn = document.getElementById("welcomeBtn");
const welcomeMessage = document.querySelector("#welcomeMessage");

welcomeBtn.addEventListener("click", function(){
  const name = userName.value.trim();
  if (name===""){
    welcomeMessage.textContent="Please enter your name.";
  }else{
    welcomeMessage.textContent= `Welcome to Dream&Strings, ${name}!`;
  }
});


const themeBtn = document.getElementById("themeBtn");
const headerLogo = document.querySelector(".logo img");
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