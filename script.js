const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const toggleText = document.getElementById("toggle-text");
const toggleLink = document.getElementById("toggle-link");
const messageDiv = document.getElementById("message");

let isLogin = true;

// Toggle between Login and Sign Up
toggleLink.addEventListener("click", () => {
  isLogin = !isLogin;
  updateForm();
});

function updateForm() {
  if (isLogin) {
    formTitle.textContent = "Login";
    submitBtn.textContent = "Login";
    toggleText.innerHTML = `Don't have an account? <a id="toggle-link">Sign Up</a>`;
  } else {
    formTitle.textContent = "Sign Up";
    submitBtn.textContent = "Sign Up";
    toggleText.innerHTML = `Already have an account? <a id="toggle-link">Login</a>`;
  }
  messageDiv.innerHTML = "";
  rebindToggleLink();
}

// Rebind the toggle link after replacing innerHTML
function rebindToggleLink() {
  document.getElementById("toggle-link").addEventListener("click", () => {
    isLogin = !isLogin;
    updateForm();
  });
}

// Handle submit
submitBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  messageDiv.innerHTML = "";

  if (email === "" || password === "") {
    showMessage("Please fill all fields.", "error");
    return;
  }

  if (!validateEmail(email)) {
    showMessage("Invalid email format.", "error");
    return;
  }

  if (isLogin) {
    loginUser(email, password);
  } else {
    signupUser(email, password);
  }
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function signupUser(email, password) {
  if (password.length < 6) {
    showMessage("Password must be at least 6 characters.", "error");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    showMessage("User already exists!", "error");
  } else {
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    showMessage("Signup successful! Please login now.", "success");
    isLogin = true;
    updateForm();
  }
}

function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const validUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (validUser) {
    showMessage("Login successful! Redirecting...", "success");
    setTimeout(() => {
      window.location.href = "welcome.html";
    }, 1500);
  } else {
    showMessage("Invalid email or password.", "error");
  }
}

function showMessage(msg, type) {
  messageDiv.innerHTML = `<p class="${type}">${msg}</p>`;
}
