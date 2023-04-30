import { render } from "./render.js";

export const getData = () => {
  const btn = document.querySelector(".cross-sell__add");
  let stack = 4;
  let count = 1;

  const sliceData = (data, index) => {
    return data.slice(0, index);
  };

  const filter = (data) => {
    let newStack = stack * count;

    if (data.length > newStack) {
      count++;
    } else {
      btn.style.display = "none";
    }
    render(sliceData(data, newStack));
  };

  const getGoods = () => {
    fetch("../cross-sell-dbase/dbase.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Плохи дела!!!");
        }
      })
      .then((data) => {
        filter(data);
      })
      .catch((error) => console.error(error.message));
  };
  btn.addEventListener("click", getGoods);
  getGoods();
};
