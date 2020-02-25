import * as card from './cards.mjs'

const baseUrl = window.location.origin;

$(document).ready(() => {
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

$('#configUpload').on('change', function(){
    let filename = $(this)[0].files[0].name;
    console.log(filename)
    $(this).next('.custom-file-label').addClass('selected').html(filename);
})

$('#uploadConfig').on('click', () => {
    let formData = new FormData();

    var upload = $('#configUpload')[0].files[0];
    formData.append('configUpload', upload)

    $.ajax({
        url : baseUrl + '/api/readJSONFile',
        method : "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success : (data) => {
            $('#configEditor').val(JSON.stringify(data, null, 2))
        }
    })

})

function checkJson(str){
    try {
        var json = JSON.parse(str);
        return (typeof json === 'object')
      } catch (e) {
        return false
      }
}