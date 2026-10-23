let count = 0;
const counterDisplay = document.getElementById('counterDisplay');
function updateCounter(){
    counterDisplay.textContent = count;
}
document.getElementById('btnIncrease')
.addEventListener('click', function(){
    count++;
    updateCounter();
});
document.getElementById('btnDecrease')
.addEventListener('click', function(){
    if(count > 0){
        count--;
        updateCounter();
    }
});
document.getElementById('btnReset')
.addEventListener('click', function(){
    count = 0;
    updateCounter();
});

const textInput = document.getElementById('textInput');
const textPreview = document.getElementById('textPreview');
const charCount = document.getElementById('charCount');
textInput.addEventListener('input', function(){
    const currentText = textInput.value;
    if(currentText.trim() === ""){
        textPreview.textContent = "Your text will appear here";
    }else{
        textPreview.textContent =currentText;
    }
charCount.textContent = currentText.length;
});
document.getElementById('btnClear')
.addEventListener('click', function(){
    textInput.value = "";
    textPreview.textContent = "Your text will appear here";
    charCount.textContent = "0";
    textInput.focus();
});

const imageSelect = document.getElementById('imageSelect');
const dynamicImage = document.getElementById('dynamicImage');
const imageCaption = document.getElementById('imageCaption');
imageSelect.addEventListener('change', function(){
    dynamicImage.src = imageSelect.value;
    const selectedIndex = imageSelect.options[imageSelect.selectedIndex].text;
    dynamicImage.alt = selectedIndex;
    imageCaption.textContent =  selectedIndex;
});

const keyInput = document.getElementById('keyInput');
const keyStatus = document.getElementById('keyStatus');
const keyResult = document.getElementById('keyResult');
keyInput.addEventListener('keydown', function(event){
    keyStatus.textContent = "Pressed: " + event.key;
    if(event.key === 'Enter'){
        event.preventDefault();
        keyResult.textContent = keyInput.value;
    }
    if(event.key === 'Escape'){
        keyInput.value = "";
        keyResult.textContent = "None";
        keyStatus.textContent = "Waiting for key...";
    }
});

const focusCard = document.getElementById('focusCard');
const instructionText = document.getElementById('instructionText');
focusCard.addEventListener('mouseenter', function(){
    focusCard.classList.add('highlight');
    instructionText.textContent = "Mouse is on the card!";
});
focusCard.addEventListener('mouseleave', function(){
    focusCard.classList.remove('highlight');
    instructionText.textContent = "Mouse left the card.";
});
focusCard.addEventListener('focus', function(){
    focusCard.classList.add('highlight');
    instructionText.textContent = "Card is focused with keyboard!";
});
focusCard.addEventListener('blur', function(){
    focusCard.classList.remove('highlight');
    instructionText.textContent = "Card lost focus.";
});