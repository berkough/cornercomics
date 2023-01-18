let comic = 'x-men';
let url = `https://metron.cloud/api/series/?name=${comic}`

let req = fetch(url,{
    crossDomain: true
})
    .then(response => {
        console.log(response);
        JSON.parse(response);
    });

console.log(req);