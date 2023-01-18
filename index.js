let comic = 'x-men';
let url = `https://metron.cloud/api/series/?name=${comic}`

let req = fetch(url,{
    credentials: 'include',
    mode: 'no-cors',
    headers: {
        'Authentication':'Basic',
    }
})
    .then(response => {
        console.log(response);
    });

console.log(req);