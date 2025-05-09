import Swal from "sweetalert2";

const MONGO_API_URL = "http://localhost:8080/api/v0/users";
const MYSQL_API_URL = "http://localhost:8081/api/v0/users";

export async function useUsersFromBoth() {
    const responses = await Promise.all([
        fetch(MONGO_API_URL),
        fetch(MYSQL_API_URL),
    ]);
    
    if(!responses[0].ok || !responses[1].ok) {
        Swal.fire({
            title: "Erro ao carregar usuários!",
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            theme: "dark",
            confirmButtonColor: "#2196f3"
        });
        return null;
    }

    const data = await Promise.all([responses[0].json(), responses[1].json()]);

    return data;
}

export async function getUsersFromMongo() {
    const response = await fetch(MONGO_API_URL);
    
    if(!response.ok) {
        Swal.fire({
            title: "Erro ao carregar usuários!",
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            theme: "dark",
            confirmButtonColor: "#2196f3"
        });
        return null;
    }

    const data = await response.json();

    return data;
}

export async function getUsersFromMysql() {
    const response = await fetch(MYSQL_API_URL);
    
    if(!response.ok) {
        Swal.fire({
            title: "Erro ao carregar usuários!",
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            theme: "dark",
            confirmButtonColor: "#2196f3"
        });
        return null;
    }

    const data = await response.json();

    return data;
}

export async function saveUserMongo(user) {
    const response = await fetch(MONGO_API_URL, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify(user)
    });

    if(!response.ok) {
        Swal.fire({
            title: "Erro ao salvar usuário no MongoDb!",
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            theme: "dark",
            confirmButtonColor: "#2196f3"
        });

        return;
    }

    const data = await response.json();

    return data;
}

export async function saveUserMysql(user) {
    const response = await fetch(MYSQL_API_URL, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify(user)
    });

    if(!response.ok) {
        Swal.fire({
            title: "Erro ao salvar usuário no MySQL!",
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            theme: "dark",
            confirmButtonColor: "#2196f3"
        });

        return;
    }

    const data = await response.json();

    return data;
}