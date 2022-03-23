const theName = document.getElementById("name");
const english = document.getElementById("english");
const mathematics = document.getElementById("mathematics");
const chemistry = document.getElementById("chemistry");
const physics = document.getElementById("physics");
const biology = document.getElementById("biology");
const total = document.getElementById("total");
const create = document.getElementById("create");


let mood = "create";
let tmp;


// not work BTN
function disabledBtn() {
    if (theName.value != "") {
        create.disabled = false;
        create.style.textDecoration = "none"

    }else {
        create.disabled = true;
        create.style.textDecoration = "line-through"


    } 
}
disabledBtn();


// get Agerage 
function getAgerage() {

    if (english.value != "") {

     let  resulte =  (+english.value + +mathematics.value + +chemistry.value + +physics.value + +biology.value) / 5;

     total.innerHTML = resulte;

     if (resulte >= 50) {
         total.style.backgroundColor = "green"   
     }else {
        total.style.backgroundColor = "red"   
     }

    } else {
     total.innerHTML = "";
     total.style.backgroundColor = "red";

    }  
};




// save Data in Array and localStorage
let dataPro;

if (localStorage.product != null) {

    dataPro = JSON.parse(localStorage.product);
    
}
else {

     dataPro = []
}

create.onclick = function () {
  

    let newData = {
        theName:theName.value.toLowerCase(),
        english:english.value,
        mathematics:mathematics.value,
        chemistry:chemistry.value,
        physics:physics.value,
        biology:biology.value,
        total:total.innerHTML
    };

    if (mood === "create") {
    dataPro.push(newData);
        
    }
    else {
        dataPro[tmp] =newData;
        mood = "create";
        create.innerHTML="Create";
    }

    localStorage.setItem("product", JSON.stringify(dataPro))
    






    clearData();
    disabledBtn();
    showData();
    showDeleteBtn(); 




}



// clear Data
function clearData() {

    theName.value ="";
    english.value ="";
    mathematics.value ="";
    chemistry.value ="";
    physics.value="";
    biology.value="";
    total.innerHTML = "";
    total.style.backgroundColor = "red";
    
}



// show Data in HTML
function showData() {

    const tbody = document.getElementById("tbody");

    let table = ""
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
        <td>${1 + i}</td>
        <td>${dataPro[i].theName}</td>
        <td>${dataPro[i].english}</td>
        <td>${dataPro[i].mathematics}</td>
        <td>${dataPro[i].chemistry}</td>
        <td>${dataPro[i].physics}</td>
        <td>${dataPro[i].biology}</td>
        <td>${dataPro[i].total}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
    </tr>`
    }
    tbody.innerHTML = table;
    


    showDeleteBtn()
};
showData();


// delete product
function deletePro(i) {
    dataPro.splice(i,1);

    localStorage.product = JSON.stringify(dataPro);

    showData();
    
    
}

// show the button delete All
function showDeleteBtn() {
    const countainerForDeleteAllBtn = document.getElementById("countainerForDeleteAllBtn");
    if (tbody.innerHTML != "") {

    countainerForDeleteAllBtn.innerHTML = `<button onclick="deleteAll()" id="deleteAll">Delete All</button>`;
   }  else {
    countainerForDeleteAllBtn.innerHTML ="";
}
}





// delete All 
function deleteAll() {
    dataPro.splice(0);
    localStorage.product = JSON.stringify(dataPro);
    showData();  
}

// update Data
 function updateData(i) {
     mood = "update";
     tmp = i ;

     theName.value = dataPro[i].theName;
     english.value = dataPro[i].english;
     mathematics.value = dataPro[i].mathematics;
     chemistry.value = dataPro[i].chemistry;
     physics.value = dataPro[i].physics;
     biology.value = dataPro[i].biology;

     create.disabled = false;
     create.innerHTML = "Update";
     create.style.textDecoration = "none";

     getAgerage();
     scroll({
         top:0,
         behavior: "smooth"
         
     })
 };


 function searchData(value) {

    let table="";
     for (let i = 0; i < dataPro.length; i++) {
         if (dataPro[i].theName.includes(value.toLowerCase())) {
         table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].theName}</td>
            <td>${dataPro[i].english}</td>
            <td>${dataPro[i].mathematics}</td>
            <td>${dataPro[i].chemistry}</td>
            <td>${dataPro[i].physics}</td>
            <td>${dataPro[i].biology}</td>
            <td>${dataPro[i].total}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
        </tr>`
         }
       
     }
    tbody.innerHTML = table;
   
 }






