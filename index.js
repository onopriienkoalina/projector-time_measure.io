'use strict';
const startDate = document.querySelector('#start-date');
const endDate = document.querySelector('#end-date');
const presetsVariant = document.querySelector('#presets');
const dayOption = document.querySelector('#day-option');
const timeOption = document.querySelector('#time-option');
const calculateBtn = document.querySelector('#calculate');
const resultTable = document.querySelector('#result');

startDate.addEventListener('change', () => {
    endDate.min = startDate.value;
    if (!startDate.value) {
      endDate.disabled = true;
    } else {
      endDate.disabled = false;
    }
  });
  
  endDate.addEventListener('change', () => {
    startDate.max = endDate.value;
    if (endDate.value <= startDate.value) {
      endDate.value = '';
      alert('Друга дата не може бути раніше першої!');
    }
  });

  endDate.disabled = true;

function setDates() {
  const preset = presetsVariant.value;
  const now = new Date();
  let startDatePresets = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let endDatePresets;

  if (preset === 'week') {
    endDatePresets = new Date(startDatePresets.getTime() + 7 * 24 * 60 * 60 * 1000);
  } else if (preset === 'month') {
    endDatePresets = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
  } else {
    endDatePresets = startDatePresets;
  }

  startDate.value = startDatePresets.toISOString().substr(0, 10);
  endDate.value = endDatePresets.toISOString().substr(0, 10);
}

setDates();

presetsVariant.addEventListener('change', setDates);

let tableData = [];

calculateBtn.addEventListener('click', () => {
  const getStartDate = new Date(startDate.value);
  const getEndDAte = new Date(endDate.value);
  const getDay = dayOption.value;
  const getTime = timeOption.value;

  let timeResult;

if (getDay === 'weekdays') {
  let weekdays = 0;
  for (let date = new Date(getStartDate); date <= getEndDAte; date.setDate(date.getDate() + 1)) {
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      weekdays++;
    }
  }
  timeResult = weekdays;
} else if(getDay === 'weekends') {
  let weekends = 0;
  for (let date = new Date(getStartDate); date <=getEndDAte; date.setDate(date.getDate() + 1)) {
    if (date.getDay() === 0 || date.getDay() === 6) {
      weekends++;
    }
  }
  timeResult = weekends;
} else {
  let allDays = 0;
  for (let date = new Date(getStartDate); date <=getEndDAte; date.setDate(date.getDate() + 1)) {
    if (date.getDay() <= 6) {
      allDays++;
  }
}
timeResult = allDays;
}

let timeTotal;
if (getTime ==='days') {
  timeTotal = timeResult;
} else if (getTime === 'hours'){
  timeTotal = timeResult * 24;
} else if (getTime === 'minutes'){
  timeTotal = timeResult * 24 * 60;
} else if (getTime === 'seconds'){
  timeTotal = timeResult * 24 * 60 * 60;
}

const result = {
  startDate: getStartDate.toLocaleDateString(),
  endDate: getEndDAte.toLocaleDateString(),
  timeDiff: timeTotal
};

  storeResultInLocalStorage(result);

  const row = resultTable.insertRow();
  const startDateCell = row.insertCell();
  startDateCell.textContent = getStartDate.toLocaleDateString();
  const endDateCell = row.insertCell();
  endDateCell.textContent = getEndDAte.toLocaleDateString();
  const timeDiffCell = row.insertCell();
  timeDiffCell.textContent = timeTotal;

});
function storeResultInLocalStorage(result) {
  let results;

  if (localStorage.getItem('results') !== null) {
      results = JSON.parse(localStorage.getItem('results'));
      results = results.slice(-9);
  } else {
      results = []
  }
  results.push(result);

  localStorage.setItem('results', JSON.stringify(results));
}

function displayResultsFromLocalStorage() {
  const results = JSON.parse(localStorage.getItem('results'));

  if (results !== null && results.length > 0) {
    for (let i = 0; i < results.length; i++) {
      const row = resultTable.insertRow();
      const startDateCell = row.insertCell();
      startDateCell.textContent = results[i].startDate;
      const endDateCell = row.insertCell();
      endDateCell.textContent = results[i].endDate;
      const timeDiffCell = row.insertCell();
      timeDiffCell.textContent = results[i].timeDiff;
    }
  }
}

displayResultsFromLocalStorage();





