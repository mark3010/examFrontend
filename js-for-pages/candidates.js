import {URL} from "../settings.js"
import {handleHttpErrors} from "../fetchUtils.js"
const candidateURL = URL+ "/candidates"


export async function getCandidates(){

    try{
     const candidates = await fetch(candidateURL).then(res=>handleHttpErrors(res))
     console.log(candidates)
     const rows = candidates.map(c=>`
        <tr>
          <td>${c.id}</td>
          <td>${c.name}</td>
          <td>${c.partyLetter}</td>
        </tr>
     `).join("")
     document.getElementById("tbl-body").innerHTML = rows



    } catch(err){
        console.log(err.message)
    }

}