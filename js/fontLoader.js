//Google Font Loader
var html = document.getElementsByTagName('html')[0];
html.className += '  wf-loading';
setTimeout(function() {
    html.className = html.className.replace(' wf-loading', '');
}, 3000);

WebFontConfig = {
    google: { families: ['Montserrat:400',  'Vidaloka'] }
};

(function() {
    document.getElementsByTagName("html")[0].setAttribute("class","wf-loading")
    //  NEEDED to push the wf-loading class to your head
    document.getElementsByTagName("html")[0].setAttribute("className","wf-loading")
    // for IE

    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'false';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

