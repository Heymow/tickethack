// document.querySelector('.delete').addEventListener('click',
//     function () {
//         fetch(`http://localhost:3000/`, { method: 'DELETE' })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.result) {
//                     this.parentNode.remove();
//                 }
//             });
//     }
// )

let total = 0;

const user = '6683f2d5a3275fef1fdefd68';

async function fetchCart() {

    const fetchedCart = await fetch(`http://localhost:3000/users/${user}/viewCart`);
    const cart = await fetchedCart.json();

    if (cart.result) {
        document.querySelector('.text-container').innerHTML = ''
        for (let e of cart.cart) {

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
            const HTMLCart = `
            <table id="tablecart">
                <tr>
                    <td id="firstColumn">${e.departure}-${e.arrival}</td>
                    <td id="secondColumn">${formatedDateFinal} - ${formatedHour}</td>
                    <td id="thirdColumn">${e.price}€</td>
                    <td id="fourthColumn">${timeLeftPhrase}</td>
                    <td id="fifthColumn"><input class="delete" type="button" value="delete" /></td>
                </tr>
            </table>
            </br>
            `
            document.querySelector('.text-container').innerHTML += HTMLCart;
            total += e.price;

            let userTripId = e._id
            console.log(typeof (userTripId))
            document.querySelector('.delete').addEventListener('click', async () => {
                await fetch(`http://localhost:3000/users/${user}/trips/${userTripId}`, {
                    method: "DELETE"
                }
                )
                this.remove();
            })
        }
        document.querySelector('#total').innerHTML =
            ` <div id="total">

                <div id="montant">
                    Total : ${total} €
                </div>
        
                <div id="purchase">
                    <input class="purchase" type="button" value="Purchase"></input>
                </div>
        
            </div>
        
            </div>`
        document.querySelector('.purchase').addEventListener('click', async () => {
            const fetchedBuy = fetch(`http://localhost:3000/users/${user}/buy`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            });
            // const buyResponse = await fetchedBuy.json();
            // if (buyResponse.result) {
            window.location.assign('./booking.html')
            // }
        })
    }

}



fetchCart();