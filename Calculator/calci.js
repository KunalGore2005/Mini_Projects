const display=document.getElementById("display");
document.addEventListener("keydown", handleKey);
function handleKey(e) {
    const key = e.key;
    if (key >= "0" && key <= "9") {
        appendToDisplay(key);
        e.preventDefault();
    }
    else if (["+", "-", "*", "/", "."].includes(key)) {
        appendToDisplay(key);
        e.preventDefault();
    }
    else if (key === "Enter" || key === "=") {
        calculate();
        e.preventDefault();
    }
    else if (key === "Backspace") {
        deleteLast();
        e.preventDefault();
    }
    else if (key === "Escape") {
        clearDisplay();
        e.preventDefault();
    }
}

function appendToDisplay(input){
    if(display.value==="Error"){
        display.value="";
    }
    display.value+=input;
    display.scrollLeft = display.scrollWidth;

}
function calculate(){
    try{
        display.value=eval(display.value);
    }
    catch{
        display.value="Error";
    }
}
function clearDisplay(){
    display.value="";
}
function deleteLast(){
    display.value=display.value.slice(0,-1);
}