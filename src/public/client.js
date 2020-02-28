let store = {
  rovers: Immutable.List(["Curiosity", "Opportunity", "Spirit"]),
  clickedItem: "Curiosity",
  roversInfo: Immutable.Map({})
};

// higher order functions
const ul = roversArr => {
  return `<ul>${roversList(roversArr)}</ul>`;
};

const roversList = roversArr1 =>
  roversArr1
    .map(
      (item, i) =>
        `<li onclick="show('${item}')">
 ${item}
 <li>
 `
    )
    .join("");

const photoesArr = photos1 =>
  photos1
    .map((e, i) => {
      return `<div class="imgContainer">
    <img src="${e.img_src}"/> 
    </div>`;
    })
    .join("");
const photosFun = (photosArr, photos) => {
  return `<section class="allImgs">
  ${photosArr(photos)}</section>`;
};

const root = document.getElementById("root");
const updateStore = (state, newState) => {
  console.log(state);
  store = Object.assign(store, newState);
  render(root, store);
};
const render = async root => {
  root.innerHTML = App();
};
function show(item) {
  console.log(item);
  updateStore(store, { clickedItem: item });
}
// create content
const App = () => {
  const selected = store.clickedItem;
  const selectedItem = store.roversInfo[selected];
  let selectedPhotos;
  if (store.photos) {
    selectedPhotos = store.photos[selected];
  }
  if (!selectedItem) {
    getPhotos(store.clickedItem);
    getRoverInfo(store.clickedItem);
  }
  return loadUi(selectedItem, selectedPhotos);
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Example of a pure function that renders infomation requested from the backend
// ------------------------------------------------------  API CALLS
const loadUi = (selectedItem, selectedPhotos) =>
  `<nav>
         ${ul(store.rovers)}
         </nav>
         <main>
         <p>
         revor name : ${selectedItem ? selectedItem[0].rover.name : ""}
         </p>
         <p>
         Launch Date :  ${selectedItem ? selectedItem[0].rover.launch_date : ""}
         </p>
         <p>
         Landing Date : ${
           selectedItem ? selectedItem[0].rover.landing_date : ""
         }
         </p>
         <p>
         Status :${selectedItem ? selectedItem[0].rover.status : ""}
         </p>
         <p>
         Date Of Most Recent Photos Were taken : ${
           selectedPhotos ? selectedPhotos[0].latest_photos[0].earth_date : ""
         }
         </p>
         <p>
           Most recently available photos :</p>
         </main>
         ${photosFun(
           photoesArr,
           selectedPhotos ? selectedPhotos[0].latest_photos : []
         )}     
     `;
// Example API call

const getPhotos = roverName => {
  fetch(`http://localhost:3000/${roverName}`)
    .then(res => res.json())
    .then(photo => {
      updateStore(store, {
        photos: {
          [roverName]: [photo]
        }
      });
    });
};
const getRoverInfo = roverName => {
  fetch(`http://localhost:3000/roverinfo/${roverName}`)
    .then(res => res.json())
    .then(info => {
      console.log(info);
      updateStore(store, {
        roversInfo: {
          [roverName]: [info]
        }
      });
    });
};
