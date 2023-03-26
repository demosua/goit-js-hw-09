import Notiflix from 'notiflix';
Notiflix.Notify.init({
    position: 'right-top',
    clickToClose: true,
});

const refs = {
  delayEl: document.getElementsByName("delay")[0],
  stopEl: document.getElementsByName("step")[0],
  amountEl: document.getElementsByName("amount")[0],
  submitBtn: document.querySelector('button[type="submit"]'),
};
const formInit = () => {
  refs.delayEl.value = 1500;
  refs.stopEl.value = 1000;
  refs.amountEl.value = 5;
}
formInit();

function createPromise({position, delay}) {
  return new Promise((resolve, reject)  => {
    const shouldResolve = Math.random() > 0.3;
    
      setTimeout(() => {
        if(shouldResolve) {
          resolve(`Fulfilled promise ${position} in ${delay}ms`);
        }

        reject(`Rejected promise ${position} in ${delay}ms`);
        
      }, delay);
    
  });
}

refs.submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let delay = Number(refs.delayEl.value);
  let step = Number(refs.stopEl.value);
  let amount = Number(refs.amountEl.value);
  for (let position = 1; position <= amount; position += 1) {

    createPromise({ position, delay }).then(
      result => {
        Notiflix.Notify.success(result);
      },
      error => {
        Notiflix.Notify.failure(error);
      },
    );

    delay += step;
  }
});