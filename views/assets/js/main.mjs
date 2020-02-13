const baseUrl = window.location.origin;

let systemList = [];


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
            systemList = data;

            console.log(systemList)
        }
    })
})