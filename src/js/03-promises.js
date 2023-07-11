import Notiflix from 'notiflix';

const refs = {
	form: document.querySelector('.form'),
	delayValue: document.querySelector('input[name="delay"]'),
  stepValue: document.querySelector('input[name="step"]'),
  amountValue: document.querySelector('input[name="amount"]'),
  submit: document.querySelector('button[type="submit"]'),
};

const { form, delayValue, stepValue, amountValue, submit } = refs;

submit.addEventListener('click', onClick);

function onClick(evt) {
	evt.preventDefault();
	for (let i = 0; i < amountValue.value; i = i +1) {
		const position = i + 1;
		const delay = Number(delayValue.value) + Number(stepValue.value) * i;		
		createPromise(position, delay)
			.then(({ position, delay }) => {
				Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`
        );
			})
			.catch(({ position, delay }) => {
				Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`
        );
			});
	}
	form.reset();
}

function createPromise(position, delay) {	
  const promise = new Promise((res, rej) => {
  const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res({ position, delay });
      } else {
        // Reject
        rej({ position, delay });
      }
    }, delay
    );
});
return promise;
}
