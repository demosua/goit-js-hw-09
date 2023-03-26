import "flatpickr/dist/flatpickr.min.css";

import Flatpickr from "flatpickr";
import { Ukrainian } from "flatpickr/dist/l10n/uk.js";
Flatpickr.localize(Ukrainian);

import Notiflix from 'notiflix';
Notiflix.Notify.init({
    position: 'center-top',
    timeout: 1000,
    clickToClose: true,
});

const refs = {
    datePicker: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector("[data-start]"),
    daysEl: document.querySelector("[data-days]"),
    hoursEl: document.querySelector("[data-hours]"),
    minutesEl: document.querySelector("[data-minutes]"),
    secondsEl: document.querySelector("[data-seconds]")
}

refs.startBtn.setAttribute("disabled", true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDateTime = selectedDates[0];
      if (Date.now() > chosenDateTime) {
          Notiflix.Notify.failure('Please choose a date in the future');
      } else {
          refs.startBtn.removeAttribute("disabled");
      }
      
  },
};

Flatpickr("input#datetime-picker", options);

class Timer {
    constructor({ onTick, selector }) {
        this.intervalId = null;
        this.onTick = onTick;
        this.selector = selector;
        this.isActive = false;
        this.init();
    }

    init() {
        this.onTick(this.convertMs(0));
    }

    start() {
        if (this.isActive) {
            return;
        }
        refs.startBtn.setAttribute("disabled", true);
        const datePickerValue = new Date(document.querySelector(this.selector).value).getTime();
        this.isActive = true;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = datePickerValue - currentTime;
            const time = this.convertMs(deltaTime);
            if (deltaTime < 0) {
                Notiflix.Notify.success("It's time!");
                this.stop();                
            } else {
                this.onTick(time);
            }
            
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        refs.startBtn.removeAttribute("disabled");
    }
    
    convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
    }

    addLeadingZero(value){ 
        return String(value).padStart(2, '0');
    }
}

const timer = new Timer({
    onTick: updateClockFace,
    selector: "input#datetime-picker",
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function updateClockFace({ days, hours, minutes, seconds }) {
    refs.daysEl.innerHTML = days;
    refs.hoursEl.innerHTML = hours;
    refs.minutesEl.innerHTML = minutes;
    refs.secondsEl.innerHTML = seconds;
}
