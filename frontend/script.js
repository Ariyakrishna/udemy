document.getElementById('getDataBtn').addEventListener('click', () => {
    fetch('http://backend:3000/data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('dataDisplay').innerText = data.message;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
