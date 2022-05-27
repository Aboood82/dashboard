const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});
const alo = document.getElementById("save-btn");
// alo.addEventListener("click", () => {
//   postInfo();
// });
const he7 = document.getElementById("ggg").value
e();
async function e() {
  console.log(he7)
}
const baseURL = "http://localhost:80/getUserGuilds/:id/";
var guild = document.getElementById("thisg").innerHTML;


// document.querySelector("#op").addEventListener("change", e => {
//   console.log(e.target.value)
// })

let role = "";

optionsList.forEach(o => {
  o.addEventListener("click", () => {
  
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
    const selectedRole = o.querySelector("label").innerHTML;
    console.log(`[ In select ]  ` + selectedRole)
    role = selectedRole;
 
  });
});
async function postInfo(e) {
if (role === "") return console.log(`roel is undefined`);
// if (guild)
  // e.preventDefault();
 console.log(`[ In fetch ]  ` + role)
  const res = await fetch(baseURL, {
    method:'POST',
    headers:{
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
        data:{
          guild:guild,
          roles:role,

        }
      }),
  });
}
var a = 1;
function rubby_show_hide() { if (a == 1) { document.getElementById("edit-div").style.display = "inline"; return a = 0; } else { document.getElementById("edit-div").style.display = "none"; return a = 1; }}
function gift_show_hide() { if (a == 1) { document.getElementById("edit-div").style.display = "inline"; return a = 0; } else { document.getElementById("edit-div").style.display = "none"; return a = 1; }}
function profile_show_hide() { if (a == 1) { document.getElementById("edit-div").style.display = "inline"; return a = 0; } else { document.getElementById("edit-div").style.display = "none"; return a = 1; }}
function user_show_hide() { if (a == 1) { document.getElementById("edit-div").style.display = "inline"; return a = 0; } else { document.getElementById("edit-div").style.display = "none"; return a = 1; }}
// function rubby_show_hide() { if (a == 1) { document.getElementById("edit-div").style.display = "inline"; return a = 0; } else { document.getElementById("edit-div").style.display = "none"; return a = 1; }}

var b = 1;
function show_hide() {
  if (b == 1) {
    document.getElementById("myimage").style.display = "inline";
    return b = 0;
  } else {
    document.getElementById("myimage").style.display = "none";
    return b = 1;
  }
}


