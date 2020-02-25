import * as card from './cards.mjs'

const baseUrl = window.location.origin;

$(document).ready(() => {

    // Set Page Title
    $.ajax({
        url : baseUrl + '/api/getApp',
        success : (data) => {
            document.title = data.name
            $('#navBarTitle').html(`<i class="fa fa-network-wired"></i>       ${data.name}`)
        }
    })

    // Get System Lists
    $.ajax({
        url : baseUrl + '/api/getSystems',
        success : (data) => {
            createCards(data);
        }
    })

    // Back to top button functionality  
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
            }, 500);
            return false;
    });

})

function createCards(data){
    data.forEach((system, index) => {
        // Create System Cards
        $.ajax({
            url : baseUrl + '/api/getSystems',
            method : "POST",
            data: {
                "system" : system
            },
            success : (data) => {
                card.systemHTML(data.type, data.name, index);
                card.serviceGridHTML(data.services, data.baseurl, index)
            }
        })
    })
}