document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".budget-btn");
    const sections = document.querySelectorAll(".dest-section");
    const promptMsg = document.getElementById("prompt-msg");

    if (buttons.length > 0) {
        for (let i = 0; i < sections.length; i++) {
            sections[i].style.display = "none";
        }
        for (let j = 0; j < buttons.length; j++) {
            buttons[j].addEventListener("click",function () {
                const targetId = this.getAttribute("data-target");
                
                
                for (let k = 0; k < sections.length; k++) {
                    sections[k].style.display = "none";
                }

                for (let l = 0; l < buttons.length; l++) {
                  buttons[l].classList.remove("active-btn");
                }

                const target = document.getElementById(targetId);
                if (target) {
                    target.style.display = "block";
                }

                this.classList.add("active-btn");

                if (propmtMsg) {
                    propmtMsg.style.display = "none";
                }
            });
        }
    }



    const bookingForm = document.getElementById("bookingForm");
    const feedback = document.getElementById("feedback");

    if (bookingForm) {
        showSavedBookings();

        bookingForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const dest = document.getElementById("dest").value.trim();



            document.getElementById("name-err").textContent = "";
            document.getElementById("email-err").textContent = "";
            document.getElementById("dest-err").textContent = "";
            document.getElementById("name").classList.remove("input-err");
            document.getElementById("email").classList.remove("input-err");
            document.getElementById("dest").classList.remove("input-err");

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
