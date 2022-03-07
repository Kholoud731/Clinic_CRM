 
//  login function 
// check the maching user name with password
// redirect to the dashbord page
// store the token in the local host
 function signIn(event){
    event.preventDefault()
    const data = {
        'username': document.getElementById('username').value,
        'password': document.getElementById('password').value
    }
    fetch('http://localhost:8000/signin/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data.token);
        if(data.token){
            window.localStorage.setItem("token", data.token);
            window.location.href="./dashboard.html";
        }else{
            document.getElementById("msg").innerHTML = "Incorrect credintals"
            document.getElementById("msg").style.color = "red"
        }

        })
        .catch((error) => {
        console.error('Error:', error);
        });  

}

//  logout function 
// fetch the logout and remove the token from the database 
// redirect to the index page
function logout(event){
    event.preventDefault()
    const token = window.localStorage.getItem("token");
    fetch('http://localhost:8000/logout/',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data.msg);
        window.location.href="./index.html";
        })
        .catch((error) => {
        console.error('Error:', error);
        });  
}

//  regesiter function 
// check the maching username , email with password
// redirect to the index page
function signUp(event){
    event.preventDefault()
    const data = {
        'username': document.getElementById('username').value,
        'email': document.getElementById('email').value,
        'password': document.getElementById('password').value,
        'password_confirmation': document.getElementById('password2').value
    }
    fetch('http://localhost:8000/signup/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        window.location.href="./index.html";
        })
        .catch((error) => {
        console.error('Error:', error);
        });
}

//  forgot password function 
// check the maching email with password
// redirect to the index page
function forgot(event){
    event.preventDefault()
    const data = {
        'email': document.getElementById('email').value,
        'new_password': document.getElementById('password').value,
        'new_password2': document.getElementById('password2').value
    }
    fetch('http://localhost:8000/reset/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        if(data.msg){
            window.location.href="./index.html";
        }else{
            document.getElementById("error-msg").innerHTML = "Password doesn't match"
            document.getElementById("error-msg").style.color = "red"
        }
        })
        .catch((error) => {
        console.error('Error:', error);
        });
}

// default reload function
// set color for the sidebar first child 
// display the clients appointments 
function defaultPage(){
    const sideBar =  document.getElementsByClassName("nav-link")
    sideBar[0].classList.add("active")

    const token = window.localStorage.getItem("token");

    // admin or normal user? 
    fetch('http://localhost:8000/user-details/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {
        // console.log('Success:', data.is_staff);
        if(data.is_staff){
            document.getElementById("admin-edit").style.display="block"
            viewAllAppointments()
        }else{
            
            document.getElementById("admin-edit").style.display="none"
            viewClientsAppointments()
        }
    })
    .catch(error => {
        console.error('Error:', error);
        });


}

// reschadualed selection 
function rescheduleUser(){
    const sideBar =  document.getElementsByClassName("nav-link")
    sideBar[0].classList.add("active")

    const token = window.localStorage.getItem("token");

    // admin or normal user? 
    fetch('http://localhost:8000/user-details/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {
        // console.log('Success:', data.is_staff);
        if(data.is_staff){
            allRescheduled()
        }else{
            rescheduled()
        }
    })
    .catch(error => {
        console.error('Error:', error);
        });


}

// cancelled selection 
function cancelledUser(){
    const sideBar =  document.getElementsByClassName("nav-link")
    sideBar[0].classList.add("active")

    const token = window.localStorage.getItem("token");

    // admin or normal user? 
    fetch('http://localhost:8000/user-details/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {
        // console.log('Success:', data.is_staff);
        if(data.is_staff){
            allCancelled()
        }else{
            Cancelled()
        }
    })
    .catch(error => {
        console.error('Error:', error);
        });


}




