const library =
  "crayon, rouge, feutre, poulpe, col, mine, gomme, dessin, rose, rayure, cheval, pinceau, couleur, cuit, papier, dégât, cahier, carnet, carton, ciseaux, court, atterrir, pli, coller, affaire, boîte, dé, caisse, crabe, cartable, jouet, jeu, pion, casier, domino, puzzle, image, giraffe, chose, rond, client, hiboux, livre, histoire, bibliothèque, cube, album, titre, requin, conte, chat, magazine, vert, page, ligne, mot, enveloppe, étiquette, alphabet, appareil, orange, jaune, cédé, chat, chaîne, violet, chiffre, singe, différence, doigt, écran, écriture".split(
    ", "
  );

const reset = document.querySelector("#reset");
const app = document.querySelector("#app");
const enigma = document.querySelector("#enigma");
const checkboxes = [...document.querySelectorAll("input[type='checkbox']")];
const labels = document.querySelectorAll("label");

const pass = ["1", "9", "2", "8", "11", "3"];
let current = [];

const selectBoxRange = (offset) => {
  const min = (offset - 1) * 12;
  const max = offset * 12;
  return [min, max];
};

const updateLabels = (nbChecked) => {
  library.slice(...selectBoxRange(nbChecked)).forEach((mot, i) => {
    labels[i].textContent = `${i + 1} - ${mot}`;
  });
};

const isWin = () => {
  if (pass.join("") === current.join("")) {
    return true;
  }
  return false;
};

const resetCheckboxes = () => {
  updateLabels(1);
  checkboxes.forEach((checkbox) => {
    checkbox.disabled = false;
    checkbox.checked = false;
    current = [];
  });
};

updateLabels(1);
reset.onclick = () => {
  resetCheckboxes();
};

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    let nbChecked = checkboxes.filter((elt) => elt.checked).length;
    updateLabels(nbChecked + 1);
    e.target.disabled = true;
    if (e.target.id) {
      current.push(e.target.id);
    }
    console.log(nbChecked);

    if (isWin()) {
      const answer = document.createElement("div");
      answer.textContent = "2";
      answer.style = "font-size: 80vh";
      app.append(answer);
      enigma.remove();
      reset.remove();
      return;
    }

    if (nbChecked === 6) {
      resetCheckboxes();
    }
  });
});
