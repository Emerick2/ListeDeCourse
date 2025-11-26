document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-item-form');
  const input = document.getElementById('item-input');
  const list = document.getElementById('shopping-list');

  // 1. Gérer l'ajout d'un article
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche le rechargement de la page (très important !)

    const itemName = input.value.trim();

    if (itemName !== "") {
      addItem(itemName);
      input.value = ''; // Réinitialiser le champ de saisie
    }
  });

  /**
   * Crée et ajoute un élément <li> à la liste.
   * @param {string} name - Nom de l'article.
   */
  function addItem(name) {
    // Création de l'élément <li>
    const listItem = document.createElement('li');
    listItem.className = 'shopping-list-item';

    // Remplissage du contenu HTML : nom + bouton Retirer
    listItem.innerHTML = `
                    <span>${name}</span>
                    <button class="delete-btn">X</button>
                `;

    // 2. Gérer la suppression de l'article
    const deleteButton = listItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      // Supprime l'élément parent (le <li>) de la liste
      list.removeChild(listItem);
    });

    // Ajout de l'article à la liste <ul>
    list.appendChild(listItem);
  }
});