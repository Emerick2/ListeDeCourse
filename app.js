function containsNoDigits(s) {
  return typeof s === 'string' && !/[0-9]/.test(s);
}

function AutorisationArticles(mot){
  if (!containsNoDigits(mot)){
    return false;
    alert('Le nom de l\'article ne doit pas contenir de chiffres.');
  } else if (mot.length>30) {
    return false;
    alert('Le nom de l\'article ne doit pas dépasser 30 caractères.');
  } else if (mot === ""){
    return false;
    alert('Le nom de l\'article ne doit pas être vide.');
  }
  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-item-form');
  const input = document.getElementById('item-input');
  const list = document.getElementById('shopping-list');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const itemName = input.value.trim();
    if (itemName !== "" && AutorisationArticles(itemName)) {
      addItem(itemName);
      input.value = '';
    }
  });

  function addItem(name) {
    const listItem = document.createElement('li');
    listItem.className = 'shopping-list-item';

    listItem.innerHTML = `
                    <span>${name}</span>
                    <button class="delete-btn">X</button>
                `;

    const deleteButton = listItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      list.removeChild(listItem);
    });

    list.appendChild(listItem);
  }
});




// Exemples d'utilisation (console)
console.log(containsNoDigits("Pommes")); // true
console.log(containsNoDigits("Pain2")); // false
console.log(containsNoDigits(123)); // false


