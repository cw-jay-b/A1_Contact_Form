document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-wrapper");
  const firstNameInput = document.getElementById("fname");
  const lastNameInput = document.getElementById("lname");
  const emailInput = document.getElementById("email");
  const queryTypeInputs = document.querySelectorAll('input[name="query-type"]');
  const messageInput = document.getElementById("msg");
  const consentCheckbox = document.getElementById("consent");
  const successMessage = document.getElementById("successMessage");

  const errorMessages = {
    firstName: document.querySelector("#fname ~ .error"),
    lastName: document.querySelector("#lname ~ .error"),
    email: document.querySelector("#email ~ .error"),
    queryType: document.querySelector("#query-label ~ .error"),
    message: document.querySelector("#msg ~ .error"),
    consent: document.querySelector("#form-consent-wrapper ~ .error"),
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const showError = (field, show) => {
    errorMessages[field].style.display = show ? "block" : "none";
  };

  const validateField = (input, field, validationFunc) => {
    if (validationFunc(input.value.trim())) {
      showError(field, false);
      return true;
    } else {
      showError(field, true);
      return false;
    }
  };

  const validateQueryType = () => {
    const queryTypeSelected = [...queryTypeInputs].some(
      (input) => input.checked
    );
    showError("queryType", !queryTypeSelected);
    return queryTypeSelected;
  };

  const validateForm = () => {
    let isValid = true;

    isValid =
      validateField(firstNameInput, "firstName", (value) => value !== "") &&
      isValid;
    isValid =
      validateField(lastNameInput, "lastName", (value) => value !== "") &&
      isValid;
    isValid = validateField(emailInput, "email", validateEmail) && isValid;
    isValid = validateQueryType() && isValid;
    isValid =
      validateField(messageInput, "message", (value) => value !== "") &&
      isValid;
    isValid = consentCheckbox.checked && isValid;
    showError("consent", !consentCheckbox.checked);

    return isValid;
  };

  firstNameInput.addEventListener("input", () =>
    validateField(firstNameInput, "firstName", (value) => value !== "")
  );
  lastNameInput.addEventListener("input", () =>
    validateField(lastNameInput, "lastName", (value) => value !== "")
  );
  emailInput.addEventListener("input", () =>
    validateField(emailInput, "email", validateEmail)
  );
  messageInput.addEventListener("input", () =>
    validateField(messageInput, "message", (value) => value !== "")
  );

  queryTypeInputs.forEach((input) => {
    input.addEventListener("change", validateQueryType);
  });

  consentCheckbox.addEventListener("change", () =>
    showError("consent", !consentCheckbox.checked)
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    for (const field in errorMessages) {
      showError(field, false);
    }

    successMessage.style.display = "block";

    setTimeout(() => {
      successMessage.style.display = "none";
    }, 3000);

    form.reset(); 
  });
});
