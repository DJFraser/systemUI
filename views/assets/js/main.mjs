const baseUrl = window.location.origin;

$(document).ready(() => {

    // Set Page Title
    $.ajax({
        url : baseUrl + '/api/getName',
        success : (data) => {
            document.title = data
        }
    })

    // Get System Lists
    $.ajax({
        url : baseUrl + '/api/getSystems',
        success : (data) => {
            createCards(data);
        }
    })
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
                console.log(data);

                systemHTML(data.type, data.name, index);
                serviceHTML(data.services, index)
            }
        })
    })
}

/**
 * create system card
 */
function systemHTML(type, name, index){
    let str = '';

    str = `
    <div id="system_${index}" class="system ${type}">
        <div class="system_header">
            <table class="system_table">
                <tr>
                    <td class="system_image">${systemImage(type)}</tD>
                    <th class="system_name">${name}</th>
                </tr>
            </table>
        </div>
        <div class="services" id="service_${index}"></div>
    </div>`

    $('#systems').append(str)
}

/**
 * create service card
 */
function serviceHTML(services, index){
    let str = '';


    services.forEach((service) => {
        let dest = '';
        if(service.hasOwnProperty('port')){
            dest = `:${service.port}`
        }

        str += `
        <div class="service">
            ${service.service} <a href="http://192.168.0.30${dest}" target="_blank">link</a>
        </div>`
    })

    $(`#service_${index}`).append(str)
}

/**
 * Convert System Type to Font Awesome Image
 * @param type System Type
 */
function systemImage(type){
    let imageHTML = ''
    
    switch (type){
        case "media" : {
            imageHTML = `<i class="fas fa-play-circle"></i>`;
            break;
        }
        case "server" : {
            imageHTML = `<i class="fas fa-server"></i>`;
            break;
        }
        default : {
            imageHTML = `<i class="fas fa-desktop"></i>`;
            break;
        }
    }

    return imageHTML;
}