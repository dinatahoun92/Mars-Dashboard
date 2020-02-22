let store = Immutable.fromJS({
  user: { name: "Student" },
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  chosenRover: "Curiosity"
});
let roverInfoVar, curiosityVar;
// add our markup to the page
const root = document.getElementById("root");
const updateStore = (state, item, newState) => {
  if (item === "roverInfo") {
    roverInfoVar = newState;
  }
  if (item === "curiosity") {
    curiosityVar = newState;
    console.log(newState);
  }
  console.log(roverInfoVar);
  console.log(curiosityVar);
  if (roverInfoVar && curiosityVar) {
    const newStore = store.set("roverInfo", Immutable.fromJS(roverInfoVar));
    const newStore2 = newStore.set("curiosity", Immutable.fromJS(curiosityVar));

    console.log(newStore2);
    console.log(Immutable.Seq(newStore2));
    render(root, Immutable.Seq(newStore2));
  }
};
const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = state => {
  console.log(state);
  const roversArr = state.getIn(["rovers"]);
  const newRoverInfoRover = state.getIn(["roverInfo", "rover"]);
  const newRoverInfo = state.getIn(["roverInfo"]);
  const newCuriosity = state.getIn(["curiosity"]);
  console.log(newRoverInfo);

  RoverInfo(newRoverInfo);
  Curiosity(newCuriosity);
  const photos = state.getIn(["curiosity", "curiosity", "photos"]);
  console.log(photos);
  photosArr = photos.map((e, i) => {
    if (i < 10) {
      return `<img src=${e.getIn(["img_src"])}>`;
    }
  });
  console.log(photosArr);
  return `
        <header>
        <h1>
        Mars Dashboard
        </h1>
        </header>
        <nav>
        <ul>
       ${roversArr
         .map(
           (item, i) =>
             `  <li>
          ${item}
          <li>
          `
         )
         .join("")}
        <ul>
        </nav>
        <main>
        <p>
        revor name : ${
          newRoverInfo
            ? state.getIn(["roverInfo", "roverInfo", "rover", "name"])
            : ""
        }
        </p>
        <p>
        Launch Date :  ${
          newRoverInfo
            ? state.getIn(["roverInfo", "roverInfo", "rover", "launch_date"])
            : ""
        }
        </p>
        <p>
        Landing Date :  ${
          newRoverInfo
            ? state.getIn(["roverInfo", "roverInfo", "rover", "landing_date"])
            : ""
        }
        </p>
        <p>
        Status : ${
          newRoverInfo
            ? state.getIn(["roverInfo", "roverInfo", "rover", "status"])
            : ""
        }
        </p>
        <p>
          Most recently available photos :</p>
        </main>
        <section>
        <div class="imgContainer">
        ${photosArr}
<p>date</p>
        </div>
        </section>
        <footer>
        all rights reserved 2020
        </footer>
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Example of a pure function that renders infomation requested from the backend
const RoverInfo = roverInfo => {
  // If image does not already exist, or it is not from today -- request it again
  // const today = new Date();
  // const photodate = new Date(roverInfo.date);
  // console.log(photodate.getDate(), today.getDate());
  // console.log(photodate.getDate() === today.getDate());
  if (!roverInfo) {
    getRoverInfo(store);
  }
  // check if the photo of the day is actually type video!
  // if (roverInfo.media_type === "video") {
  //   return `
  //           <p>See today's featured video <a href="${roverInfo.url}">here</a></p>
  //           <p>${roverInfo.title}</p>
  //           <p>${roverInfo.explanation}</p>
  //       `;
  // } else {
  //   return `
  //           <img src="${roverInfo.image.url}" height="350px" width="100%" />
  //           <p>${roverInfo.image.explanation}</p>
  //       `;
  // }
};
const Curiosity = curiosity => {
  // If image does not already exist, or it is not from today -- request it again
  // const today = new Date();
  // const photodate = new Date(roverInfo.date);
  // console.log(photodate.getDate(), today.getDate());
  // console.log(photodate.getDate() === today.getDate());
  console.log(curiosity);
  if (!curiosity) {
    getCuriosity(store);
  }
  console.log(store);

  // check if the photo of the day is actually type video!
  // if (roverInfo.media_type === "video") {
  //   return `
  //           <p>See today's featured video <a href="${roverInfo.url}">here</a></p>
  //           <p>${roverInfo.title}</p>
  //           <p>${roverInfo.explanation}</p>
  //       `;
  // } else {
  //   return `
  //           <img src="${roverInfo.image.url}" height="350px" width="100%" />
  //           <p>${roverInfo.image.explanation}</p>
  //       `;
  // }
};
// ------------------------------------------------------  API CALLS

// Example API call
const getRoverInfo = state => {
  let { roverInfo } = state;
  fetch(`http://localhost:3000/roverinfo`)
    .then(res => res.json())
    .then(roverInfo => {
      updateStore(store, "roverInfo", { roverInfo });
      console.log({ roverInfo });
    });
  // return data;
};
const getCuriosity = state => {
  console.log(state);
  let { curiosity } = state;
  console.log({ curiosity });
  fetch(`http://localhost:3000/curiosity`)
    .then(res => res.json())
    .then(curiosity => {
      updateStore(store, "curiosity", { curiosity });
      console.log({ curiosity });
    });
  // return data;
};
