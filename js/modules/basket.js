import { renderBusket } from "./render.js";
export const basket = () => {
  const modalBasket = document.querySelector(".modal__basket");
  const itemBasketBtn = document.querySelector(".item__basket");
  const close = modalBasket.querySelector(".modal__close");
  const crossSell = document.getElementById("cross-sell");
  const basketItemcounter = document.querySelector(".basket__itemcounter");
  const basketSvg = document.querySelector(".basket__svg");
  const formBusket = document.querySelector(".form__busket");
  const busketContainerPusto = document.querySelector(
    ".busket__container_pusto"
  );
  const modalBusketSub = document.querySelector(".modal__busketSub");
  const cardDetailsButtonBuy = document.querySelector(
    ".card-details__button_buy"
  );
  const formTbodyBusket = document.querySelector(".form__tbody_busket");
  const formResultPrice = formBusket.querySelector(".form__result_price");
  const itemsArr = [];

  // -----------------------------------------------------------------------------
  const filterPrice=(price)=>{
    let pr=price.substring(0,price.length-1)
    return Number(pr)
  }
  const rezultPrice = (data) => {
    let res=data.reduce((r,{price,count})=>{
      // console.log(filterPrice(price)*count);
      r+= (filterPrice(price)*count)
      return r
    },0)
    formResultPrice.innerHTML=res+" ₽"
  };
  const initialLocalStor = (arr, obj, { id, h3, p }) => {
    obj["id"] = id;
    obj["name"] = h3;
    obj["price"] = p;
    obj["count"] = 1;
    arr.push(obj);
    localStorage.setItem("busketItems", JSON.stringify(arr));
  };
  const initialBusketCountItem = (querySel) => {
    querySel.innerHTML = "";
    if (localStorage.getItem("busketItems")) {
      const arr = JSON.parse(localStorage.getItem("busketItems"));
      let res = arr.reduce((r, item) => {
        r += item.count;
        return r;
      }, 0);
      querySel.innerHTML = res;
      basketSvg.style.fill = "red";
    } else {
      querySel.innerHTML = "0";
      basketSvg.style.fill = "";
    }
  };
  const openModal = () => {
    itemBasketBtn.addEventListener("click", () => {
      modalBasket.classList.add("modal__basket-open");
      document.body.classList.add("locked");
      
      if (localStorage.getItem("busketItems")) {
        busketContainerPusto.classList.add("hidden");
        formBusket.classList.remove("hidden");
        modalBusketSub.style.marginRight = "0";
        const localObj = JSON.parse(localStorage.getItem("busketItems"));
        renderBusket(localObj);
        rezultPrice(localObj);
      } else {
        busketContainerPusto.classList.remove("hidden");
        formBusket.classList.add("hidden");
        modalBusketSub.style.marginRight = "30rem";
      }
    });
  };
  const closeModal = () => {
    // modalBasket.addEventListener("click", (event) => {
    //   if (!event.target.closest(".modal__block")) {
    //     modalBasket.classList.remove("modal__basket-open");
    //     document.body.classList.remove("locked");
    //   }
    // });
    close.addEventListener("click", () => {
      modalBasket.classList.remove("modal__basket-open");
      document.body.classList.remove("locked");
    });
  };
  const addItemToBusket = () => {
    crossSell.addEventListener("click", (event) => {
      const target = event.target;
      if (target.closest(".button_buy")) {
        basketItemcounter.innerHTML = "";
        const btn = target.closest(".button_buy");
        const li = btn.closest("li");
        const h3 = li.querySelector("h3").innerText;
        const p = li.querySelector(".cross-sell__price").innerText;
        const id = li.dataset.itemId;

        let count = 0;
        if (localStorage.getItem("busketItems")) {
          const localObj = JSON.parse(localStorage.getItem("busketItems"));
          localObj.forEach((element) => {
            if (element.id === id) {
              element.count++;
              count = element.count;
              localStorage.setItem("busketItems", JSON.stringify(localObj));
            }
          });

          if (count === 0) {
            initialLocalStor(localObj, {}, { id, h3, p });
          }
          let res = localObj.reduce((r, item) => {
            r += item.count;
            return r;
          }, 0);
          basketItemcounter.innerHTML = res;
        } else {
          initialLocalStor(itemsArr, {}, { id, h3, p });
          basketItemcounter.innerHTML = "1";
        }
        itemsArr.length = 0;
        basketSvg.style.fill = "red";
      }
    });
  };
  const addSpecialItemToBusket = () => {
    cardDetailsButtonBuy.addEventListener("click", () => {
      const title = document.querySelector(".card-details__title");
      const h3 = title.innerText;
      const p = document.querySelector(".card-details__price").innerText;
      const id = title.dataset.cardId;
      let count = 0;
      if (localStorage.getItem("busketItems")) {
        const localObj = JSON.parse(localStorage.getItem("busketItems"));
        localObj.forEach((element) => {
          if (element.id === id) {
            element.count++;
            count = element.count;
            localStorage.setItem("busketItems", JSON.stringify(localObj));
          }
        });
        if (count === 0) {
          initialLocalStor(localObj, {}, { id, h3, p });
        }
        let res = localObj.reduce((r, item) => {
          r += item.count;
          return r;
        }, 0);
        basketItemcounter.innerHTML = res;
      } else {
        initialLocalStor([], {}, { id, h3, p });
        basketItemcounter.innerHTML = "1";
      }
      itemsArr.length = 0;
      basketSvg.style.fill = "red";
    });
  };
  const changeCountItemsAtBusket = () => {
    formTbodyBusket.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.target;
      let tr=event.target.closest("tr")
      let span=tr.querySelector("span.res__count")
      let price=''
      const localObj = JSON.parse(localStorage.getItem("busketItems"));
      if (target.closest(".btn__add")) {
        localObj.forEach((elem)=>{
          if (tr.dataset.itemId===elem.id) {
            elem.count++
          }
        })
      }
      if (target.closest(".btn__sub")) {
        if (span.innerHTML>0) { 
          localObj.forEach((elem)=>{
            if (tr.dataset.itemId===elem.id) {
              elem.count--
            }
          })
          
        }else 
        span.innerHTML=0
      }
      localStorage.setItem("busketItems", JSON.stringify(localObj));
      renderBusket(localObj)
      rezultPrice(localObj)

    });
  };
  // ----------------------------------------------------------------------------

  addItemToBusket();
  openModal();
  closeModal();
  initialBusketCountItem(basketItemcounter);
  addSpecialItemToBusket();
  changeCountItemsAtBusket();
};