// Admin functions 
// 1. view all appointments and show all but the cancelled and the reschadualed 
function viewAllAppointments(event){
    document.getElementById("table-card").style.display = 'block'
    document.getElementById("reservation-card").style.display = 'none'
    document.getElementById("hour").style.display = 'none'

    changeColor()
    const sideBar =  document.getElementsByClassName("nav-link")
    sideBar[0].classList.add("active")
    const token = window.localStorage.getItem("token");
    fetch('http://localhost:8000/view-all/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        let parent = document.getElementById('tbody')
        parent.innerHTML = ""

        data.map(elm => {
            if(elm.reschedule){

            }else if(elm.status === "Canceled"){

            }else{

            // get the time from the return string
            let appointment_time = elm.appointment_time // date object
            let date = new Date(appointment_time)
            // get hours and mins from the object to fix the display
            let hourString = date.getHours().toString()
            let minString = date.getMinutes().toString()
            // fixing the hours mins display 
            if(hourString.length == 1){
                hourString =   "0" + hourString
            }
            
            if(minString.length == 1){
                minString =   "0" + minString
            }
            // append to the table 
            let row = document.createElement("tr");
            let idElement = document.createElement("td");
            idElement.innerHTML = `<div class="d-flex px-2 py-1">
            <span>${elm.id}</span>
           </div>`
            row.appendChild(idElement)
            let nameElement = document.createElement("td");
            nameElement.innerHTML = `<div class="d-flex px-2 py-1">
            <span>${elm.created_by.username}</span>
           </div>`
            row.appendChild(nameElement)
            let creationTime = document.createElement("td");
            creationTime.innerHTML = `
            <span>${date.getDate()}</span>
            <span>-</span>
            <span>${date.getMonth() +1}</span>
            <span>-</span>
            <span>${date.getFullYear()}</span>
            <span>"${hourString}</span>
            <span>:</span>
            <span>${minString}"</span>`
            row.appendChild(creationTime)
            let appointmentStatus = document.createElement("td");
            appointmentStatus.classList.add("align-middle")
            appointmentStatus.classList.add("text-center")
            appointmentStatus.classList.add("text-sm")
            appointmentStatus.innerHTML=`<span>${elm.status}</span>`
            row.appendChild(appointmentStatus)
            let actions = document.createElement("td");
            actions.classList.add("align-middle")
            actions.classList.add("text-center")
            actions.classList.add("text-sm")
            actions.innerHTML=`<button onclick="cancelAppointment(event)"  type="button" class="btn btn-outline-danger btn-sm">Cancel</button>
            <button onclick="approveAppointment(event)" type="button" class="btn btn-outline-primary btn-sm">Approve</button>
            <button onclick="markMissed(event)" type="button" class="btn btn-outline-success btn-sm">Missed</button>
            <button onclick="markFinished(event)" type="button" class="btn btn-outline-dark btn-sm">Finished</button>`
            row.appendChild(actions)
            parent.appendChild(row)
            }
        })


        })
        .catch((error) => {
        console.error('Error:', error);
        });
}

