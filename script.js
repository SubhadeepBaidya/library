document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const addBookForm = document.getElementById('addBookForm');
    const booksList = document.getElementById('booksList');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'dashboard.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            try {
                const response = await fetch('/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });
                const data = await response.json();
                if (response.ok) {
                    window.location.href = 'login.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    if (addBookForm) {
        addBookForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const publishedDate = document.getElementById('published_date').value;
            try {
                const response = await fetch('/books/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({ title, author, published_date: publishedDate }),
                });
                const data = await response.json();
                if (response.ok) {
                    alert('Book added successfully');
                    loadBooks();
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    if (booksList) {
        async function loadBooks() {
            try {
                const response = await fetch('/books/list', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                });
                const data = await response.json();
                booksList.innerHTML = data.map(book => `
                    <li class="list-group-item">${book.title} by ${book.author} (Published on: ${book.published_date})</li>
                `).join('');
            } catch (error) {
                console.error('Error:', error);
            }
        }
        loadBooks();
    }
});
