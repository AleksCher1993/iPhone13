export const tabs = () => {
  const cardDetailChange = document.querySelectorAll(".card-detail__change");
  const cardDetailsTitle = document.querySelector(".card-details__title");
  const cardImageItem = document.querySelector(".card__image_item");
  const cardDetailsPrice = document.querySelector(".card-details__price");
  const headTitle = document.head.querySelector("title");

  const cardObj = [
    {
      id:"1ab2345aa",
      name: "Graphite",
      memory: "128",
      price: "60000",
      img: "img/iPhone-graphite.webp",
    },
    {
      id:"2ab3456ab",
      name: "Silver",
      memory: "256",
      price: "70000",
      img: "img/iPhone-silver.webp",
    },
    {
      id:"3a45678ac",
      name: "Sierra blue",
      memory: "512",
      price: "80000",
      img: "img/iPhone-sierra_blue.webp",
    },
  ];

  cardDetailChange.forEach((elem, index) => {
    elem.addEventListener("click", () => {
      cardDetailChange.forEach((element) => {
        element.classList.remove("active");
      });
      elem.classList.add("active");
      cardInfoChange(index);
    });
  });

  const cardInfoChange = (index) => {
    cardDetailsTitle.setAttribute('data-card-id',cardObj[index].id)
    cardDetailsTitle.textContent = `
    Смартфон Apple iPhone 13 Pro ${cardObj[index].memory}GB ${cardObj[index].name}`;
    cardImageItem.setAttribute("src", cardObj[index].img);
    cardDetailsPrice.innerHTML = `${cardObj[index].price}₽`;
    headTitle.innerHTML = `iPhone 13 Pro ${cardObj[index].memory}GB ${cardObj[index].name}`;
  };

  cardInfoChange(0);
};
