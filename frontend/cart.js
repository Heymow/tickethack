document.querySelector('.delete').addEventListener('click',

    function () {
        fetch(`http://localhost:3000/:userId/trips/:tripId`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    this.parentNode.remove();
                }
            });
    }
)