import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  function addLeadingZero(value) {
	return String(value).padStart(2, '0');
}
const refs = {
    start: document.querySelector('button[data-start]'),
    input: document.querySelector('#datetime-picker'),
    daysValue: document.querySelector('.value[data-days]'),
    hoursValue: document.querySelector('.value[data-hours]'),
    minutesValue: document.querySelector('.value[data-minutes]'),
    secondsValue: document.querySelector('.value[data-seconds]'),
  };
  
  const { start, input, daysValue, hoursValue, minutesValue, secondsValue } = refs;
  
  start.disabled = true;
  let intervalId = null;
  
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if (selectedDate <= new Date()) {
        Notiflix.Notify.failure('Please choose a date in the future');
        return;
      }
      start.disabled = false;
    },
  };
  
  const createPicker = flatpickr(input, options);
  
  start.addEventListener('click', onClick);
  
  function onClick() {
    start.disabled = true;
    input.disabled = true;
    setTimer();
    intervalId = setInterval(() => {
      setTimer();
    }, 1000);
  }
  
  function setTimer() {
    const selectDate = new Date(input.value).getTime();
    const defaultDateMs = Date.now();
    const { days, hours, minutes, seconds } = convertMs(
      selectDate - defaultDateMs
    );
  
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  
    if (selectDate - defaultDateMs < 1000) {
      clearInterval(intervalId);
      start.disabled = false;
      input.disabled = false;
    }
  }
