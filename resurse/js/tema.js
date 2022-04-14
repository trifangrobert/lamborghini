window.onload = function() {
    
    document.getElementById("btn_tema").onclick = function () {
        var tema = localStorage.getItem("tema");
        if (tema) {
            localStorage.removeItem("dark");
        }
        else {
            localStorage.setItem("tema", "dark");
        }
        document.body.classList.toggle('dark');
    }
}