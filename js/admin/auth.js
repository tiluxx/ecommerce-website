const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const userName = document.querySelector("#login-user-name").value;
    const userPassword = document.querySelector("#login-user-password").value;

    const user = { user: userName, pass: userPassword };
    return LoginHandler(user);
});

async function LoginHandler(user) {
    await axios
        .post("http://localhost:5500/api/auth/login.php", user, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Target-Url": "http://localhost:80",
            },
        })
        .then((res) => {
            const resData = res?.data;
            let timeoutId;
            if (resData.code !== 0) {
                document.getElementById("errorMessage").style.display = "block";
                timeoutId = setTimeout(() => {
                    document.getElementById("errorMessage").style.display =
                        "none";
                }, 3000);
                document.getElementById("errorMessage").innerHTML =
                    resData.message;
            } else {
                clearTimeout(timeoutId);
                localStorage.setItem("username", resData.data.username);
                localStorage.setItem(
                    "userFullName",
                    resData.data.firstname + resData.data.lastname
                );
                window.location.href = "/pages/admin/product-management.html";
            }
        })
        .catch((error) => {
            document.getElementById("errorMessage").style.display = "block";
            setTimeout(() => {
                document.getElementById("errorMessage").style.display = "none";
            }, 3000);
            document.getElementById("errorMessage").innerHTML = error?.message;
        });
}
