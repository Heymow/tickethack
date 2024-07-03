
document.querySelector('.bouton-lien').addEventListener('click', function () {

    const destination = {
        departure: document.querySelector('#departure').value,
        arrival: document.querySelector('#arrival').value,
        date: document.querySelector('#date').value
    }
    fetch(`http://localhost:3000/trips/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(destination)
    })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
<<<<<<< HEAD
                document.querySelector("#train").innerHTML = "";
                for (let i = 0; i < data.foundTrip.length; i++) {
=======
                for (let i = 0; i < data.foundTrips.length; i++) {
>>>>>>> f1b23e942bdb938a96f7c1bffe24dd4a3913b0b9
                    document.querySelector("#train").innerHTML += `
<div class="booking">${data.foundTrips[i].departure}>${data.foundTrips[i].arrival} ${data.foundTrips[i].date} ${data.foundTrips[i].price}</div>`

                }
            } else {
                document.querySelector("#accueil").innerHTML = `
                  <img id="no-found" src="./images/notfound.png" alt="no trip found">
                <p id="no-train">No trip found</p>
`
            }
        })
}
)

