const user = '6683f2d5a3275fef1fdefd68';

async function fetchBookings() {

    const fetchedBookings = await fetch(`http://localhost:3000/users/${user}/viewBookings`);
    const bookings = await fetchedBookings.json();

    if (bookings.result) {
        document.querySelector('.text-container').innerHTML = ''
        for (let e of bookings.bookings) {

            let formatedDate = new Date(e.date);

            let dateDay = formatedDate.getDate();
            dateDay < 10 && (dateDay = `0${dateDay}`);
            let dateMonth = formatedDate.getMonth() + 1;
            dateMonth < 10 && (dateMonth = `0${dateMonth}`);
            let dateYear = formatedDate.getFullYear();
            let dateHour = formatedDate.getHours();
            dateHour < 10 && (dateHour = `0${dateHour}`);
            let dateMinute = formatedDate.getMinutes();
            dateMinute < 10 && (dateMinute = `0${dateMinute}`);

            let formatedHour = `${dateHour}:${dateMinute}`
            let formatedDateFinal = `${dateDay}/${dateMonth}/${dateYear}`

            let now = new Date()
            let timeLeft = formatedDate - now;
            let daysLeft = new Date(timeLeft).getDay();
            let hoursLeft = new Date(timeLeft).getHours();
            let minutesLeft = new Date(timeLeft).getMinutes();

            let timeLeftPhrase = `Departure in `;
            if (minutesLeft) {
                if (hoursLeft) {
                    if (daysLeft) {
                        timeLeftPhrase += `${daysLeft} days `;
                    }
                    timeLeftPhrase += `${hoursLeft} hours `;
                }
                timeLeftPhrase += `${minutesLeft} minutes `;
            }

            let date = String(e.date).slice(0, 10)
            const HTMLBookings = `
            <table id="tableBooking">
                <tr>
                    <td id="firstColumn">${e.departure}-${e.arrival}</td>
                    <td id="secondColumn">${formatedDateFinal} - ${formatedHour}</td>
                    <td id="thirdColumn">${e.price}€</td>
                    <td id="fourthColumn">${timeLeftPhrase}</td>
                </tr>
            </table>
            </br>
            `
            document.querySelector('.text-container').innerHTML += HTMLBookings;
        }

    }

}

fetchBookings();