//add event listeners
document.addEventListener("DOMContentLoaded", function() {

    // destinations page - budget filter buttons
    const buttons = document.querySelectorAll(".budget-btn");
    const sections = document.querySelectorAll(".dest-section");
    const promptMsg = document.getElementById("prompt-msg");

 ?

                //Mark this button as active

                this.classList.add("active-btn");

                //hide the prompt message
                if (propmtMsg) {
                    propmtMsg.style.display = "none";
                }
            });
        }
    }


    //Booking page -- Form submit & local storage

    const bookingForm = document.getElementById("bookingForm");
    const feedback = document.getElementById("feedback");

    if (bookingForm) {
        showSavedBookings();

        bookingForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const dest = document.getElementById("dest").value.trim();


//clear old errors
            document.getElementById("name-err").textContent = "";
            document.getElementById("email-err").textContent = "";
            document.getElementById("dest-err").textContent = "";
            document.getElementById("name").classList.remove("input-err");
            document.getElementById("email").classList.remove("input-err");
            document.getElementById("dest").classList.remove("input-err");

            //validate fields - 'let' used here because the value changes

            let valid = true;

            if (name === "") {
                document.getElementById("name-err").textContent = 
                "please enter your name.";
                document.getElementById("name").classList.add("input-err");
                valid = false
            }
           
            if (email === "" || email.indexOf("@") === -1) {
                document.getElementById("email-err").textContent = 
                "please enter a valid email.";
                document.getElementById("email").classList.add("input-err");
                valid = false
            }

            if (dest === "") {
                document.getElementById("dest-err").textContent = 
                "please enter your destination.";
                document.getElementById("dest").classList.add("input-err");
                valid = false
            }

            if (!valid) return;

            const booking = {
                name: name,
                email: email,
                destination: dest,
                date: new Date().toLocaleString(),
            };

            const existing = localStorage.getItem("bookings");
            const allBookings = existing ? JSON.parse(existing) : [];

            allBookings.push(booking);
            localStorage.setItem("bookings", JSON.stringify(allBookings));

            feedback.style.display = "block"
            feedback.style.color = "green";
            feedback.textContent = 
            "destination saved! your trip to " + dest + " has been reserved. ";

            bookingForm.reset();
            showSavedBookings();
        });
    }

    function showSavedBookings() {
        const list = document.getElementById("bookings-list");
        if (!list) return;

        const existing = localStorage.getItem("bookings")
        const allBookings = existing ? JSON.parse(existing) : [];

        if (allBookings.length === 0) {
            list.innerHTML = "<p class='no-bookings'>No Bookings Saved Yet</p>";
            return;
        }

        list.innerHTML = "";

        //let used for loop counter
        for (let i = allBookings.length - 1; i >= 0; i--){
            const b = allBookings[i];
            const record = document.createElement("div");
            record.className = "booking-record";
            record.innerHTML = 
            "<strong>" +
            b.name +
            "</strong>" +
            "<span>" +
            b.destination +
            "</span>"+
            "<small>" +
            b.email +
            "</small>" +
            "<small>" +
            b.date +
            "</small>";
            list.appendChild(record);
        }
    }
});
