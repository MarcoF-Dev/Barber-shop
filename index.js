//COLOR MODE
const clrMode = document.getElementById("darkToggle");
const body = document.querySelector("body");
const icon = clrMode.querySelector("i");

clrMode.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    icon.classList.replace("ri-moon-fill", "ri-sun-fill");
    clrMode.innerText = " Light Mode";
    clrMode.prepend(icon);
  } else {
    icon.classList.replace("ri-sun-fill", "ri-moon-fill");
    clrMode.innerText = " Dark Mode";
    clrMode.prepend(icon);
  }
});

//DISPLAY SECTION
const prenote = document.getElementById("prenota");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const appointment = document.getElementById("appointmentSection");
const invia = document.getElementById("sendAppointment");

prenote.addEventListener("click", () => addActive());

function addActive() {
  if (
    main.classList.contains("active") &&
    footer.classList.contains("active")
  ) {
    main.classList.remove("active");

    footer.classList.remove("active");
    appointment.classList.add("active");
  } else {
    main.classList.add("active");

    footer.classList.add("active");
    appointment.classList.remove("active");
  }
}

//Commento da inserire

const commentBtn = document.getElementById("commentBtn");
const commentoUtente = document.getElementById("commentoUtente");
const sendCommentBtn = document.getElementById("sendComment");
commentBtn.addEventListener("click", () => {
  slideComment();
});

function slideComment() {
  if (!commentoUtente.classList.contains("slide")) {
    commentoUtente.classList.add("slide");
  } else {
    commentoUtente.classList.remove("slide");
  }
}

sendCommentBtn.addEventListener("click", () => {
  createMessage();
});

function createMessage() {
  const nameInput = document.getElementById("name");
  const commentInput = document.getElementById("comment");
  const commentContainer = document.getElementById("commentContainer");
  const coloreInizialeInput = document.getElementById("colorInput");

  const name = nameInput.value;
  const comment = commentInput.value;
  const coloreIniziale = coloreInizialeInput.value;

  //Crea card base se il nome e commento inseriti sono validi
  if (name !== "" && comment !== "") {
    const nameArr = name.split(" ");
    if (nameArr.length >= 2) {
      const fullString = nameArr[0] + "+" + nameArr[1];
      const coloreAvatar = coloreIniziale.substring(1);

      const newComment = document.createElement("div");
      newComment.classList.add("commentBox");
      newComment.innerHTML = `
        <div class="utente">
          <img src="https://ui-avatars.com/api/?name=${fullString}&background=${coloreAvatar}&color=fff&rounded=true" alt="${name}" class="avatar" />
          <p>${name}</p>
        </div>
        <i class="ri-chat-3-fill comment"></i>
        <p>“${comment}”</p>
        <div class="stars">
          <i class="ri-star-fill"></i>
          <i class="ri-star-fill"></i>
          <i class="ri-star-fill"></i>
          <i class="ri-star-fill"></i>
          <i class="ri-star-fill"></i>
          <span>(5.0/5.0)</span>
        </div>
      `;
      commentoUtente.classList.remove("slide");
      commentContainer.appendChild(newComment);

      nameInput.value = "";
      commentInput.value = "";
      coloreInizialeInput.value = "#00695C";
    }
  } else {
    alert("Inserisci nome e cognome.");
    return;
  }
}

// Servizio scelto

const cardBtn = document.querySelectorAll(".cardButton");

cardBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    addActive();
    const radio = document.querySelectorAll(".inputRadio")[index];
    if (radio) radio.checked = true;
  });
});

invia.addEventListener("click", () => checkAppuntamento());

function checkAppuntamento() {
  const name = document.getElementById("nomeAppuntamento");
  const surname = document.getElementById("cognomeAppuntamento");
  const day = document.getElementById("day");
  const radio = document.querySelectorAll(".inputRadio");

  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0); // azzera ore/minuti/secondi
  console.log(oggi);
  const dataSelezionata = new Date(day.value);
  if (
    name.value !== "" &&
    surname.value !== "" &&
    day.value !== "" &&
    dataSelezionata > oggi
  ) {
    const inputCompilati = true;
    const radioSelezionato = Array.from(radio).some((r) => r.checked);
    if (inputCompilati && radioSelezionato) {
      addActive();
      name.value = "";
      surname.value = "";
      day.value = "";
      radio.forEach((r) => (r.checked = false));
      alert("Prenotazione inviata!");
    } else {
      alert("Seleziona un servizio.");
    }
  } else if (dataSelezionata < oggi) {
    alert("non puoi selezionare una data passata");
  } else {
    alert("Compila tutti i campi e seleziona un servizio.");
  }
}

// Contattaci

const btnContact = document.getElementById("contact");
btnContact.addEventListener("click", () => {
  const email = "info@barbershop.it";
  const dataRichiesta = new Date();
  const giorno = dataRichiesta.getDate().toString().padStart(2, "0");
  const mese = (dataRichiesta.getMonth() + 1).toString().padStart(2, "0");
  const anno = dataRichiesta.getFullYear();
  const dataString = `${giorno}/${mese}/${anno}`;
  const subject = `Richiesta per Barber Shop - ${dataString}`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent(subject)}`;

  window.open(gmailUrl, "_blank");
});
