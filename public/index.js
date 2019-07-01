const app = function(){
  const url = "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json";

  fetch(url)
  .then(res => res.json())
  .then((worldCupDetails) => {
    populateList(worldCupDetails)
  })
};


const populateList = function(worldCupDetails){
    console.log(worldCupDetails);
    console.log(worldCupDetails.teams);
    console.log(worldCupDetails.stadiums);
    // console.log(Object.keys(worldCupDetails.groups).forEach(group => console.log(group, worldCupDetails.groups.[group])));
    const selector = document.querySelector('#selector');
    selector.addEventListener('change', function(){
      displayDetailsTeams(selector, worldCupDetails);
    });

    const stadiumSelector = document.querySelector('#stadiumSelector');
    stadiumSelector.addEventListener('change', function(){
      displayDetailsStadiums(selector, worldCupDetails);
    });

    worldCupDetails.teams.forEach(function(team){
    const option = document.createElement("option");
    option.textContent = team.name;
    option.value = worldCupDetails.teams.indexOf(team);
    selector.appendChild(option);
  });

    worldCupDetails.stadiums.forEach(function(stadium){
    const option = document.createElement("option");
    option.textContent = stadium.name;
    option.value = worldCupDetails.stadiums.indexOf(stadium);
    stadiumSelector.appendChild(option);
  });
};

const displayDetailsTeams = function(selector, worldCupDetails){
    const team = worldCupDetails.teams[selector.value];
    const ul = document.querySelector('#team-list');
    const li = document.createElement('li');
    const img = document.createElement('img');
    li.textContent = team.name;
    img.src = team.flag;
    img.style.width = '400px';
    img.style.height = '200px';
    ul.appendChild(li);
    ul.appendChild(img);
    save(li);

};

const displayDetailsStadiums = function(selector, worldCupDetails){
    const group = worldCupDetails.stadiums[stadiumSelector.value];
    const ul = document.querySelector('#stadium-list');
    const li = document.createElement('li');
    // const img = document.createElement('img');
    li.textContent = group.name;
    // img.src = team.flag;
    // img.style.width = '400px';
    // img.style.height = '200px';
    ul.appendChild(li);
    // ul.appendChild(img);
    save(li);

};

var save = function (team) {
  // this function needs to:
  // - get the data back from local storage and parse to an array
  const teamArray = JSON.parse(localStorage.getItem('teamList')) || [];
  // - add the newItem to the array
  teamArray.push(team.innerHTML);
  // console.log(countryList);
  // - stringify the updated array
  const jsonStringArray = JSON.stringify(teamArray);
  // - save it back to localstorage
  localStorage.setItem('teamArray', jsonStringArray);
}


window.addEventListener('load', app);
