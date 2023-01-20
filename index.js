const url = `proxy.php?url=https://metron.cloud/api`;
let issueBlock = ``;
let seriesModal = document.getElementById('series-list');
let seriesModalTitle = document.getElementById('series-modal-title');

async function callComicModal(){
    //Pulls a list of series based on a search term.
    let comic = document.getElementById('searchInp').value;
    await fetch(`${url}/series/?format=json&name=${comic}`,{
    }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            for (const comicSeries of data.results){
                let comicSeriesItem = `<a href="#" onclick="getComicIssues(${comicSeries.id});return false;" 
                        data-target="#comic-issue-modal">${comicSeries.series}</a><br>`;
                seriesModal.innerHTML += comicSeriesItem;
            }
        });
}

async function getComicIssues(id){
    //Pulls a list of issues for the selected series.
    let comicIssueModal = document.getElementById('issue-list');
    await fetch(`${url}/series/${id}/issue_list`).then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            for (const issue of data.results){
                comicIssueItem = `${issue.issue}`;
                seriesModal.innerHTML = '';
                seriesModalTitle.innerHTML = 'Pick an issue to add to your list:';
                //seriesModal.innerHTML += issueBlock;
            }
        });
}

function saveIssue(){
    //Saves a comic issue to the list.
}

function deleteIssue(){
    //Deletes an issue from the list.
}