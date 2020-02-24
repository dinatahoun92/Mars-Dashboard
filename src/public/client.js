let store = Immutable.fromJS({
  user: { name: "Student" },
  rovers: ["Curiosity", "Opportunity", "Spirit"]
});
let roverInfoCuriosityVar,
  roverInfoOpportunityVar,
  roverInfoSpiritVar,
  curiosityVar,
  opportunityVar,
  clickedItem,
  spiritVar;

// higher order functions
const ul = roversArr => {
  return `<ul>${roversList(roversArr)}</ul>`;
};
const roversList = roversArr1 =>
  roversArr1
    .map(
      (item, i) =>
        `  <li id=${item}>
 ${item}
 <li>
 `
    )
    .join("");

const photoesArr = photos1 =>
  photos1
    .map((e, i) => {
      return `<div class="imgContainer">
    <img src=${e.getIn(["img_src"])}><p>${e.getIn(["earth_date"])}</p>
    </div>`;
    })
    .join("");
const photosFun = (photosArr, photos) => {
  return `<section class="allImgs">
  ${photosArr(photos)}</section>`;
};

const root = document.getElementById("root");
const updateStore = (state, item, newState) => {
  console.log(item);
  if (item === "roverInfoCuriosity") {
    roverInfoCuriosityVar = newState;
  } else if (item === "roverInfoOpportunity") {
    roverInfoOpportunityVar = newState;
  } else if (item === "roverInfoSpirit") {
    roverInfoSpiritVar = newState;
  } else if (item === "curiosity") {
    curiosityVar = newState;
  } else if (item === "opportunity") {
    opportunityVar = newState;
  } else {
    spiritVar = newState;
  }
  console.log(curiosityVar);
  if (
    roverInfoCuriosityVar &&
    roverInfoOpportunityVar &&
    roverInfoSpiritVar &&
    curiosityVar &&
    opportunityVar &&
    spiritVar
  ) {
    const newStore = store.set(
      "roverInfoCuriosity",
      Immutable.fromJS(roverInfoCuriosityVar)
    );
    console.log(roverInfoCuriosityVar);

    const newStore2 = newStore.set("curiosity", Immutable.fromJS(curiosityVar));
    const newStore3 = newStore2.set(
      "opportunity",
      Immutable.fromJS(opportunityVar)
    );
    const newStore4 = newStore3.set("spirit", Immutable.fromJS(spiritVar));
    const newStore5 = newStore4.set(
      "roverInfoOpportunity",
      Immutable.fromJS(roverInfoOpportunityVar)
    );
    const newStore6 = newStore5.set(
      "roverInfoSpirit",
      Immutable.fromJS(roverInfoSpiritVar)
    );
    console.log(newStore6);
    console.log(Immutable.Seq(newStore6));
    render(root, Immutable.Seq(newStore6));
    document.getElementById("Curiosity").click(() => (clickedItem = Curiosity));
    document
      .getElementById("Opportunity")
      .click(() => (clickedItem = Opportunity));
    document.getElementById("Spirit").click(() => (clickedItem = Spirit));
  }
};
const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = state => {
  const roversArr = state.getIn(["rovers"]);
  const newRoverInfoCuriosity = state.getIn(["roverInfoCuriosity"]);
  const newRoverInfoOpportunity = state.getIn(["roverInfoOpportunity"]);
  const newRoverInfoSpirit = state.getIn(["roverInfoSpirit"]);
  const newCuriosity = state.getIn(["curiosity"]);
  const newOpportunity = state.getIn(["opportunity"]);
  const newSpirit = state.getIn(["spirit"]);

  console.log(Immutable.fromJS(state));

  RoverInfoOpportunity(newRoverInfoOpportunity);
  RoverInfoCuriosity(newRoverInfoSpirit);
  RoverInfoSpirit(newRoverInfoSpirit);
  Curiosity(newCuriosity);
  Opportunity(newOpportunity);
  Spirit(newSpirit);

  const photos = state.getIn(["spirit", "spirit", "latest_photos"]);
  console.log(newRoverInfoOpportunity);

  console.log(roversArr);
  return `
        <header>
        <h1>
        Mars Dashboard
        </h1>
        </header>
        <nav>
        ${ul(roversArr)}

        </nav>
        <main>
        <p>
        revor name : ${
          newRoverInfoOpportunity
            ? state.getIn([
                "roverInfoOpportunity",
                "roverInfoOpportunity",
                "rover",
                "name"
              ])
            : ""
        }
        </p>
        <p>
        Launch Date :  ${
          newRoverInfoOpportunity
            ? state.getIn([
                "roverInfoOpportunity",
                "roverInfoOpportunity",
                "rover",
                "launch_date"
              ])
            : ""
        }
        </p>
        <p>
        Landing Date :  ${
          newRoverInfoOpportunity
            ? state.getIn([
                "roverInfoOpportunity",
                "roverInfoOpportunity",
                "rover",
                "landing_date"
              ])
            : ""
        }
        </p>
        <p>
        Status : ${
          newRoverInfoOpportunity
            ? state.getIn([
                "roverInfoOpportunity",
                "roverInfoOpportunity",
                "rover",
                "status"
              ])
            : ""
        }
        </p>
        <p>
          Most recently available photos :</p>
        </main>
        ${photosFun(photoesArr, photos)}
      
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Example of a pure function that renders infomation requested from the backend
const RoverInfoCuriosity = roverInfoCuriosity => {
  console.log(roverInfoCuriosity);
  if (!roverInfoCuriosity) {
    getRoverInfoCuriosity(store);
  }
};
const RoverInfoOpportunity = roverInfoOpportunity => {
  if (!roverInfoOpportunity) {
    getRoverInfoOpportunity(store);
  }
};
const RoverInfoSpirit = roverInfoSpirit => {
  if (!roverInfoSpirit) {
    getRoverInfoSpirit(store);
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

const getRoverInfoCuriosity = state => {
  let { roverInfoCuriosity } = state;
  fetch(`http://localhost:3000/roverinfoopportunity`)
    .then(res => res.json())
    .then(roverInfoCuriosity => {
      updateStore(store, "roverInfoCuriosity", { roverInfoCuriosity });
      console.log({ roverInfoCuriosity });
    });
};
const getRoverInfoOpportunity = state => {
  let { roverInfoOpportunity } = state;
  fetch(`http://localhost:3000/roverinfoopportunity`)
    .then(res => res.json())
    .then(roverInfoOpportunity => {
      updateStore(store, "roverInfoOpportunity", { roverInfoOpportunity });
      console.log({ roverInfoOpportunity });
    });
};
const getRoverInfoSpirit = state => {
  let { roverInfoSpirit } = state;
  fetch(`http://localhost:3000/roverinfospirit`)
    .then(res => res.json())
    .then(roverInfoSpirit => {
      updateStore(store, "roverInfoSpirit", { roverInfoSpirit });
      console.log({ roverInfoSpirit });
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
