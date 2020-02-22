let store = Immutable.fromJS({
  user: { name: "Student" },
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  chosenRover: "Curiosity"
});
let roverInfoVar, curiosityVar, opportunityVar, spiritVar;
// add our markup to the page
const root = document.getElementById("root");
const updateStore = (state, item, newState) => {
  console.log(item);
  if (item === "roverInfo") {
    roverInfoVar = newState;
  } else if (item === "curiosity") {
    curiosityVar = newState;
  } else if (item === "opportunity") {
    opportunityVar = newState;
  } else {
    spiritVar = newState;
  }
  console.log(roverInfoVar);
  console.log(curiosityVar);
  if (roverInfoVar && curiosityVar && opportunityVar && spiritVar) {
    const newStore = store.set("roverInfo", Immutable.fromJS(roverInfoVar));
    const newStore2 = newStore.set("curiosity", Immutable.fromJS(curiosityVar));
    const newStore3 = newStore2.set(
      "opportunity",
      Immutable.fromJS(opportunityVar)
    );
    const newStore4 = newStore3.set("spirit", Immutable.fromJS(spiritVar));
    console.log(newStore4);
    console.log(Immutable.Seq(newStore4));
    render(root, Immutable.Seq(newStore4));
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
  const newOpportunity = state.getIn(["opportunity"]);
  const newSpirit = state.getIn(["spirit"]);

  console.log(newRoverInfo);

  RoverInfo(newRoverInfo);
  Curiosity(newCuriosity);
  Opportunity(newOpportunity);
  Spirit(newSpirit);

  const photos = state.getIn(["spirit", "spirit", "latest_photos"]);
  console.log(photos);
  photosArr = photos
    .map((e, i) => {
      return `<div class="imgContainer">
      <img src=${e.getIn(["img_src"])}><p>${e.getIn(["earth_date"])}</p>
      </div>`;
    })
    .join("");
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
        <section class="allImgs">
        ${photosArr}
        </section>
      
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Example of a pure function that renders infomation requested from the backend
const RoverInfo = roverInfo => {
  if (!roverInfo) {
    getRoverInfo(store);
  }
};
const Curiosity = curiosity => {
  console.log(curiosity);
  if (!curiosity) {
    getCuriosity(store);
  }
  console.log(store);
};
const Opportunity = opportunity => {
  console.log(opportunity);
  if (!opportunity) {
    getOpportunity(store);
  }
  console.log(store);
};
const Spirit = spirit => {
  console.log(spirit);
  if (!spirit) {
    getSpirit(store);
  }
  console.log(store);
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
};
const getOpportunity = state => {
  console.log(state);
  let { opportunity } = state;
  console.log({ opportunity });
  fetch(`http://localhost:3000/opportunity`)
    .then(res => res.json())
    .then(opportunity => {
      updateStore(store, "opportunity", { opportunity });
      console.log({ opportunity });
    });
};
const getSpirit = state => {
  console.log(state);
  let { spirit } = state;
  console.log({ spirit });
  fetch(`http://localhost:3000/spirit`)
    .then(res => res.json())
    .then(spirit => {
      updateStore(store, "spirit", { spirit });
      console.log({ spirit });
    });
};
