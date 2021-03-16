const shows = getAllShows();
let showsArr = []; // array of episodes
let selectOption = [];
const search = document.querySelector('.search');
const select = document.querySelector('.options');
const selectShows = document.querySelector('.optionsshows');
const display = document.querySelector('.display');
const btnReturn = document.querySelector('.btnreturn');
const searchShow = document.querySelector('.showsearch');
console.log(selectShows);
shows.sort((a,b) =>  {
  if (a.name[0] > b.name[0])
   {        return 1;      }
    else if (a.name[0] < b.name[0]) 
    {        return -1;      }
     else {        return 0;      }
});

const getShows = (id) => {
  showsArr = [];
  fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    .then((res) => res.json())
    .then((data) => {
      data.map((obj) => {
        let objData = {
          name: obj.name,
          season: obj.season,
          number: obj.number,
          image: obj.image?.medium,
          summary: obj.summary,
        };
        showsArr.push(objData);
      });
      // showsArr.length === 73 ? displayShows() : null;
      displayShows()
    });
    
}


const episodeCode = (data, option) => data[option] < 10 ? `0${data[option]}`: `${data[option]}`;
 
const sortNumber = (data) => `S${episodeCode(data, "season")}E${episodeCode(data, "number")}`;

const displayShows = () => {
  search.classList.remove('hiddenClass')
  searchShow.classList.add('hiddenClass')
  select.innerHTML = "";
  document.querySelector(".display").innerHTML = "";
  document.querySelector(".options").innerHTML = `<option value="showAll">Show all</option>`
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

const showOptions = (data) => {
  let optionSelected = document.createElement('option');
  optionSelected.value = `${data.id}`;
  // console.log(optionSelected)
  optionSelected.innerHTML = `${data.name}`;
  // select.appendChild(optionSelected);
  return optionSelected;
}

const displayAllShows = (showsArr) => {
  console.log( document.querySelector(".optionsshows"))
  let markUp = [];
  const selector = document.querySelector(".optionsshows")
  showsArr.forEach(element => {
    markUp.push(showOptions(element))
  });
  markUp.forEach(element => selector.appendChild(element))
  // selector.appendChild = markUp.join(" ")
 
}

displayAllShows(shows);


const createShowCards = (data) => {
  return `
    <div class="show">
      <div class="title">${data.name} - ${sortNumber(data)}</div>
      <img class="image" src="${data.image}">
      <div class="summary">${data.summary}</div>
    </div>  
  `
}

searchShow.addEventListener('input', (e) => {
  if (shows.length > 0) {
    let displaying = shows.filter((obj) => {
      if (obj.name.toLowerCase().includes(e.target.value.toLowerCase()) || obj.summary.toLowerCase().includes(e.target.value.toLowerCase())) {
        return obj;
      }
    });
    if (e.target.value.length > 0) {
      document.querySelector('.displayCount').innerHTML = `Displaying ${displaying.length}/${showsArr.length} episodes`;
      document.querySelector('.display').innerHTML = "";
      renderAllShows(displaying)
    } else {
      document.querySelector('.displayCount').innerHTML = '';
     
    }
     console.log(displaying)
    
  }
});

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

const renderAllShows = (arr) => {
  search.classList.add("hiddenClass")
  btnReturn.classList.add("hiddenClass")
  selectShows.classList.remove("hiddenClass")
  select.classList.add("hiddenClass")
  const markUp = [];
  arr.forEach(data => {
    markUp.push(`<div class="show">
    <div data-id=${data.id} class="title">${data.name}</div>
    <img class="image" src="${data.image?.medium}">
    <div class="summary">${data.summary}</div>
    <p>${data.genres.join(" ")}</p>
    <p>${data.status}</p>
    <p>${data.rating.average}</p>
    <p>${data.runtime}</p>
  </div>`)
  });
  document.querySelector(".display").insertAdjacentHTML("afterbegin", markUp.join(""))
}

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

selectShows.addEventListener('change', (e) => {
  select.classList.remove("hiddenClass")
  if(e.target.value === "showAll"){
    renderAllShows(shows)
    return
  }
  console.log(e.target.value);
  getShows(+e.target.value)
  btnReturn.classList.remove("hiddenClass")
  // shows.classList.remove("hiddenClass")



})

display.addEventListener("click", (e) =>{
if(!e.target.dataset.id) return 
btnReturn.classList.remove("hiddenClass")
const query = e.target.dataset.id 
console.log("i am here")
getShows(query)
// shows.classList.remove("hiddenClass")
btnReturn.classList.remove("hiddenClass")
select.classList.remove("hiddenClass")
shows.classList.remove("hiddenClass")
search.classList.remove("hiddenClass")



})

btnReturn.addEventListener("click", (e) =>{
console.log(e.target)
renderAllShows(shows)
shows.classList.add("hiddenClass")
btnReturn.classList.add("hiddenClass")
selectShows.classList.remove("hiddenClass")

})

renderAllShows(shows);



// getShows(82);
