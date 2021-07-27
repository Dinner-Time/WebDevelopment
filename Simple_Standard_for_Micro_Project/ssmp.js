window.onload = function(){
    const inputText = document.querySelectorAll(".ssmp-input .ssmp-inputText");

    for(let i=0; i<inputText.length; i++){
        inputText[i].addEventListener("change", placeholderEffect);
    }
}

// input placeholder 효과
function placeholderEffect(){
    if(this.value != ""){
        this.nextElementSibling.style.opacity = '0';
    } else{
        this.nextElementSibling.style.opacity = '1';
    }
}