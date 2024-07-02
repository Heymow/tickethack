document.querySelector('.delete').addEventListener('click',
    function () {
        fetch(`http://localhost:3000/weather/${this.id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                this.parentNode.remove();
            }
        });
    }
)