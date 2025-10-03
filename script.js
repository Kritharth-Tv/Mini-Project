// Book Ticket
function bookTicket(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let age = parseInt(document.getElementById("age").value);
  let gender = document.getElementById("gender").value;
  let train = document.getElementById("train").value;
  let classType = document.getElementById("classType").value;
  let date = document.getElementById("date").value;
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;

  // Prevent same From & To
  if (from === to) {
    alert("❌ Departure and Destination cannot be the same!");
    return;
  }

  // Fare calculation
  let fare;
  if (classType === "General Coach") fare = 80;
  else if (classType === "Sleeper Coach") fare = 200;
  else fare = 500;

  if (age < 12) fare *= 0.5;   // 50% for children
  if (age > 60) fare *= 0.7;   // 30% discount for seniors

  // Generate random PNR
  let pnr = "PNR" + Math.floor(Math.random() * 100000);

  let ticket = { pnr, name, age, gender, train, classType, date, from, to, fare };

  // Save in Local Storage
  let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  tickets.push(ticket);
  localStorage.setItem("tickets", JSON.stringify(tickets));

  alert("✅ Ticket Booked! PNR: " + pnr);
  event.target.reset();
}

// Show Tickets
function showTickets() {
  let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  let listDiv = document.getElementById("ticketsList");

  if (tickets.length === 0) {
    listDiv.innerHTML = "<p>No tickets booked yet.</p>";
    return;
  }

  let html = `<table>
    <caption><marquee style="color:green;"> ENJOY YOUR JOURNEY WITH INDIAN RAILWAYS! </marquee></caption>
    <tr>
      <th>PNR</th>
      <th>Name</th>
      <th>Age</th>
      <th>Gender</th>
      <th>Train</th>
      <th>Class</th>
      <th>From → To</th>
      <th>Date</th>
      <th>Fare</th>
      <th>Action</th>
    </tr>`;

  tickets.forEach((t, index) => {
    html += `<tr>
      <td>${t.pnr}</td>
      <td>${t.name}</td>
      <td>${t.age}</td>
      <td>${t.gender}</td>
      <td>${t.train}</td>
      <td>${t.classType}</td>
      <td>${t.from} → ${t.to}</td>
      <td>${t.date}</td>
      <td>₹${t.fare}</td>
      <td><button class="cancel-btn" onclick="cancelTicket(${index})">Cancel</button></td>
    </tr>`;
  });

  html += `</table>
           <div class="actions">
             <button class="clear-btn" onclick='clearAllTickets()'>Clear All</button>
           </div>`;
  listDiv.innerHTML = html;
}

// Cancel a single ticket
function cancelTicket(index) {
  let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  if (confirm("Cancel this ticket?")) {
    tickets.splice(index, 1);
    localStorage.setItem("tickets", JSON.stringify(tickets));
    showTickets(); // refresh table
  }
}

// Clear all tickets
function clearAllTickets() {
  if (confirm("⚠️ Are you sure you want to clear ALL tickets?")) {
    localStorage.removeItem("tickets");
    showTickets(); // refresh table
  }
}
