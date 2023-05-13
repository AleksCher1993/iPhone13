export const render = (data) => {
  const crossSellList = document.querySelector(".cross-sell__list");
  crossSellList.textContent = "";
  data.forEach((elem) => {
    crossSellList.insertAdjacentHTML(
      "beforeend",
      `
          <li data-item-id=${elem.id}>
          <article class="cross-sell__item">
          <img
          class="cross-sell__image"
          src="./${elem.photo}"
          alt="${elem.id}"
          />
          <h3 class="cross-sell__title">
          ${elem.name}
          </h3>
          <p class="cross-sell__price">${elem.price}₽</p>
          <button
          type="button"
          class="button button_buy cross-sell__button"
          >
          Купить
          </button>
          </article>
          </li>
          `
    );
  });
};
export const renderBusket=(data)=>{
  const formTbodyBusket=document.querySelector('.form__tbody_busket')
  const filterPrice=(price)=>{
    let pr=price.substring(0,price.length-1)
    return Number(pr)
  }
  formTbodyBusket.innerHTML=""
  data.forEach(item=>{
      formTbodyBusket.insertAdjacentHTML(
          "beforeend",
          `
            <tr data-item-id="${item.id}">
              <td>${item.name}</td>
              <td class="txt"><span class="btn__sub">-</span>&ensp;<span class="res__count">${item.count}</span>&ensp;<span class="btn__add">+</span></td>
              <td class="td__price">${filterPrice(item.price)*item.count} ₽</td>
            </tr>
              `
        );
  })
}
