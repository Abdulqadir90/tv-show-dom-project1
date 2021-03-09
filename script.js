let showsArr = [];

function getShows() {
  fetch(`https://api.tvmaze.com/shows/82/episodes`)
    .then(res => res.json())
    .then(data => {
      data.map(obj => {
        let objData = {name: obj.name,season:  obj.season, number: obj.number, image: obj.image.medium,summary: obj.summary}
        showsArr.push(objData);
      });
      showsArr.length === 73 ? displayShows(): null;
    })
}

function episodeCode(data, option) {
  if (data[option] < 10) {
    return `0${data[option]}`;
  } else {
    return `${data[option]}`;
  }
}

function sortNumber(data) {
  return `S${episodeCode(data, 'season')}E${episodeCode(data, 'number')}`
}

function displayShows() {
  document.querySelector('.display').innerHTML = showsArr.map(obj => {
    return `
      <div class="show">
        <div class="title">${obj.name} - ${sortNumber(obj)}</div>
        <img class="image" src="${obj.image}">
        <div class="summary">${obj.summary}</div>
      </div>
    `
  }).join(''); 
}

getShows();

