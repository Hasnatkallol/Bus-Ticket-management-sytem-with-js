const menu = document.getElementById('menu');
const nav = document.getElementById('nav');


menu.addEventListener('click',()=>{
    nav.classList.toggle('active-m');
})

// For Available bus
document.getElementById('bookingForm').addEventListener('submit',(e)=>{
    e.preventDefault();

    // Get data
    let from = document.getElementById('from').value.trim();
    let to = document.getElementById('to').value.trim();
    let date = document.getElementById('date').value.trim();

    const buses= [
        { id: 1,description:" Sleeper Coach ", name: "Sleeper Coach", time: "10:00 AM", seats: 10 },
        { id: 2,description:"Ac ", name: "Ac super", time: "12:00 PM", seats: 20 },
        { id: 3,description:" Non Ac ", name: "NonAc Classic", time: "2:00 PM", seats: 20 },
        { id: 4, description:"You can select AC and Non Ac ", name: "Super Classic", time: "4:00 PM", seats: 20 },
    ]
    const busList = document.getElementById('busList');
    busList.innerHTML = '';

    if(from && to && date){
        document.getElementById('availableBus').classList.remove('hidden');
        buses.forEach(bus =>{
            const busItem = document.createElement('div')
            busItem.classList.add('bus-item');
            busItem.innerHTML = 
            `
                    <h3>${bus.name}</h3>
                    <p>Time: ${bus.time}</p>
                    <p>Available Seats: ${bus.seats}</p>
                    <p>Description: ${bus.description}</p>
                    <button onclick="bookBus(${bus.id})">Book Now</button>
            `;
            busList.appendChild(busItem);
        })
    }
    else{
        alert('Please fill all the fields');
    }

})
// Going to ticket page
function bookBus(busId) {
    // Navigate based on bus ID
    if (busId === 1) {
        window.location.href = "sleeper.html";
    } else if (busId === 2) {
        window.location.href = "ac.html";
    } else if (busId === 3) {
        window.location.href = "nonac.html";
    } else if (busId === 4) {
        window.location.href = "super.html";
    } else {
        alert("Bus not found!");
    }
}


  