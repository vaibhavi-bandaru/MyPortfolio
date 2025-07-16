fetch('http://localhost:3000/patients')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Render to HTML
    const list = document.getElementById('patient-list');
    data.forEach(patient => {
      const li = document.createElement('li');
      li.textContent = patient.name;  // or other fields like patient.email
      list.appendChild(li);
    });
  })
  .catch(err => console.error('Error fetching data:', err));