// 2. function to get the reschadualed appointments 
function allRescheduled(event){
    document.getElementById("table-card").style.display = 'block'
    document.getElementById("reservation-card").style.display = 'none'
    document.getElementById("hour").style.display = 'none'
    changeColor()
    const sideBar =  document.getElementsByClassName("nav-link")
    sideBar[2].classList.add("active")
    const token = window.localStorage.getItem("token");
    fetch('http://localhost:8000/view-all/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        let parent = document.getElementById('tbody')
        parent.innerHTML = ""

        data.map(elm => {
            if(!elm.reschedule){

            }else{

            // get the time from the return string
            let appointment_time = elm.appointment_time // date object
            let date = new Date(appointment_time)
            // get hours and mins from the object to fix the display
            let hourString = date.getHours().toString()
            let minString = date.getMinutes().toString()
            // fixing the hours mins display 
            if(hourString.length == 1){
                hourString =   "0" + hourString
            }
            
            if(minString.length == 1){
                minString =   "0" + minString
            }
            // append to the table 
            let row = document.createElement("tr");
            let idElement = document.createElement("td");
            idElement.innerHTML = `<div class="d-flex px-2 py-1">
            <span>${elm.id}</span>
           </div>`
            row.appendChild(idElement)
            let nameElement = document.createElement("td");
            nameElement.innerHTML = `<div class="d-flex px-2 py-1">
            <span>${elm.created_by.username}</span>
           </div>`
            row.appendChild(nameElement)
            let creationTime = document.createElement("td");
            creationTime.innerHTML = `
            <span>${date.getDate()}</span>
            <span>-</span>
            <span>${date.getMonth() +1}</span>
            <span>-</span>
            <span>${date.getFullYear()}</span>
            <span>"${hourString}</span>
            <span>:</span>
            <span>${minString}"</span>`
            row.appendChild(creationTime)
            let appointmentStatus = document.createElement("td");
            appointmentStatus.classList.add("align-middle")
            appointmentStatus.classList.add("text-center")
            appointmentStatus.classList.add("text-sm")
            appointmentStatus.innerHTML=`<span>${elm.status}</span>`
            row.appendChild(appointmentStatus)
            let actions = document.createElement("td");
            actions.classList.add("align-middle")
            actions.classList.add("text-center")
            actions.classList.add("text-sm")
            actions.innerHTML=`<button onclick="cancelAppointment(event)"  type="button" class="btn btn-outline-danger btn-sm">Cancel</button>
            <button onclick="approveAppointment(event)" type="button" class="btn btn-outline-primary btn-sm">Approve</button>`
            row.appendChild(actions)
            parent.appendChild(row)
            }
        })


        })
        .catch((error) => {
        console.error('Error:', error);
        });
}

// 3. function to show all the cancelled appointments 
function allCancelled(event){
    document.getElementById("table-card").style.display = 'block'
    document.getElementById("reservation-card").style.display = 'none'
    document.getElementById("hour").style.display = 'none'
    changeColor()
    const sideBar =  document.getElementsByClassName("nav-link")
    sideBar[3].classList.add("active")
    const token = window.localStorage.getItem("token");
    fetch('http://localhost:8000/view-all/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        let parent = document.getElementById('tbody')
        parent.innerHTML = ""

        data.map(elm => {
            if(elm.status === 'Canceled'){

            // get the time from the return string
            let appointment_time = elm.appointment_time // date object
            let date = new Date(appointment_time)
            // get hours and mins from the object to fix the display
            let hourString = date.getHours().toString()
            let minString = date.getMinutes().toString()
            // fixing the hours mins display 
            if(hourString.length == 1){
                hourString =   "0" + hourString
            }
            
            if(minString.length == 1){
                minString =   "0" + minString
            }
            // append to the table 
            let row = document.createElement("tr");
            let idElement = document.createElement("td");
            idElement.innerHTML = `<div class="d-flex px-2 py-1">
            <span>${elm.id}</span>
           </div>`
            row.appendChild(idElement)
            let nameElement = document.createElement("td");
            nameElement.innerHTML = `<div class="d-flex px-2 py-1">
            <span>${elm.created_by.username}</span>
           </div>`
            row.appendChild(nameElement)
            let creationTime = document.createElement("td");
            creationTime.innerHTML = `
            <span>${date.getDate()}</span>
            <span>-</span>
            <span>${date.getMonth() +1}</span>
            <span>-</span>
            <span>${date.getFullYear()}</span>
            <span>"${hourString}</span>
            <span>:</span>
            <span>${minString}"</span>`
            row.appendChild(creationTime)
            let appointmentStatus = document.createElement("td");
            appointmentStatus.classList.add("align-middle")
            appointmentStatus.classList.add("text-center")
            appointmentStatus.classList.add("text-sm")
            appointmentStatus.innerHTML=`<span>${elm.status}</span>`
            row.appendChild(appointmentStatus)
            let actions = document.createElement("td");
            actions.classList.add("align-middle")
            actions.classList.add("text-center")
            actions.classList.add("text-sm")
            actions.innerHTML=`<button onclick="cancelAppointment(event)"  type="button" class="btn btn-outline-danger btn-sm">Cancel</button>
            <button onclick="approveAppointment(event)" type="button" class="btn btn-outline-primary btn-sm">Approve</button>`
            row.appendChild(actions)
            parent.appendChild(row)
            }
        })


        })
        .catch((error) => {
        console.error('Error:', error);
        });

}

