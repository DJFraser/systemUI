const baseUrl = window.location.origin;

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

    try {
        var json = JSON.parse(configText);
        if(typeof json === 'object'){
            console.log(json)
            $.ajax({
                url : baseUrl + '/api/setConfig',
                method : "POST",
                data: {
                    "config" : json
                },
                success : () => {
                    
                }
            })
        }
      } catch (e) {
        console.log('Invlaid Json')
      }
})