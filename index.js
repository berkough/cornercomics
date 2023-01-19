
function callComicModal(){
    let seriesModal = bootstrap.Modal.getOrCreateInstance('#comic-series-modal');
    let comic = document.getElementById('searchInp').value;
    fetch(`https://metron.cloud/api/series/?format=json&name=${comic}`,{
        headers: {
            'Authentication':'Basic'
        }
    }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            for (const comicSeries of data.results){
                const listItem = document.createElement('li');
                listItem.appendChild(document.createElement('strong')
                ).textContent = comicSeries.series;
                seriesModal.appendChild(listItem);
            }
        });
}

function getComicIssues(id){
    //Pulls a list of issues for the selected series.
}

function saveIssue(){
    //Saves a comic issue to the list.
}

function deleteIssue(){
    //Deletes an issue from the list.
}