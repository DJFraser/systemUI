/**
 * create system card
 */
function systemHTML(type, name, index){
    let str = '';

    str = `
        <div class="card sys mt-3">
            <div class="card-header text-center">
                ${systemImage(type)} ${name}
            </div>
            <div class="card-body">
                <div class="row row-cols-3 row-cols-md-5" id="services_${index}"></div>
            </div>
        </div>`

    $('#systems').append(str)
}

/**
 * create service card
 */
function serviceGridHTML(services, baseUrl, index){
    let str = '';
    
    services.forEach((service) => {
        let title = service.name || service.service;
        
        let desc = ""
        if(service.hasOwnProperty('desc')){
            desc = `<p class="card-text">${service.desc}</p>`
        }
        str += `
        <div class="col mb-3">
            <div class="card bg-light">
                <div class="service_card service_${service.service}"></div>
            </div>
            <div class="card-body text-center">
                <h5 class="card-title">${title}</h5>
                ${desc}
            </div>

            <a href="${linkHref(service, baseUrl)}" target="_blank" class="stretched-link"></a>
        </div>
        `
    })

    $(`#services_${index}`).append(str)
}

function linkHref(serv, baseUrl){
    let href = "http://" + baseUrl;
    
    // if service requires HTTPS
    if(serv.hasOwnProperty('https')){
        if(serv.https == true){
            href = "https://" + baseUrl;
        }
    }
    
    // Check for Service Port
    if(serv.hasOwnProperty('port')){
        href += `:${serv.port}`
    }

    // Check for Service URL
    if(serv.hasOwnProperty('url')){
        href += `/${serv.url}`
    }

    return href
}

/**
 * Convert System Type to Font Awesome Image
 * @param type System Type
 */
function systemImage(type){
    let imageHTML = ''
    
    switch (type){
        case "media" : {
            imageHTML = `<i class="fas fa-play-circle float-left"></i>`;
            break;
        }
        case "server" : {
            imageHTML = `<i class="fas fa-server float-left"></i>`;
            break;
        }
        default : {
            imageHTML = `<i class="fas fa-desktop float-left"></i>`;
            break;
        }
    }

    return imageHTML;
}

export {
    systemHTML,
    serviceGridHTML,
    linkHref,
    systemImage
}