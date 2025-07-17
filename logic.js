à la création de la liste:
checker le local storage:
  si l'annonce existe avec son id:
    ajouter class favorite
    on ajoute un bouton supprimer dans le li qui:
      supprime la classe favorite
      supprime l'id dans le local storage
      vérifie si la page est filtree:
        afficherResultats(filtrerResultat)
      sinon afficherResultats(offresEmplois)

  si l'annonce existe pas:
    on ajoute un bouton ajouter qui va:
      ajouter la classe favorite
      ajouter l'id dans le localstorage
      vérifie si la page est filtree:
        afficherResultats(filtrerResultat)
      sinon afficherResultats(offresEmplois)

on aura au prealable initialiser une varuable isFiltered qui va etre false de base
et va etre true si on filtre les offres

