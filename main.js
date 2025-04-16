document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
  
    const usernameRegex = /^[a-zA-Z0-9._]{5,15}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordLengthRegex = /^.{8,}$/;
    const passwordUppercaseRegex = /[A-Z]/;
    const passwordSymbolRegex = /[!._%+-]/;
  
    function showError(inputElement, message) {
      let errorElement = inputElement.nextElementSibling;
      if (!errorElement || !errorElement.classList.contains("text-red-500")) {
        errorElement = document.createElement("p");
        errorElement.classList.add("text-red-500", "text-sm", "mt-1");
        inputElement.insertAdjacentElement("afterend", errorElement);
      }
      errorElement.textContent = message;
    }
  
    function clearError(inputElement) {
      const errorElement = inputElement.nextElementSibling;
      if (errorElement && errorElement.classList.contains("text-red-500")) {
        errorElement.remove();
      }
    }
  
    function validatePasswordLive() {
      const value = passwordInput.value;
  
      const rules = [
        {
          regex: passwordLengthRegex,
          message: "minimal 8 karakter tanpa spasi",
        },
        {
          regex: passwordUppercaseRegex,
          message: "minimal 1 huruf besar",
        },
        {
          regex: passwordSymbolRegex,
          message: "minimal 1 simbol (!._%+-)",
        },
      ];
  
      let ruleContainer = document.getElementById("password-rules");
  
      if (!ruleContainer) {
        ruleContainer = document.createElement("ul");
        ruleContainer.id = "password-rules";
        ruleContainer.classList.add("text-sm", "mt-2", "space-y-1");
        passwordInput.insertAdjacentElement("afterend", ruleContainer);
      }
  
      ruleContainer.innerHTML = "";
  
      rules.forEach((rule) => {
        const passed = rule.regex.test(value);
        const li = document.createElement("li");
        li.textContent = rule.message;
        li.className = passed ? "text-green-600" : "text-red-500";
        ruleContainer.appendChild(li);
      });
    }
  
    let passwordActivated = false;
  
    passwordInput.addEventListener("focus", () => {
      if (!passwordActivated) {
        passwordActivated = true;
        validatePasswordLive();
      }
    });
  
    passwordInput.addEventListener("input", () => {
      if (passwordActivated) {
        validatePasswordLive();
      }
    });
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      let isValid = true;
  
      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();
  
      if (!usernameRegex.test(username)) {
        showError(usernameInput, "Username harus terdiri dari 5-15 karakter");
        isValid = false;
      } else {
        clearError(usernameInput);
      }
  
      if (!emailRegex.test(email)) {
        showError(emailInput, "Format email tidak valid.");
        isValid = false;
      } else {
        clearError(emailInput);
      }
  
      if (
        !passwordLengthRegex.test(password) ||
        !passwordUppercaseRegex.test(password) ||
        !passwordSymbolRegex.test(password)
      ) {
        showError(passwordInput, "Password belum memenuhi semua kriteria.");
        isValid = false;
      } else {
        clearError(passwordInput);
      }
  
      if (confirmPassword !== password || confirmPassword === "") {
        showError(confirmPasswordInput, "Konfirmasi password tidak cocok.");
        isValid = false;
      } else {
        clearError(confirmPasswordInput);
      }
  
      if (isValid) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data berhasil dikirim!",
          html: `
            <div class="text-left leading-relaxed">
              <p><strong>Username:</strong> ${username}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Password:</strong> ${password}</p>
            </div>
          `,
          confirmButtonColor: "blue",
        });
  
        form.reset();
        document.getElementById("password-rules")?.remove();
        passwordActivated = false;
      }
    });
  });
  
  function togglePasswordVisibility() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const type = password.type === "password" ? "text" : "password";
    password.type = type;
    confirmPassword.type = type;
  }