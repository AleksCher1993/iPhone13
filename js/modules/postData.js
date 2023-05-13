export const postData = () => {
  const btn = document.querySelector(".card-details__button_delivery");
  const cardTitle = document.querySelector(".card-details__title");
  const modal = document.querySelector(".modal");
  const form = modal.querySelector("form.form");
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
  modal.addEventListener('click',(event)=>{
    if (!event.target.closest('.modal__block')) {
      modal.style.display = "";
        document.body.classList.remove('locked')        
    }
})
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
    title.textContent = cardTitle.textContent;
    document.body.classList.add('locked')  
  });
  close.addEventListener("click", () => {
    modal.style.display = "";
    document.body.classList.remove('locked')  
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
export const postDataBusket=()=>{ 
  const modal = document.querySelector(".modal__basket");
  const form = modal.querySelector("form.form__busket");
  const basketItemcounter=document.querySelector('.basket__itemcounter')
  const basketSvg=document.querySelector('.basket__svg')
  const defaultSettings = () => {
    modal.classList.remove("modal__basket-open");
    localStorage.removeItem("busketItems")
    basketItemcounter.innerHTML=0
    basketSvg.style.fill='none'
    document.body.classList.remove("locked");
    alert("Поздравляю с покупкой =)")
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log('submit');
    let sendObj = localStorage.getItem('busketItems')&&JSON.parse(localStorage.getItem("busketItems"));

    fetch("https://jsonplaceholder.typicode.com/albums/", {
      method: "POST",
      body: JSON.stringify(sendObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((data) => {
      if (data.ok) {
        
        defaultSettings();
      }else throw new Error("Какие то проблемы?")
    }).catch(error=>{
      alert(error)
    })
  });
  
}