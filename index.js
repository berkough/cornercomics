/**
 * CornerComics Issue Tracker
 */

//Global Variables.
//const URL = `https://metron.cloud/api`; // <-- Use this if websecurity is disabled in Chrome.
const URL = `proxy.php?url=https://metron.cloud/api`; //<-- Use this if you're ENVs are set.


const comicModalBody = document.getElementById('comic-modal-body');
const comicModalBodyTitle = document.getElementById('comic-modal-title');
const comicList = document.getElementById('comic-list');

//Check localstorage to see if there is already a list saved.
localStorage.getItem('list') ? comicList.innerHTML = localStorage.getItem('list') : console.log('No list in storage!');

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
    comicModalBody.innerHTML = ''; //Clear the modal so that we can populate it with the new data.
    await fetch(`${URL}/series/${id}/issue_list`) //Grab the list of issues from the sereis we just selected.
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            //Generate a bunch of links to add specific comic issues to our list.
            for (const comicIssue of data.results){
                let comicIssueItem = `<a href="#" onclick="saveIssue(${comicIssue.id});return false;">${comicIssue.issue}</a><br>`;
                comicModalBodyTitle.innerHTML = 'Pick an issue to add to your list:';
                comicModalBody.innerHTML += comicIssueItem;
            }
        });
}

//Saves a comic issue to the list.
async function saveIssue(id){
    await fetch(`${URL}/issue/${id}`) //Grab the specific issue information.
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data); //Create a bunch of divs and dump the relevant comic issue data into those divs.
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
                                            <div class="col-8 input-group" id="noteDiv${data.id}">
                                                <span class="input-group-text primary-outline">Notes</span>
                                                <textarea class="form-control primary-outline" aria-label="Notes" id="notes${data.id}"></textarea>
                                            </div>
                                            <div class="col-4" id="btnDiv${data.id}">
                                                <button class="btn btn-primary" onclick="saveNotes(${data.id})">Save</button>
                                            </div>
                                        </div>
                                    </div>`;

        });
}

function deleteIssue(id){
    //Deletes an issue from the list.
    console.log(`Deleted Comic with ID of ${id}`);
    document.getElementById(`${id}`).remove(); //The ID from the API populates our onclick for the delete button when the issues is added.
    localStorage.setItem('list',comicList.innerHTML);
}

function saveNotes(id){
    let noteField = document.getElementById(`notes${id}`); //Grab the value of the text area and post it.
    let savedNote = noteField.value; //Save the value of the notefield.
    noteField.remove(); //Remove the note field...
    document.getElementById(`noteDiv${id}`).innerHTML = `<p>${savedNote}</p>`; //Populate the note field 
}

// function editNotes(){
//     //Button for editing notes again?
// }

function saveList(){
    //Save Entire Comic List for later.
    console.log(document.getElementById('comic-list'));
    localStorage.setItem('list',document.getElementById('comic-list').innerHTML);
}

function clearList(){
    //Clear the list from localStorage and div.
    localStorage.clear();
    comicList.innerHTML = '';
}