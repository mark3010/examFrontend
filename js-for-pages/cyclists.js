import {URL} from "../settings.js"
import {handleHttpErrors, makeOptions} from "../fetchUtils.js"
const cyclistURL = URL+ "/cyclists"

export function CyclistHandler(){
    document.getElementById("team-btn-sort").onclick = getCyclists
}

export async function getCyclists(){

    let URL = cyclistURL

    if (document.getElementById("teamName-input-sort").value !== "") {
        URL = URL + "?team="+document.getElementById("teamName-input-sort").value
    }

    try{
     const cyclists = await fetch(URL).then(res=>handleHttpErrors(res))
     console.log(cyclists)
     const rows = cyclists.map(c=>`
        <tr>
          <td>${c.id}</td>
          <td>${c.name}</td>
          <td>${c.timeTotal}</td>
          <td>${c.mountainPoints}</td>
          <td>${c.sprintPoints}</td>
          <td>${c.team}</td>
        </tr>
     `).join("")
     document.getElementById("tbl-body").innerHTML = rows

    } catch(error){
        console.log(err.message)
    }
}

export async function getJerseyWinners(){
    try {
        await fetch(cyclistURL+"/jersey/yellow").then(res=>handleHttpErrors(res))
        .then(cyclist => {
            document.getElementById("userInformation-jersey-yellow").innerText = "Cyclist: " +cyclist.name
        })
    } catch(error) {
        console.log(error.message)
    }

    try {
    await fetch(cyclistURL+"/jersey/mountain").then(res=>handleHttpErrors(res))
        .then(cyclist => {
            document.getElementById("userInformation-jersey-mountain").innerText = "Cyclist: " +cyclist.name
        })
    } catch(error) {
        console.log(error.message)
    }


    try {
    await fetch(cyclistURL+"/jersey/green").then(res=>handleHttpErrors(res))
        .then(cyclist => {
            document.getElementById("userInformation-jersey-green").innerText = "Cyclist: " +cyclist.name
        })
    } catch(error) {
        console.log(error.message)
    }
    try {
    await fetch(cyclistURL+"/jersey/white").then(res=>handleHttpErrors(res))
        .then(cyclist => {
            document.getElementById("userInformation-jersey-white").innerText = "Cyclist: " +cyclist.name
        })
    } catch(error) {
        console.log(error.message)
    }
}

export function CrudHandler(){
    document.getElementById("cyclist-btn-add").onclick = addCyclist
    document.getElementById("cyclist-btn-edit").onclick = editCyclist
    document.getElementById("cyclist-btn-delete").onclick = deleteCyclist
}

export async function addCyclist() {
    const cyclist = {}
    cyclist.name = document.getElementById("name-input-add").value
    cyclist.team = document.getElementById("teamId-input-add").value
    cyclist.age = document.getElementById("age-input-add").value
    cyclist.timeTotal = document.getElementById("timeTotal-input-add").value
    cyclist.sprintPoints = document.getElementById("sprintPoints-input-add").value
    cyclist.mountainPoints = document.getElementById("mountainPoints-input-add").value

    let options = makeOptions("POST",cyclist)

    try {
    await fetch(cyclistURL,options).then(res=>handleHttpErrors(res))
        .then(newCyclist => {
            document.getElementById("userInformation-add").innerText = JSON.stringify(newCyclist,null,2)
        })
    } catch(error) {
        console.log(error.message)
    }

}

export async function editCyclist() {
    const cyclist = {}

    cyclist.id = document.getElementById("id-input-edit").value
    cyclist.name = document.getElementById("name-input-edit").value
    cyclist.team = document.getElementById("teamId-input-edit").value
    cyclist.age = document.getElementById("age-input-edit").value
    cyclist.timeTotal = document.getElementById("timeTotal-input-edit").value
    cyclist.sprintPoints = document.getElementById("sprintPoints-input-edit").value
    cyclist.mountainPoints = document.getElementById("mountainPoints-input-edit").value

    let options = makeOptions("PUT",cyclist)

    try {
        await fetch(cyclistURL, options).then(res => handleHttpErrors(res))
            .then(newCyclist => {
                document.getElementById("userInformation-edit").innerText = JSON.stringify(newCyclist, null, 2)
            })
    } catch (error) {
            console.log(error.message)
        }
}

export async function deleteCyclist() {
    const cyclist = {}
    cyclist.id = document.getElementById("id-input-delete").value

    let options = makeOptions("DELETE",cyclist)

    //this call never recieves a response so no response handling needed
    try {
    fetch(cyclistURL,options)
        .then(() => {
            document.getElementById("userInformation-delete").innerText = "User with id: "+document.getElementById("id-input-delete").value+" has been deleted"
        })
    } catch (error) {
        console.log(error.message)
    }
}