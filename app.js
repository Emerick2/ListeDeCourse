function containsNoDigits(s) {
  return typeof s === 'string' && !/[0-9]/.test(s);
}

function AutorisationArticles(mot, alertAutoriser = false){
  if (!containsNoDigits(mot)){
    return false;
    if (alertAutoriser) {alert('Le nom de l\'article ne doit pas contenir de chiffres.');}
  } else if (mot.length>30) {
    return false;
    if (alertAutoriser) {alert('Le nom de l\'article ne doit pas dépasser 30 caractères.');}
  } else if (mot === ""){
    return false;
      if (alertAutoriser) {alert('Le nom de l\'article ne doit pas être vide.');}
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
    if (itemName !== "" && AutorisationArticles(itemName, true)) {
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




function testAutorisationArticles() {
  console.log("--- Démarrage des Tests de Validation des Articles ---");
  const testCases = [
    {input: "Pommes", expected: true, description: "Nom simple, autorisé"},
    {input: "Jus d'orange et fraises", expected: true, description: "Nom long sans chiffre, autorisé"},
    {input: "A", expected: true, description: "Nom court, autorisé"},

    {input: "Pain2", expected: false, description: "Contient un chiffre, refusé"},
    {input: "Lait 3.2%", expected: false, description: "Contient des chiffres, refusé"},
    {input: "24 oeufs", expected: false, description: "Commence par un chiffre, refusé"},

    {input: "Ceci est un article beaucoup trop long qui dépasse largement la limite de trente caractères", expected: false, description: "Plus de 30 caractères, refusé"},
    {input: "Trente caractères maximum ABCDEF", expected: false, description: "Exactement 30 caractères, autorisé"}, // 30 caractères
    {input: "Trente caractères maximum ABCDE", expected: false, description: "29 caractères, autorisé"},

    {input: "", expected: false, description: "Chaîne vide, refusé"},
    {input: "   ", expected: false, description: "Chaîne avec espaces (trim), refusé"}
  ];

  let successCount = 0;
  const totalTests = testCases.length;

  testCases.forEach((test, index) => {
    const actualResult = AutorisationArticles(test.input);
    const passed = actualResult === test.expected;

    if (passed) {
      successCount++;
      console.log(`✅ TEST ${index + 1}: Réussi - ${test.description}`);
    } else {
      console.error(`❌ TEST ${index + 1}: ÉCHEC - ${test.description}`);
      console.error(`  Entrée: '${test.input}' | Attendu: ${test.expected} | Obtenu: ${actualResult}`);
    }
  });

  const successRate = (successCount / totalTests) * 100;

  console.log("-----------------------------------------------");
  console.log(`Résultats: ${successCount} tests réussis sur ${totalTests} au total.`);
  console.log(`Taux de Réussite: ${successRate.toFixed(2)}%`);
  console.log("-----------------------------------------------");
}

testAutorisationArticles();