function hashPassword(password) {
    return CryptoJS.SHA256(password).toString();
}

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const hashedPassword = hashPassword(password);
            const user = { username, password: hashedPassword };
            localStorage.setItem('user', JSON.stringify(user));
            alert('User registered successfully!');
            window.location.href = 'index.html';
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.username === username) {
                const hashedPassword = hashPassword(password);
                if (storedUser.password === hashedPassword) {
                    alert('Login successful');
                    window.location.href = 'secure.html';
                } else {
                    alert('Invalid credentials');
                }
            } else {
                alert('Invalid credentials');
            }
        });
    }
});
