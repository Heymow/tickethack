const userId = '6683f2d5a3275fef1fdefd68';


document.querySelector('.bouton-lien').addEventListener('click', function () {


    const destination = {
        departure: document.querySelector('#departure').value,
        arrival: document.querySelector('#arrival').value,
        date: document.querySelector('#date').value
    }
    if (!destination.departure || !destination.arrival) {
        return;
    }
    fetch(`http://localhost:3000/trips/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(destination)
    })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                document.querySelector("#train").innerHTML = ''

                for (let i = 0; i < data.foundTrips.length; i++) {
                    let tripId = data.foundTrips[i]._id;
                    let formattedDate = new Date(data.foundTrips[i].date);

                    let dateDay = formattedDate.getDate();
                    dateDay < 10 && (dateDay = `0${dateDay}`);
                    let dateMonth = formattedDate.getMonth() + 1;
                    dateMonth < 10 && (dateMonth = `0${dateMonth}`);
                    let dateYear = formattedDate.getFullYear();
                    let dateHour = formattedDate.getHours();
                    dateHour < 10 && (dateHour = `0${dateHour}`);
                    let dateMinute = formattedDate.getMinutes();
                    dateMinute < 10 && (dateMinute = `0${dateMinute}`);

                    let formattedHour = `${dateHour}:${dateMinute}`
                    let formattedDateFinal = `${dateDay}/${dateMonth}/${dateYear}`

                    document.querySelector("#train").innerHTML += `
<div id="text-train">${formattedDateFinal}   ${data.foundTrips[i].departure}>${data.foundTrips[i].arrival}  ${formattedHour}  ${data.foundTrips[i].price}€</div>
 <input class="booking" type="button" value="Book" />`

                    let targettedButtonArray = document.querySelectorAll(".booking");
                    for (let j = 0; j < targettedButtonArray.length; j++) {
                        targettedButtonArray[j].addEventListener('click', async () => {
                            const fetched = await fetch(`http://localhost:3000/users/${userId}/addToCart`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ tripId })
                            });
                            const response = await fetched.json();
                            if (response.result) {
                                window.location.assign('./cart.html')
                            }

                        })
                    }
                }
            } else {
                document.querySelector("#acceuil").innerHTML = `
                  <img id="no-found" src="./images/notfound.png" alt="no trip found">
                <p id="no-train">No trip found.</p>
`
            }
        })
}
)