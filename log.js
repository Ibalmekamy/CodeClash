const apiKey = '719ce93d-f7ed-4169-b1e4-4c27da50aa1d';
        const basketName = 'Storage';
        const apiUrl = `https://getpantry.cloud/apiv1/pantry/${apiKey}/basket/${basketName}`;

        let loginForm = document.getElementById("login-form");
        let usernameInput = document.getElementById("username");
        let passwordInput = document.getElementById("password");
        let errorMessage = document.getElementById("error-message");

        loginForm.addEventListener("submit", async (evt) => {
            evt.preventDefault();

            const username = usernameInput.value;
            const password = passwordInput.value;

            if (username === "" || password === "") {
                errorMessage.textContent = "Please fill in all fields.";
                errorMessage.style.display = "block";
                return;
            }

            try {
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
                    errorMessage.textContent = "Failed to retrieve user data.";
                    errorMessage.style.display = "block";
                    return;
                }

                if (existingData[username] === password) {
                    console.log('Login successful');
                    setTimeout(() => {
                        window.location.href = 'main/index.html';
                    }, 2000);
                } else {
                    errorMessage.textContent = "Invalid username or password.";
                    errorMessage.style.display = "block";
                }
            } catch (error) {
                console.error('Error verifying user credentials:', error);
                errorMessage.textContent = "An error occurred. Please try again.";
                errorMessage.style.display = "block";
            }
        });