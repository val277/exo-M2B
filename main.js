// Liste d'offres d'emploi fictives
//Creer une liste d'objets fictifs à filtrer
const offresEmploi = [
  {
    id: 1,
    titre: "Développeur Front-End",
    domaine: "Informatique",
    experience: "2-5 ans",
    niveauEtude: "Bac+3",
    secteur: "Privé",
  },
  {
    id: 2,
    titre: "Analyste Data Junior",
    domaine: "Informatique",
    experience: "0-2 ans",
    niveauEtude: "Bac+5",
    secteur: "Privé",
  },
  {
    id: 3,
    titre: "Responsable RH",
    domaine: "Ressources Humaines",
    experience: "5+ ans",
    niveauEtude: "Bac+5",
    secteur: "Public",
  },
  {
    id: 4,
    titre: "Comptable Confirmé",
    domaine: "Comptabilité",
    experience: "5+ ans",
    niveauEtude: "Bac+3",
    secteur: "Privé",
  },
  {
    id: 5,
    titre: "Chargé de Marketing Digital",
    domaine: "Marketing",
    experience: "2-5 ans",
    niveauEtude: "Bac+3",
    secteur: "Associatif",
  },
  {
    id: 6,
    titre: "Technicien Support Informatique",
    domaine: "Informatique",
    experience: "0-2 ans",
    niveauEtude: "Bac+2",
    secteur: "Public",
  },
];

// Fonction pour filtrer les offres selon le formulaire
function filtrerOffres() {
  // Récuperer les informations de l'utilisateur du formulaire
  const domaine = document.getElementById("domaine").value;
  const experience = document.querySelector(
    'input[name="experience"]:checked'
  ).value;
  const niveauEtude = document.getElementById("niveauEtude").value;
  const secteur = document.getElementById("secteur").value;

  if (
    domaine !== "" ||
    experience !== "" ||
    niveauEtude !== "" ||
    secteur !== ""
  ) {
    isFiltered = true;
  } else {
    isFiltered = false;
  }

  // Retourne une liste en filtrant que les objets qui correspondent aux paramètres utilisateurs
  return offresEmploi.filter(
    (offre) =>
      // compare chaque offre selon les infos du formulaire
      (!domaine || offre.domaine === domaine) &&
      (!experience || offre.experience === experience) &&
      (!niveauEtude || offre.niveauEtude === niveauEtude) &&
      (!secteur || offre.secteur === secteur)
  );
}

// Fonction pour afficher les résultats en passant la liste filtrée comme paramètres
function afficherResultats(offres) {
  // Récupère la liste du html
  const ul = document.getElementById("jobResults");
  // Il la vide
  ul.innerHTML = "";
  // Si la liste filtrée est vide affiche une liste vide sur la page html
  if (offres.length === 0) {
    ul.innerHTML = "<li>Aucune offre trouvée.</li>";
    return;
  }
  // Sinon il continue dans la fonction et pour chaque offres de la liste filtrée il crée un élement dans le html avec les paramètres
  offres.forEach((offre) => {
    // Creer l'element html
    const li = document.createElement("li");
    // Ajoute la classe job-item on sait pas trop pour quoi
    li.className = "job-item";
    // Rempli le li
    li.textContent = `${offre.titre} - ${offre.domaine}, ${offre.experience}, ${offre.niveauEtude}, ${offre.secteur}`;
    if (localStorage.getItem(offre.id)) {
      li.classList.add("favorite");
      const delBtn = document.createElement("button");
      delBtn.textContent = "Supprimer";
      delBtn.addEventListener("click", () => {
        localStorage.removeItem(offre.id);
        if (isFiltered) {
          afficherResultats(filtrerOffres());
        } else {
          afficherResultats(offresEmploi);
        }
      });
      li.appendChild(delBtn);
    } else {
      const addBtn = document.createElement("button");
      addBtn.textContent = "Ajouter";
      addBtn.addEventListener("click", () => {
        localStorage.setItem(offre.id, true);
        if (isFiltered) {
          afficherResultats(filtrerOffres());
        } else {
          afficherResultats(offresEmploi);
        }
      });
      li.appendChild(addBtn);
    }
    // Rajoute le li en enfant de l'ul
    ul.appendChild(li);
  });
}

let isFiltered = false;

// Rajoute l'event de click sur le bouton rechercher pour filtrer les offres et les afficher
document.getElementById("btnSearch").addEventListener("click", () => {
  // Prépare les paramètres pour la fonction afficherRésultats
  const resultats = filtrerOffres();
  afficherResultats(resultats);
});

// Affiche toutes les offres au chargement
afficherResultats(offresEmploi);
