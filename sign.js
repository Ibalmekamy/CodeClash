const apiKey = '719ce93d-f7ed-4169-b1e4-4c27da50aa1d';
const basketName = 'Storage';
const apiUrl = `https://getpantry.cloud/apiv1/pantry/${apiKey}/basket/${basketName}`;

let login = document.getElementById("login");
let username = document.getElementById("username");
let pass = document.getElementById("password");
let btn = document.getElementById("submit");
let errorMessage = document.getElementById("error-message");

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    if (pass.value === "" || username.value === "") {
        errorMessage.textContent = "*Enter a valid username or password";
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
        if (!pass.value.match(/[^a-zA-Z0-9]/) || pass.value.length < 8) {
            errorMessage.textContent = "*Enter a valid password";
            errorMessage.style.display = "block";
        } else {
            try {
                // Fetch existing data
                let response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                let existingData = {};
                if (response.ok) {
                    existingData = await response.json();
                } else {
                    console.error('Failed to retrieve existing data:', response.statusText);
                }

                if (existingData[username.value]) {
                    errorMessage.textContent = "*Already registered";
                    errorMessage.style.display = "block";
                } else {
                    existingData[username.value] = pass.value; // Append new data

                    // Store updated data
                    response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(existingData)
                    });
                    if (response.ok) {
                        console.log('User credentials stored successfully');
                        errorMessage.textContent = "Signed up successfully";
                        errorMessage.style.display = "block";
                        setTimeout(() => {
                            window.location.href = `Main/index.html`;
                        }, 2000);
                    } else {
                        console.error('Failed to store user credentials:', response.statusText);
                    }
                }
            } catch (error) {
                console.error('Error storing user credentials:', error);
            }
            btn.disabled = true;
        }
    }
});

login.addEventListener("click", async (evt) => {
    setTimeout(() => {
        window.location.href = `login.html`;
    }, 2000);
});
