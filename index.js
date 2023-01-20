/**
 * CornerComics Issue Tracker
 */

//Global Variables.
const URL = `https://metron.cloud/api`; //API url

const comicModalBody = document.getElementById('comic-modal-body');
const comicModalBodyTitle = document.getElementById('comic-modal-title');
const comicList = document.getElementById('comic-list');

//Start the functions.
async function callComicModal(){
    //Pulls a list of series based on a search term.
    let comic = document.getElementById('searchInp').value; //Grab the value in the search box.
    comicModalBody.innerHTML = ''; //Clear the innerHTML for subsequent searches.
    //Fetch the list of comic series based on your search phrase:
    await fetch(`${URL}/series/?format=json&name=${comic}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            //For each comic series in the json data return a link that passes in 
            for (const comicSeries of data.results){
                let comicSeriesItem = `<a href="#" onclick="getComicIssues(${comicSeries.id});return false;" 
                        data-target="#comic-modal-body">${comicSeries.series}</a><br>`;
                comicModalBody.innerHTML += comicSeriesItem;
            }
        });
}

async function getComicIssues(id){
    comicModalBody.innerHTML = '';
    await fetch(`${URL}/series/${id}/issue_list`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            for (const comicIssue of data.results){
                let comicIssueItem = `<a href="#" onclick="saveIssue(${comicIssue.id});return false;">${comicIssue.issue}</a><br>`;
                comicModalBodyTitle.innerHTML = 'Pick an issue to add to your list:';
                comicModalBody.innerHTML += comicIssueItem;
            }
        });
}

//Saves a comic issue to the list.
async function saveIssue(id){
    await fetch(`${URL}/issue/${id}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            comicList.innerHTML += `<div class="container-fluid border border-primary p-4" id="${data.id}">
                                        <div class="row text-center">
                                            <div class="col-3 align-self-start"><img src="${data.image}" width="80%" alt=""><br>
                                            <p>${data.series.name}<br>Issue #${data.number}<br>Date: ${data.store_date}</p>
                                            </div>
                                            <div class="col-6">
                                                <p>${data.name}</p><br>
                                                <p>${data.desc}</p>
                                            </div>
                                            <div class="col-3">
                                                <button class="btn btn-primary" onclick="deleteIssue(${data.id})">Delete</button>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-8 input-group">
                                                <span class="input-group-text primary-outline">Notes</span>
                                                <textarea class="form-control primary-outline" aria-label="Notes"></textarea>
                                            </div>
                                            <div class="col-4">
                                                <button class="btn btn-primary" onclick="saveNotes()">Save</button>
                                            </div>
                                        </div>
                                    </div>`;

        });
}

function deleteIssue(id){
    //Deletes an issue from the list.
    console.log(`Deleted Comic with ID of ${id}`);
    document.getElementById(`${id}`).remove();
}

function saveNotes(){

}