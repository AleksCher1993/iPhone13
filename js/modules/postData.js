export const postData = () => {
  const btn = document.querySelector(".card-details__button_delivery");
  const cardTitle = document.querySelector(".card-details__title");
  const modal = document.querySelector(".modal");
  const form = modal.querySelector("form");
  const close = modal.querySelector(".modal__close");
  const title = modal.querySelector(".modal__title");
  const lable = modal.querySelectorAll(".modal__label");

  let sendObj = {};

  const defaultSettings = () => {
    modal.style.display = "";
    sendObj = {};

    lable.forEach((elem) => {
      elem.querySelector(".modal__input").value = "";
    });
  };

  btn.addEventListener("click", () => {
    modal.style.display = "flex";
    title.textContent = cardTitle.textContent;
  });
  close.addEventListener("click", () => {
    modal.style.display = "";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    lable.forEach((elem) => {
      let key = elem.querySelector(".modal__label-text").textContent;
      let value = elem.querySelector(".modal__input").value;
      sendObj[key] = value;
    });

    fetch("https://jsonplaceholder.typicode.com/posts/", {
      method: "POST",
      body: JSON.stringify(sendObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      defaultSettings();
    });
  });
};
