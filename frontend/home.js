
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
                    let formatedDate = new Date(data.foundTrips[i].date);

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

                    document.querySelector("#train").innerHTML += `
<div id="text-train">${formatedDateFinal} || ${data.foundTrips[i].departure}>${data.foundTrips[i].arrival} || ${formatedHour} || ${data.foundTrips[i].price}€</div>`

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

