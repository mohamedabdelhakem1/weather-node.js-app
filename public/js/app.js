console.log("client side");

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#message-1');
const msgtwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value;
    msgOne.textContent = 'Loading...'
    msgtwo.textContent = ''
    
    
    fetch('http://localhost:3000/Weather?address=' +location  ).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msgOne.textContent = data.error
               
            }else{
                msgOne.textContent = data.location
                msgtwo.textContent = data.forecast
                
            }
        })
    })
    
})