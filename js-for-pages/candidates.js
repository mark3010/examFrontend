import {URL} from "../settings.js"
import {handleHttpErrors, makeOptions} from "../fetchUtils.js"
const candidateURL = URL+ "/candidates"

export async function getCandidates(){
    try{
     const candidates = await fetch(candidateURL).then(res=>handleHttpErrors(res))
     console.log(candidates)
     const rows = candidates.map(c=>`
        <tr>
          <td>${c.id}</td>
          <td>${c.name}</td>
          <td>${c.party}</td>
        </tr>
     `).join("")
     document.getElementById("tbl-body").innerHTML = rows

    } catch(err){
        console.log(err.message)
    }
}


export function addCandidateHandler(){
    document.getElementById("add-candidate-btn").onclick = addCandidate
}

export async function addCandidate() {
    const candidate = {}
    candidate.name = document.getElementById("name-input").value

    let options = makeOptions("POST",candidate)

    fetch(candidateURL,options)
        .then(res => res.json())
        .then(newUser => {
            document.getElementById("userInformation").innerText = JSON.stringify(newUser,null,2)
        })
        .catch(error => console.error(error))
}