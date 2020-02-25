import * as card from './cards.mjs'

const baseUrl = window.location.origin;

$(document).ready(() => {
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
            }, 500);
            return false;
    });
})

$('#getCurrentConfig').on('click', () => {
    $.ajax({
        url : baseUrl + '/api/getCurrentConfig',
        success : (data) => {
            var blob=new Blob([data]);
            var link=document.createElement('a');
            link.href=window.URL.createObjectURL(blob);
            link.download="config.json";
            link.click();
        }
    })
})

$('#downloadEditor').on('click', () => {
    var blob=new Blob([$("#configEditor").val()]);
    var link=document.createElement('a');
    link.href=window.URL.createObjectURL(blob);
    link.download="config.json";
    link.click();
})

$('#uploadServer').on('click', () => {
    let configText = $('#configEditor').val();

    if(checkJson(configText)){
        $.ajax({
            url : baseUrl + '/api/setConfig',
            method : "POST",
            data: {
                "config" : JSON.parse(configText)
            },
            success : () => {
                // Redirect to main page on completion
                window.location.pathname = '/';
            }
        })
    } else {
        console.log('Invalid JSON')
    }
})

$('#testConfig').on('click', () => {
    let configText = $('#configEditor').val();

    $('#systems').html('')

    if(checkJson(configText)){
        let json = JSON.parse(configText);

        json.systems.forEach((data, index) => {
            card.systemHTML(data.type, data.name, index);
            card.serviceGridHTML(data.services, data.baseurl, index)
        })
    } else {
        console.log('Invalid JSON')
    }
})

function checkJson(str){
    try {
        var json = JSON.parse(str);
        return (typeof json === 'object')
      } catch (e) {
        return false
      }
}