// 4. admin access to edit weekly working hours 
function editHours(event){
    const sideBar =  document.getElementsByClassName("nav-link")
    changeColor()
    sideBar[4].classList.add("active")
    document.getElementById("table-card").style.display = 'none'
    document.getElementById("reservation-card").style.display = 'none'
    document.getElementById("hour").style.display = 'block'
    const token = window.localStorage.getItem("token");

    event.preventDefault()
    const data = {
        'day': document.querySelector('input[name="day"]:checked').value,
        'start_time': document.getElementById('from').value,
        'end_time':document.getElementById('to').value
    }
    fetch('http://localhost:8000/edit-working/',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        
            window.location.href="./dashboard.html";

        })
        .catch((error) => {
        console.error('Error:', error);
        });  
    console.log(data)
}




//  normal user front end and functions 
// 1. user view for him appointments
function viewClientsAppointments(event){
    
    document.getElementById("table-card").style.display = 'block'
    document.getElementById("reservation-card").style.display = 'none'
    document.getElementById("hour").style.display = 'none'
    changeColor()
    const sideBar =  document.getElementsByClassName("nav-link")
    sideBar[0].classList.add("active")
    const token = window.localStorage.getItem("token");
    console.log(sideBar[0])
    fetch('http://localhost:8000/view-client/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {
        
            let parent = document.getElementById('tbody')
            parent.innerHTML = ''
       
        data.map(elm => {
            if(elm.reschedule){

            }else if(elm.status === "Canceled"){

            }else{
            
            // get the time from the return string
            let appointment_time = elm.appointment_time // date object
            let date = new Date(appointment_time)
            // get hours and mins from the object to fix the display
            let hourString = date.getHours().toString()
            let minString = date.getMinutes().toString()
            // fixing the hours mins display 
            if(hourString.length == 1){
                hourString =   "0" + hourString
            }
            
            if(minString.length == 1){
                minString =   "0" + minString
            }
            // append to the table 
            
            let row = document.createElement("tr");
            let idElement = document.createElement("td");
            idElement.innerHTML = `<div class="d-flex px-2 py-1">
            <span>${elm.id}</span>
           </div>`
            row.appendChild(idElement)
            let nameElement = document.createElement("td");
            nameElement.innerHTML = `<div class="d-flex px-2 py-1">
            <span>${elm.created_by.username}</span>
           </div>`
            row.appendChild(nameElement)
            let creationTime = document.createElement("td");
            creationTime.innerHTML = `
            <span>${date.getDate()}</span>
            <span>-</span>
            <span>${date.getMonth() +1}</span>
            <span>-</span>
            <span>${date.getFullYear()}</span>
            <span>"${hourString}</span>
            <span>:</span>
            <span>${minString}"</span>`
            row.appendChild(creationTime)
            let appointmentStatus = document.createElement("td");
            appointmentStatus.classList.add("align-middle")
            appointmentStatus.classList.add("text-center")
            appointmentStatus.classList.add("text-sm")
            appointmentStatus.innerHTML=`<span>${elm.status}</span>`
            row.appendChild(appointmentStatus)
            let actions = document.createElement("td");
            actions.classList.add("align-middle")
            actions.classList.add("text-center")
            actions.classList.add("text-sm")
            actions.innerHTML=`<button onclick="cancelAppointment(event)"  type="button" class="btn btn-outline-danger btn-sm">Cancel</button>
            <button onclick="rescheduleAppointment(event)" type="button" class="btn btn-outline-primary btn-sm">Reschedule</button>`
            row.appendChild(actions)
            parent.appendChild(row)
        
            }

        })


        })
        .catch((error) => {
        console.error('Error:', error);
        });
        
}

