
// this fucntion return an array called allForms with the values from the local storage 
function MakeAllFormsArrayFromLocalStorage(){
    var allForms = [];
    var jsonAllForms = localStorage.getItem("userAllForm");
    allForms = JSON.parse(jsonAllForms);
    return allForms;
}

//  function Onclick  - make a note by click on button
function displayOnNote(e) {
    e.preventDefault();
    var taskBox = document.getElementById("taskBox");
    var dateBox = document.getElementById("dateBox");
    var timeBox = document.getElementById("timeBox");

    var form = {
        task: taskBox.value,
        date: dateBox.value,
        time: timeBox.value,
    };
    // Validation of text input by user, correct date and hour
    if (!isValid()) {
        return false;
    }

    var allForms = MakeAllFormsArrayFromLocalStorage();
    if (!allForms){
        allForms = [];
    }
  
    allForms.push(form);
    var i = allForms.length - 1;
    // Making notes with the input's user in it
    newNote(allForms, i);
    //    Clear the form
    taskBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
}

// fucntion to create a new note
function newNote(allForms, i) {
    var myNotesDiv = document.getElementById("myNotes");
    var newNoteEl = document.createElement('div');
    myNotesDiv.appendChild(newNoteEl);
    newNoteEl.className = 'note1';
    newNoteEl.innerHTML = '<a href="#"> <span onclick="clearNote1(this)" class="glyphicon glyphicon-remove"></span> </a>' + '<p class="taskSection"></p>' + '<p class="dateTime"></p>';
    var taskSection = document.getElementsByClassName("taskSection");
    var dateTime = document.getElementsByClassName("dateTime");
    taskSection[i].innerHTML = allForms[i].task;
    dateTime[i].innerHTML = allForms[i].date + "<br>" + allForms[i].time;

    //write to localStorage
    writeChangesToLocalStorage(allForms);
}

//  Loading data - on load
function restoreData() {
    // var jsonAllForms = localStorage.getItem("userAllForm");
    var allForms = MakeAllFormsArrayFromLocalStorage();
    if (allForms) {
        try {
            for (var i = 0; i < allForms.length; i++) {
                newNote(allForms, i)
            }
        } catch (e) {
            console.error("json parse error while parsing userAllForm");
        }
    }
}

// Validation for text input by user
function isValid() {
    var taskBox = document.getElementById("taskBox");
    var task = taskBox.value;
    var dateBox = document.getElementById("dateBox");
    var date = dateBox.value;
    var errTask = document.getElementById("errTask");
    var errDate = document.getElementById("errDate");

    resetFields(taskBox, dateBox, errTask, errDate);

    if (task == "") {
        errTask.innerText = "Please add your task!";
        taskBox.style.backgroundColor = "yellow";
        errTask.style.color = "red";
        return false;
    }

    if (date == "") {
        errDate.innerText = "Please add a date!";
        dateBox.style.backgroundColor = "yellow";
        errDate.style.color = "red";
        return false;
    }
    // validation of correct date
    if (!isFutureDate(date)) {
        return false;
    }
    return true;
}

//  reset fields of the form (part of the validation) 
function resetFields(taskBox, dateBox, errTask, errDate) {
    errTask.innerText = "";
    errDate.innerText = "";
    taskBox.style.backgroundColor = "";
    dateBox.style.backgroundColor = "";
}
// function of validation of correct date
function isFutureDate(userDate) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    userDate = userDate.split("-");

    if ((userDate[0] < yyyy) || ((userDate[0] == yyyy) && (parseInt(userDate[1]) < mm)) || ((userDate[0] == yyyy) && (parseInt(userDate[1]) == mm) && (parseInt(userDate[2]) < dd))) {
        alert("Task due date has passed. Please change it.");
        return false;
    }
    // validation of correct time
    if ((userDate[0] == yyyy) && (parseInt(userDate[1]) == mm) && (parseInt(userDate[2]) == dd)) {
        var timeBox = document.getElementById("timeBox");
        var time = timeBox.value;
        if (!isFutureTime(time)) {
            return false;
        }
    }
    return true;
}

// function of validation of correct time
function isFutureTime(userTime) {
    var currentDate = new Date();
    var currentTime = currentDate.getHours() + ":"
        + currentDate.getMinutes();
    userTime = userTime.split(":");
    currentTime = currentTime.split(":");

    if ((parseInt(userTime[0]) < parseInt(currentTime[0])) || (parseInt(userTime[0]) == parseInt(currentTime[0]) && (parseInt(userTime[1]) < parseInt(currentTime[1])))) {
        alert("Task due time has passed. Please change it.");
        return false;
    }
    return true;
}

//  Clear the notes
function clearNote1(el) {
    var divNote = el.closest(".note1");
    var indexNote = getElementIndex(divNote);
    divNote.parentNode.removeChild(divNote);

    var allForms = MakeAllFormsArrayFromLocalStorage();
    allForms.splice(indexNote, 1);

    //write to localStorage
    writeChangesToLocalStorage(allForms);
}

function getElementIndex(el) {
    var index = 0;
    while ((el = el.previousElementSibling)) {
        index++;
    }
    return index;
}

//write to localStorage
function writeChangesToLocalStorage(allForms) {
    var jsonAllForms = JSON.stringify(allForms);
    localStorage.setItem("userAllForm", jsonAllForms);
}



