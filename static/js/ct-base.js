var loadingInterval;
var d   = document;
var b   = document.body;
var wl   = document.querySelectorAll('[href=".*"]');
var bc  = b.classList;
var bw  = b.offsetWidth;
var obw = bw;
var l   = d.getElementById('ct-page-loader');
var p   = l.querySelector('.ct-preloader--progres-indicator');

$(document).ready(function(){
    loadingInterval = setInterval(function() {
        var r  = obw/bw;
        var nw = Math.round(p.offsetWidth*r) + Math.round(Math.random()*bw/5.0);
        if(nw <  0.9*bw) { p.style.width = nw + "px" };
        obw = bw;
        bw  = b.offsetWidth;
    }, 100);

    Array.prototype.forEach.call(wl, function(wl) {
        wl.addEventListener("click", function(wl) {
            wl.preventDefault();
        })
    })

    $('nav .dropdown-button').lenght && $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: true, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });

    $('.button-collapse').lenght && $('.button-collapse').sideNav({
        menuWidth: 240, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

    $('.parallax').length && $('.parallax').parallax();


    if ($('.github-commit').length) { // Checks if widget div exists (Index only)
      $.ajax({
        url: "https://api.github.com/repos/HackSpacePeru/Community-Training/commits/gh-pages",
        dataType: "json",
        success: function (data) {
            var sha = data.sha,
                date = jQuery.timeago(data.commit.author.date);
                author = data.author
            $('.github-commit').find('.date').html(date);
            $('.github-commit').find('.author').html("@" + author.login).attr('href', author.html_url);
            $('.github-commit').find('.sha').html(sha).attr('href', data.html_url);
        }
      });
    }

});

$(window).load(function(){
    clearInterval(loadingInterval);
    p.style.width = "100%";
    if( bc.contains("not-loaded") ){
        setTimeout( function(){
            bc.add("loaded"); bc.remove("not-loaded");
            setTimeout( function(){
                l.style.height=0;l.style.width=0;
            }, 600);
        }, 500);
    }
});

