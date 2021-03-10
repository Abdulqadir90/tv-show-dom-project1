let showsArr = [];
let selectOption = [];
const search = document.querySelector('.search');
const select = document.querySelector('.options');

const getShows = () => {
  fetch(`https://api.tvmaze.com/shows/82/episodes`)
    .then((res) => res.json())
    .then((data) => {
      data.map((obj) => {
        let objData = {
          name: obj.name,
          season: obj.season,
          number: obj.number,
          image: obj.image.medium,
          summary: obj.summary,
        };
        showsArr.push(objData);
      });
      showsArr.length === 73 ? displayShows() : null;
    });
}


const episodeCode = (data, option) => data[option] < 10 ? `0${data[option]}`: `${data[option]}`;
 
const sortNumber = (data) => `S${episodeCode(data, "season")}E${episodeCode(data, "number")}`;

const displayShows = () => {
  document.querySelector(".display").innerHTML = showsArr
    .map((obj) => {
      options(obj);
     return createShowCards(obj);
    })
    .join("");
}

const options = (data) => {
  let optionSelected = document.createElement('option');
  optionSelected.value = `${sortNumber(data)} - ${data.name}`;
  optionSelected.innerHTML = `${sortNumber(data)} - ${data.name}`;
  select.appendChild(optionSelected);
}

const createShowCards = (data) => {
  return `
    <div class="show">
      <div class="title">${data.name} - ${sortNumber(data)}</div>
      <img class="image" src="${data.image}">
      <div class="summary">${data.summary}</div>
    </div>  
  `
}

search.addEventListener('input', (e) => {
  if (showsArr.length > 0) {
    let displaying = showsArr.filter((obj) => {
      if (obj.name.toLowerCase().includes(e.target.value.toLowerCase()) || obj.summary.toLowerCase().includes(e.target.value.toLowerCase())) {
        return obj;
      }
    });
    if (e.target.value.length > 0) {
      document.querySelector('.displayCount').innerHTML = `Displaying ${displaying.length}/${showsArr.length} episodes`;
    } else {
      document.querySelector('.displayCount').innerHTML = '';
    }
    document.querySelector(".display").innerHTML = displaying.map(obj => createShowCards(obj))
    .join("");
  }
});

select.addEventListener('change', (e) => {
  document.querySelector('.display').innerHTML = showsArr.filter((obj) => {
    if (e.target.value.toLowerCase().includes(obj.name.toLowerCase())) {
      console.log('got in here');
      return obj;
    } else if (e.target.value === 'showAll') {
      return showsArr;
    }
  }).map(obj => createShowCards(obj)).join(" ");
})

getShows();
