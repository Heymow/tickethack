
document.querySelector('#button-searched').addEventListener('click', function () {
    const destination = {
        departure: document.querySelector('#departure').value,
        arrival: document.querySelector('#arrival').value,
        date: document.querySelector('#date').value
    }
    fetch(`http://localhost:3000/trips/search?departure=${destination.departure}&arrival=${destination.arrival}&date=${destination.date}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(destination)
    })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                document.querySelector("#train").innerHTML = "";
                for (let i = 0; i < data.foundTrip.length; i++) {
                    document.querySelector("#train").innerHTML += `
<div class="booking">${data.foundTrip[i].departure}>${data.foundTrip[i].arrival} ${data.foundTrip[i].date} ${data.foundTrip[i].price}</div>`
                }
            } else {
                document.querySelector("#train").innerHTML =
            }
        })
}
)

