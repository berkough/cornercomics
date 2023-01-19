
function callComicModal(){
    let seriesModal = document.getElementById('series-list');
    let comic = document.getElementById('searchInp').value;
    fetch(`https://metron.cloud/api/series/?format=json&name=${comic}`,{
        headers: {
            'Authentication':'Basic'
        }
    }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            for (const comicSeries of data.results){
                let comicSeriesItem = `<a href="#" onclick="getComicIssues(${comicSeries.id});return false;" 
                        data-target="#comic-issue-modal">${comicSeries.series}</a><br>`;
                seriesModal.innerHTML = seriesModal.innerHTML + comicSeriesItem;
            }
        });
}

function getComicIssues(id){
    //Pulls a list of issues for the selected series.
    let comicIssueModal = document.getElementById.apply('issue-list');
    fetch(`https://metron.cloud/api/series/${id}/issue_list`).then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            for (const issue of data.results){
                comicIssueItem = `${issue.issue}`;
                console.log(comicIssueItem);
            }
        })
}

function saveIssue(){
    //Saves a comic issue to the list.
}

function deleteIssue(){
    //Deletes an issue from the list.
}