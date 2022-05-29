
import { renderTemplate, setActive, showPage } from "./utils.js"

import {getCandidates,addCandidateHandler} from "./js-for-pages/candidates.js"

function renderMenuItems(evt) {
  const element = evt.target
  setActive(element)
  const id = element.id;
  renderTemplate(id)  //This setups the HTML for the page
  switch (id) {
    //Here you can execute JavaScript for the selected page
    case "page-candidates": {
      getCandidates()
      break
    }
    case "page-add-candidates": {
      addCandidateHandler()
     }
  }
}

document.getElementById("menu").onclick = renderMenuItems;
showPage("intro-page") //Set the default page to render
