const signInFromHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#user-signin').value.trim();
    const password = document.querySelector('#password-signin').value.trim();

    if(name && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({name, password}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }    
}

document
.querySelector('.signin-form')
.addEventListener('submit', signInFromHandler);