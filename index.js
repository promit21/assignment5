// Set Inner Text Function
function setInnerText(id, value) {
    document.getElementById(id, value).innerText = value;
}

const maxSeats = 4;
let selectedSeats = 0;
let selectedSeatDetails = [];

function handleButtonClick(btn) {
    if (btn.classList.contains('bg-green-500')) {
        btn.classList.remove('bg-green-500');
        selectedSeats--;

        const seatIndex = selectedSeatDetails.findIndex(seat => seat.id === btn.textContent);
        selectedSeatDetails.splice(seatIndex, 1);
    } else {
        if (selectedSeats < maxSeats) {
            btn.classList.add('bg-green-500');
            selectedSeats++;

            selectedSeatDetails.push({
                id: btn.textContent,
                class: "Business",
                price: "550 Taka"
            });
        } else {

            alert('Maximum 4 seats selected!');
        }
    }

    setInnerText('seat-count', selectedSeats);

    const seatsLeft = 40 - selectedSeats;
    setInnerText('seats-left', seatsLeft);


    updateSelectedSeatsList();
}

function updateSelectedSeatsList() {
    const selectedSeatsContainer = document.getElementById('selected-seat');
    selectedSeatsContainer.innerHTML = '';

    let totalPrice = 0;


    selectedSeatDetails.forEach(seat => {
        const seatElement = document.createElement('div');
        seatElement.innerHTML = `
            <p>${seat.id}</p>
            <p>${seat.class}</p>
            <p>${seat.price}</p>
        `;
        selectedSeatsContainer.appendChild(seatElement);
    
        totalPrice += parseInt(seat.price.replace(/[^\d.-]/g, ''));
    });


    setInnerText('total-price', `BDT - ${totalPrice}`);
}



function setInnerText(id, value) {
    document.getElementById(id).innerText = value;
}

function applyCoupon() {

    const couponInput = document.getElementById('coupon-code');
    const couponCode = couponInput.value.trim();

    const totalPriceText = document.getElementById('total-price').innerText;
    let totalPrice = parseFloat(totalPriceText.replace(/[^\d.]/g, ''));


    let discountAmount = 0;
    let grandPrice = 0;

    switch (couponCode) {
        case "NEW15":
            discountAmount = totalPrice * 0.15;
            break;
        case "Couple 20":
            discountAmount = totalPrice * 0.20;
            break;
        default:

            alert("Invalid coupon code!");
            return;
    }


    grandPrice = totalPrice - discountAmount;

    setInnerText('grand-price', `BDT - ${grandPrice.toFixed(2)}`); 
}

document.addEventListener('DOMContentLoaded', function () {
    const applyButton = document.getElementById('apply-coupon');
    applyButton.addEventListener('click', applyCoupon);
});




document.addEventListener('DOMContentLoaded', function () {
    const allbtn = document.getElementsByClassName('seat-btn');
    for (const btn of allbtn) {
        btn.addEventListener('click', function (e) {
            handleButtonClick(btn);
        });
    }
});

