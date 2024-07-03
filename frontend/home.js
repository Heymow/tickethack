
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
                document.querySelector("#train").innerHTML = ''
                for (let i = 0; i < data.foundTrips.length; i++) {
                    document.querySelector("#train").innerHTML += `
<div class="trip">${data.foundTrips[i].departure}>${data.foundTrips[i].arrival} ${data.foundTrips[i].date} ${data.foundTrips[i].price}</div>`

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

