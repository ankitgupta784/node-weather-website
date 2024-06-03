console.log('Client side javascript file is loaded!');




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    console.log("location--->>",location);
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error);
            messageOne.textContent = data.error
        }
        else{
            console.log(data.forecast);
            console.log(data.address);
            messageOne.textContent = data.forecast;
            messageTwo.textContent = data.address;
        }
    })
})  // This is a browser based API, not available in node.js

});