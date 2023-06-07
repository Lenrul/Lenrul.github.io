function customyt(){
    var ifrm = document.createElement("IFRAME"); 
    ifrm.setAttribute("src", "https://www.youtube.com/watch?v=-QhAf7nfHVs"); 
    ifrm.style.width = "50%"; 
    ifrm.style.height = "50%"; 
    document.body.appendChild(ifrm); 
  } 
  document.addEventListener('contextmenu', event => event.preventDefault());