let buttons = document.querySelectorAll('.btn');
let confirmTicket = document.getElementById('confirmTicket');
let reset = document.getElementById('reset');
const list = document.getElementById('list');
let totalAmount = document.getElementById('totalAmount');
const seats = new Set();
let tk = 1100 ;
let totalTk = 0;

// For Local Storage
const allNonAc = JSON.parse(localStorage.getItem('allNonAc')) || [];
allNonAc.forEach(id=>{
   const button = document.getElementById(id);
  if(button){
    button.disabled = true;
    button.classList.remove('selected')
  }
})

// For Toggle Click a seat or button
buttons.forEach(button => {
    button.addEventListener('click',function (){
        if(this.disabled){
            alert(`${this.textContent} is already booked`)
            return;
        }
        if (seats.has(this.id)){
            seats.delete(this.id);
            this.classList.remove('selected')
            updateMoney(false);
        }
        else {
            seats.add(this.id);
            this.classList.add('selected')
            updateMoney(true);
        }
        updateBooklist();
    });
});

// For confirm a ticket
confirmTicket.addEventListener('click',()=>{
    if(seats.size === 0){
        alert('No seat Selected to confirm')
        return;
    }
  seats.forEach(seat =>{
    button = document.getElementById(seat)
    button.disabled = true;
    button.classList.remove('selected')
  });
  alert(`Confirm: ${Array.from(seats).map(id => document.getElementById(id).textContent).join(', ')}`);
  const allBookedTicket = [...allNonAc,...seats]
  localStorage.setItem('allNonAc',JSON.stringify(allBookedTicket));
  seats.clear();
})

// For Reset All seat
reset.addEventListener('click',()=>{
    localStorage.removeItem('allNonAc')

    buttons.forEach(button=>{
       button.disabled = false;
       button.classList.remove('selected')
    })
    alert('Reset all seat !!')
    updateBooklist();
})

// FOr update booking details list
 function updateBooklist() {
    list.innerHTML = ''; 
    let allseat = Array.from(seats); 
    allseat.forEach(id => {
      const listItem = document.createElement('li');
      listItem.classList.add('item'); 
      const seatText = document.getElementById(id)?.textContent || id;
      listItem.textContent = `Confirmed: ${seatText} - 1100tk`; 
  
      list.appendChild(listItem); 
    });
  }
  
  updateBooklist();

//   For Update Money
function updateMoney(isAdding){
     totalTk = isAdding ? totalTk + tk : totalTk - tk ;
     totalAmount.textContent = `Total ${totalTk} Tk`;
}
