var loadingInterval;
var d   = document;
var b   = document.body;
var wl  = document.querySelectorAll('a');
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

    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: true, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });

    $('.button-collapse').sideNav({
        menuWidth: 240, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

    $('.parallax').length && $('.parallax').parallax();

    $.ajax({
        url: "static/data/abstracts.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            for(var c=0; c < data.length; c++){
                var workshop = data[c];
                var html = '<div class="row ct-workshop" id=' + workshop.id + '>' +
                           '<div class="container">' +
                           '<div class="card hoverable waves-effect waves-block">' +
                           '<div class="col s12 m5 l4 no-padding card-image">' +
                           '</div><div class="content col s12 m7 l8 no-padding">' +
                           '<div class="card-content">' +
                           '<span class="card-title title ct-blue-text"></span>' +
                           '<p><strong class="speaker"></strong></p>' +
                           '<p class="community light"></p><br>' +
                           '<p class="abstract">' +
                           '</p></div>' +
                           '<div class="card-action actions">' +
                           '<a href=""></a>' +
                           '</div></div></div></div></div>';
                var workshopCard = $(html);
                $('.ct-workshop-showcase').append(workshopCard);
                workshopCard = $('#' + workshop.id);
                workshopCard.find(".title").html(workshop.title);
                workshopCard.find(".abstract").html(workshop.abstract);
                workshopCard.find(".community").html(workshop.community.name);
                workshopCard.find(".speaker").html(workshop.speaker.name);
                for(var l=0; l<workshop.links.length; l++){
                    var link = workshop.links[l];
                    html = $('<a href="' + link.url + '">' + link.text + '</a>');
                    workshopCard.find(".actions").append(html);
                }
                workshopCard.find(".card-image").height(workshopCard.find(".content").height());
                workshopCard.find(".card-image").css('background-image', 'url(' + workshop.picture + ')');
                console.log(workshop.picture);

            }
        },
    });

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

    Array.prototype.forEach.call(wl, function(l) {
        l.addEventListener("click", function(e) {
            e.preventDefault();
            url = l.getAttribute('href');
            if(url != ""){
                target = l.getAttribute('target')===null?'_self':l.getAttribute('target');
                setTimeout(function(){
                    window.open(url,target);
                }, 500);
            }
        })
    })

});

$(window).resize(function(event) {
    var wlst = $(".ct-workshop");
    for(var w=0; w<wlst.length; w++){
        var workshopCard = $(wlst[w]);
        workshopCard.find(".card-image").height(workshopCard.find(".content").height());
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