// 2. reschudualed appointments for this user
function rescheduled(event){
    document.getElementById("table-card").style.display = 'block'
    document.getElementById("reservation-card").style.display = 'none'
    document.getElementById("hour").style.display = 'none'
    changeColor()
    const sideBar =  document.getElementsByClassName("nav-link")
    sideBar[2].classList.add("active")
    const token = window.localStorage.getItem("token");
    fetch('http://localhost:8000/view-client/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        let parent = document.getElementById('tbody')
        parent.innerHTML = ""

        data.map(elm => {
            if(!elm.reschedule){

            }else{

            // get the time from the return string
            let appointment_time = elm.appointment_time // date object
            let date = new Date(appointment_time)
            // get hours and mins from the object to fix the display
            let hourString = date.getHours().toString()
            let minString = date.getMinutes().toString()
            // fixing the hours mins display 
            if(hourString.length == 1){
                hourString =   "0" + hourString
            }
            
            if(minString.length == 1){
                minString =   "0" + minString
            }
            // append to the table 
            let row = document.createElement("tr");
            let idElement = document.createElement("td");
            idElement.innerHTML = `<div class="d-flex px-2 py-1">
            <span>${elm.id}</span>
           </div>`
            row.appendChild(idElement)
            let nameElement = document.createElement("td");
            nameElement.innerHTML = `<div class="d-flex px-2 py-1">
            <span>${elm.created_by.username}</span>
           </div>`
            row.appendChild(nameElement)
            let creationTime = document.createElement("td");
            creationTime.innerHTML = `
            <span>${date.getDate()}</span>
            <span>-</span>
            <span>${date.getMonth() +1}</span>
            <span>-</span>
            <span>${date.getFullYear()}</span>
            <span>"${hourString}</span>
            <span>:</span>
            <span>${minString}"</span>`
            row.appendChild(creationTime)
            let appointmentStatus = document.createElement("td");
            appointmentStatus.classList.add("align-middle")
            appointmentStatus.classList.add("text-center")
            appointmentStatus.classList.add("text-sm")
            appointmentStatus.innerHTML=`<span>${elm.status}</span>`
            row.appendChild(appointmentStatus)
            let actions = document.createElement("td");
            actions.classList.add("align-middle")
            actions.classList.add("text-center")
            actions.classList.add("text-sm")
            actions.innerHTML=`<span style="color:red">Please wait for the confirmation</span>`
            row.appendChild(actions)
            parent.appendChild(row)
            }
            
        })


        })
        .catch((error) => {
        console.error('Error:', error);
        });
}

// 3. cancelled appointments for this user
function Cancelled(event){
    document.getElementById("table-card").style.display = 'block'
    document.getElementById("reservation-card").style.display = 'none'
    document.getElementById("hour").style.display = 'none'
    changeColor()
    const sideBar =  document.getElementsByClassName("nav-link")
    sideBar[3].classList.add("active")
    const token = window.localStorage.getItem("token");
    fetch('http://localhost:8000/view-client/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        let parent = document.getElementById('tbody')
        parent.innerHTML = ""

        data.map(elm => {
            if(elm.status === 'Canceled'){

            // get the time from the return string
            let appointment_time = elm.appointment_time // date object
            let date = new Date(appointment_time)
            // get hours and mins from the object to fix the display
            let hourString = date.getHours().toString()
            let minString = date.getMinutes().toString()
            // fixing the hours mins display 
            if(hourString.length == 1){
                hourString =   "0" + hourString
            }
            
            if(minString.length == 1){
                minString =   "0" + minString
            }
            // append to the table 
            let row = document.createElement("tr");
            let idElement = document.createElement("td");
            idElement.innerHTML = `<div class="d-flex px-2 py-1">
            <span>${elm.id}</span>
           </div>`
            row.appendChild(idElement)
            let nameElement = document.createElement("td");
            nameElement.innerHTML = `<div class="d-flex px-2 py-1">
            <span>${elm.created_by.username}</span>
           </div>`
            row.appendChild(nameElement)
            let creationTime = document.createElement("td");
            creationTime.innerHTML = `
            <span>${date.getDate()}</span>
            <span>-</span>
            <span>${date.getMonth() +1}</span>
            <span>-</span>
            <span>${date.getFullYear()}</span>
            <span>"${hourString}</span>
            <span>:</span>
            <span>${minString}"</span>`
            row.appendChild(creationTime)
            let appointmentStatus = document.createElement("td");
            appointmentStatus.classList.add("align-middle")
            appointmentStatus.classList.add("text-center")
            appointmentStatus.classList.add("text-sm")
            appointmentStatus.innerHTML=`<span>${elm.status}</span>`
            row.appendChild(appointmentStatus)
            let actions = document.createElement("td");
            actions.classList.add("align-middle")
            actions.classList.add("text-center")
            actions.classList.add("text-sm")
            actions.innerHTML=`<span style="color:green">Please reserve other appointment</span>`
            row.appendChild(actions)
            parent.appendChild(row)
            }
        })


        })
        .catch((error) => {
        console.error('Error:', error);
        });

}


