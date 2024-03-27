const collapseElementList = document.querySelectorAll(".collapse");
const collapseList = [...collapseElementList].map(
  (collapseEl) => new bootstrap.Collapse(collapseEl)
);

(function () {
  "use strict";
  /*
   * Form Validation
   */

  // Fetch all the forms we want to apply custom validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  const result = document.getElementById("result");
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();

          form.querySelectorAll(":invalid")[0].focus();
        } else {
          /*
           * Form Submission using fetch()
           */
          event.preventDefault();
          event.stopPropagation();

          const formData = new FormData(form);
          const object = Object.fromEntries(formData);
          const json = JSON.stringify(object);
          result.innerHTML = "Please wait...";

          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: json,
          })
            .then(async (response) => {
              let json = await response.json();
              if (response.status == 200) {
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-green-500");
              } else {
                console.log(response);
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-red-500");
              }
            })
            .catch((error) => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
            })
            .then(function () {
              form.reset();
              form.classList.remove("was-validated");
              setTimeout(() => {
                result.style.display = "none";
              }, 5000);
            });
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

document.onkeydown = function (blocco_tasti) {
  if (event.keyCode == 123) {
    return false;
  }
  if (
    blocco_tasti.ctrlKey &&
    blocco_tasti.shiftKey &&
    blocco_tasti.keyCode == "I".charCodeAt(0)
  ) {
    return false;
  }
  if (
    blocco_tasti.ctrlKey &&
    blocco_tasti.shiftKey &&
    blocco_tasti.keyCode == "C".charCodeAt(0)
  ) {
    return false;
  }
  if (
    blocco_tasti.ctrlKey &&
    blocco_tasti.shiftKey &&
    blocco_tasti.keyCode == "J".charCodeAt(0)
  ) {
    return false;
  }
  if (blocco_tasti.ctrlKey && blocco_tasti.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};

function blocco_mousedx() {
  return false;
}
document.oncontextmenu = blocco_mousedx;
