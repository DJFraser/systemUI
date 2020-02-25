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