// for client and admin
// 1. reservation
function resevation(event){

    document.getElementById("table-card").style.display = 'none'
    document.getElementById("reservation-card").style.display = 'block'
    document.getElementById("hour").style.display = 'none'
    const token = window.localStorage.getItem("token");
    const sideBar =  document.getElementsByClassName("nav-link")
    for ( let i=0; i< sideBar.length; i++){
     sideBar[i].classList.remove("active")
    }
    sideBar[1].classList.add("active")
    document.getElementById("table-card").style.display = 'none'



    fetch('http://localhost:8000/working/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
       
        
        let parent = document.getElementById('reservation-body')
        parent.innerHTML = ""
        data.map(elm => {
            var now = new Date();
            let startTime = elm.start_time.split(":")
            let endTime = elm.end_time.split(":")
            let timeSlots = []
            for(let i =0; i<2; i++){
                let checking = endTime[i]-startTime[i]
                timeSlots.push(checking)
            }
            
            let totalSlouts = timeSlots[0]/0.5 + timeSlots[1]/30
            let start = parseInt(startTime[0])
            let end = parseInt(startTime[1])
            let inner = ``
            for(let j = 0 ; j< totalSlouts; j++){
                if(end == 30){
                    start += 1
                    end = 0

                    let startString = start.toString()
                    let endString = end.toString()
                    // fixing the hours mins display 
                    if(startString.length == 1){
                        startString =   "0" + startString
                    }
                    
                    if(endString.length == 1){
                        endString =   "0" + endString
                    }

                    
                    inner += `<button onclick="reserveAppointment(event)"  type="button" class="btn btn-outline-primary btn-sm" style="padding:5px">${startString}:${endString}</button>`
                }else{
                    end += 30

                    let startString = start.toString()
                    let endString = end.toString()
                    // fixing the hours mins display 
                    if(startString.length == 1){
                        startString =   "0" + startString
                    }
                    
                    if(endString.length == 1){
                        endString =   "0" + endString
                    }

                    
                    inner += `<button onclick="reserveAppointment(event)"  type="button" class="btn btn-outline-primary btn-sm" style="padding:5px">${startString}:${endString}</button>`                }
            }

            let row = document.createElement("tr");
            let idElement = document.createElement("td");
            idElement.innerHTML = `<div class="d-flex px-2 py-1">
            <span>${elm.day}</span>
           </div>`
            row.appendChild(idElement)

        let actions = document.createElement("td");
        actions.classList.add("align-middle")
        actions.classList.add("text-center")
        actions.classList.add("text-sm")
        actions.innerHTML=inner
        row.appendChild(actions)   
            parent.appendChild(row)
        
        })


        })
        .catch((error) => {
        console.error('Error:', error);
        });

}

// 2. common function to change color of selected sidebar element
function changeColor(){
    const sideBar =  document.getElementsByClassName("nav-link")
    for ( let i=0; i< sideBar.length; i++){
     sideBar[i].classList.remove("active")
    }
 }



