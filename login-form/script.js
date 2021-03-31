const init = () => {
  const validateEmail = (event) => {
    const input = event.currentTarget;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailTest = regex.test(input.value);

    if (!emailTest) {
      $submit.setAttribute("disabled", "disabled");
      input.nextElementSibling.classList.add("error");
    } else {
      $submit.removeAttribute("disabled");
      input.nextElementSibling.classList.remove("error");
    }
  };

  const validatePassword = (event) => {
    const input = event.currentTarget;

    if (input.value.length < 8) {
      $submit.setAttribute("disabled", "disabled");
      input.nextElementSibling.classList.add("error");
    } else {
      $submit.removeAttribute("disabled");
      input.nextElementSibling.classList.remove("error");
    }
  };

  const $email = document.querySelector('input[type="email"]');
  const $password = document.querySelector('input[type="password"]');
  const $submit = document.querySelector(".login__submit");

  $email.addEventListener("input", validateEmail);
  $password.addEventListener("input", validatePassword);

  const errorHandler = () => {
    $submit.classList.remove("loading");
    $submit.classList.remove("success");
    $submit.classList.add("error");
    $submit.textContent = "Error :(";
  };

  const successHandler = () => {
    $submit.classList.remove("loading");
    $submit.classList.remove("error");
    $submit.classList.add("success");
    $submit.textContent = "Sent! :)";
  };

  if ($submit) {
    $submit.addEventListener("click", (event) => {
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
        .then((response) => {
          if (response.status !== 200) {
            return errorHandler();
          }

          successHandler();
        })
        .catch(() => {
          errorHandler();
        });
    });
  }
};

window.onload = init;
