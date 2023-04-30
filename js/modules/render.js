export const render = (data) => {
  const crossSellList = document.querySelector(".cross-sell__list");
  crossSellList.textContent = "";
  data.forEach((elem) => {
    crossSellList.insertAdjacentHTML(
      "beforeend",
      `
          <li>
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
