let store = Immutable.fromJS({
  user: { name: "Student" },
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  chosenRover: "Curiosity"
});
// add our markup to the page
const root = document.getElementById("root");

const updateStore = (state, newState) => {
  console.log(newState);
  const newStore = store.set("roverInfo", Immutable.fromJS(newState.roverInfo));
  console.log(Immutable.Seq(newStore));
  render(root, Immutable.Seq(newStore));
};
const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = state => {
  console.log(state);
  let { rovers, roverInfo } = state;
  const roversArr = state.getIn(["rovers"]);
  const newRoverInfo1 = state.getIn(["roverInfo", "rover", "id"]);
  const newRoverInfo = state.getIn(["roverInfo"]);
  console.log(state);
  console.log(newRoverInfo1);
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
        revor name :
        </p>
        <p>
        Launch Date : 
        </p>
        <p>
        Landing Date : 
        </p>
        <p>
        Status :
        </p>
        <p>
          Most recently available photos :</p>
        </main>
        <section>
        <div class="imgContainer">
        ${ImageOfTheDay(newRoverInfo)}
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

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = name => {
  if (name) {
    return `
            <h1>Welcome, ${name}!</h1>
        `;
  }

  return `
        <h1>Hello!</h1>
    `;
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = roverInfo => {
  // If image does not already exist, or it is not from today -- request it again
  console.log(roverInfo);
  // const today = new Date();
  // const photodate = new Date(roverInfo.date);
  // console.log(photodate.getDate(), today.getDate());
  // console.log(photodate.getDate() === today.getDate());
  if (!roverInfo) {
    getImageOfTheDay(store);
  }
  console.log(roverInfo);

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
const getImageOfTheDay = state => {
  console.log(state);
  let { roverInfo } = state;
  console.log({ roverInfo });
  fetch(`http://localhost:3000/roverinfo`)
    .then(res => res.json())
    .then(roverInfo => {
      updateStore(store, { roverInfo });
      console.log({ roverInfo });
    });
  // return data;
};
