// const buttons = document.querySelectorAll('.button-container button:not(#disableBtn)');
const buttons = document.querySelectorAll('button:not(#confirmTicket,#reset)');
const confirmTicket = document.getElementById('confirmTicket');
const reset = document.getElementById('reset');
const list = document.getElementById('list');
const seats = new Set();
let totalAmount = document.getElementById('totalAmount');
let totalTk = 0;
let className = document.querySelectorAll('economy')

const bookedTicket = JSON.parse(localStorage.getItem('bookedTicket')) || [];
bookedTicket.forEach(id => {
    const button = document.getElementById(id);
    if (button) {
        button.disabled = true;
        button.classList.remove('selected');
    }
});

// Update total money
function updateMoney(classType, isAdding) {
  let tk = classType === "economy" ? 1400 : 1100;
  totalTk = isAdding ? totalTk + tk : totalTk - tk ;
  totalAmount.textContent = `Total Tk : ${totalTk}`;
}

// Toggle selection by clicking buttons
buttons.forEach(button => {
  button.addEventListener('click', function () {
      const classType = this.classList.contains('economy') ? 'economy' : 'regular';
      if (this.disabled) {
          alert(`${this.textContent} is already disabled.`);
          return;
      }
      if (seats.has(this.id)) {
          seats.delete(this.id);
          this.classList.remove('selected');
          updateMoney(classType, false); // Deduct amount
      } else {
          seats.add(this.id);
          this.classList.add('selected');
          updateMoney(classType, true); // Add amount
      }
      updateBooklist();
  });
});
// Booked ticket by clicking buttons
confirmTicket.addEventListener('click',()=>{

  if (seats.size === 0) {
    alert('No seats selected to Confirm.');
    return;
  }

    seats.forEach(seat =>{
        let button = document.getElementById(seat)
        button.disabled = true ;
        button.classList.remove('selected')
    });
     alert(`Confirm: ${Array.from(seats).map(id => document.getElementById(id).textContent).join(', ')}`);  
     const allBookedTicket = [...bookedTicket,...seats]
     localStorage.setItem('bookedTicket', JSON.stringify(allBookedTicket));
     seats.clear();
    
})

// FOR reset Ticket
reset.addEventListener('click',()=>{

  localStorage.removeItem('bookedTicket');

  buttons.forEach(button =>{
    button.disabled = false;
    button.classList.remove('selected')
  })
  alert('Reset all seat')
  updateBooklist();
})


function updateBooklist() {
  list.innerHTML = ''; 
  let allseat = Array.from(seats); 
  allseat.forEach(id => {
    const listItem = document.createElement('li');
    listItem.classList.add('item'); 
    const seatText = document.getElementById(id)?.textContent || id;
    listItem.textContent = `Confirmed: ${seatText} `; 
    list.appendChild(listItem); 
  });
}





// For list item
function updateBooklist(){
  list.innerHTML = '';
  let allseat = Array.from(seats);
  allseat.forEach(id=>{
    const listItem = document.createElement('li');
    listItem.classList.add('item');
    const seatText = document.getElementById(id)?.textContent || id;
    listItem.textContent = `Confirmed: ${seatText}`;
    list.appendChild(listItem);
  })
}
updateBooklist();




