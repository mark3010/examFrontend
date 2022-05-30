
import { renderTemplate, setActive, showPage } from "./utils.js"

import {CyclistHandler, CrudHandler, getJerseyWinners, getCyclists} from "./js-for-pages/cyclists.js"

function renderMenuItems(evt) {
  const element = evt.target
  setActive(element)
  const id = element.id;
  renderTemplate(id)
  switch (id) {
    //execute js for each page
    case "page-cyclists": {
      CyclistHandler()
      getCyclists() //calling once seperately from cyclistHandler to refresh page
      break
    }
    case "page-crud": {
      CrudHandler()
      break
     }
    case "page-jerseys": {
      getJerseyWinners()

    }
  }
}

document.getElementById("menu").onclick = renderMenuItems;

showPage("page-about")
