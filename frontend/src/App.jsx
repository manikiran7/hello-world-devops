import { useEffect, useState } from "react";

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

async function loadUsers() {
    try {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
    async function createUser(event) {
        event.preventDefault();

        if (!name || !email) {
            setMessage("Name and email are required");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create user");
            }

            setMessage("User created successfully");

            setName("");
            setEmail("");

            await loadUsers();
        } catch (error) {
            console.error(error);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

useEffect(() => {
    async function fetchUsers() {
        try {
            const response = await fetch("/api/users");

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
            setMessage("Failed to load users");
        }
    }

    fetchUsers();
}, []);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1>User Management</h1>

                <form onSubmit={createUser}>
                    <div style={styles.field}>
                        <label>Name</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter name"
                        />
                    </div>

                    <div style={styles.field}>
                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter email"
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create User"}
                    </button>
                </form>

                {message && <p>{message}</p>}

                <hr />

                <h2>Users</h2>

                {users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <div>
                        {users.map((user) => (
                            <div key={user.id} style={styles.user}>
                                <strong>{user.name}</strong>
                                <span>{user.email}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f4f5",
        padding: "40px",
    },

    card: {
        width: "500px",
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    },

    field: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "15px",
        gap: "6px",
    },

    user: {
        display: "flex",
        flexDirection: "column",
        padding: "12px",
        marginBottom: "10px",
        background: "#f4f4f5",
        borderRadius: "8px",
    },
};

export default App;