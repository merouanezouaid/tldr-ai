const el = document.querySelector(".x");

function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (
        typeof document.selection != "undefined" &&
        document.selection.type == "Text"
    ) {
        text = document.selection.createRange().text;
    }
    return text;
}

document.addEventListener("mouseup", (event) => {
    var selectedText = getSelectedText();
    if (selectedText) {
        el.classList.add("active");
        el.style.left = event.pageX + "px";
        el.style.top = event.pageY + "px";
    } else {
        el.classList.remove("active");
    }
});


const x = document.createElement("div")
x.id = "x"
x.innerHTML = "<img src='assets\icons\48.png'>"
document.body.appendChild(x)