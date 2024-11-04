const API_URL = 'http://localhost:3000/auth'; // Update with your actual auth service URL

const authService = {
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return await response.json();
    },
    logout: () => {
        // Handle logout logic
    },
    register: async (email, password) => {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        return await response.json();
    },
};

export default authService;
