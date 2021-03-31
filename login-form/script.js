const init = () => {
  const validateEmail = ($element) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = regex.test($element.value);

    !isValidEmail && setError($element);
    isValidEmail && removeError($element);
  };

  const validatePassword = ($element) => {
    const isInvalid = $element.value.length < 8;
    isInvalid && setError($element);
    !isInvalid && removeError($element);
  };

  const setError = ($element) => {
    $element.removeAttribute("valid");
    $element.nextElementSibling.classList.add("error");
    updateFormState($element);
  };

  const removeError = ($element) => {
    $element.setAttribute("valid", "");
    $element.nextElementSibling.classList.remove("error");
    updateFormState($element);
  };

  const updateFormState = ($element) => {
    const { form: $form } = $element;
    const $controls = [...$form.elements].filter((element) => element.tagName !== "BUTTON");
    const isFormInvalid = $controls.some(($element) => !$element.hasAttribute("valid"));
    $submit.disabled = isFormInvalid;
  };

  const $email = document.querySelector('input[type="email"]');
  const $password = document.querySelector('input[type="password"]');
  const $submit = document.querySelector(".login__submit");

  $email.addEventListener("input", () => validateEmail($email));
  $password.addEventListener("input", () => validatePassword($password));

  $email.value = "eve.holt@reqres.in";
  $password.value = "cityslicka2==";
  validateEmail($email);
  validatePassword($password);

  const setErrorState = () => {
    $submit.classList.remove("loading");
    $submit.classList.remove("success");
    $submit.classList.add("error");
    $submit.textContent = "Error :(";
  };

  const setSuccessState = () => {
    $submit.classList.remove("loading");
    $submit.classList.remove("error");
    $submit.classList.add("success");
    $submit.textContent = "Sent! :)";
  };

  function handleRequestErrors(response) {
    if (!response.ok || response.type === "cors") {
      throw Error(response);
    }
    return response;
  }

  $submit?.addEventListener("click", (event) => {
    event.preventDefault();

    $submit.textContent = "Loading...";

    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: $email.value,
        password: $password.value,
      }),
    })
      .then(handleRequestErrors)
      .then(setSuccessState)
      .catch(setErrorState);
  });
};

window.onload = init;
