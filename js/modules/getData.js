import { render } from "./render.js";
import {dbase} from "./dbase.js"
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
  btn.addEventListener("click", ()=>{filter(dbase())});
  filter(dbase());
};
