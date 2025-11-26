// Gestion d'une liste simple avec persistence localStorage
const STORAGE_KEY = 'liste_courses_v1'

function charger(){
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

function sauver(list){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

function formatPrix(n){
  return Number(n).toFixed(2)
}

function ajouterArticle(list, article){
  // article: { id, nom, prix }
  list.push(article)
  sauver(list)
}

function supprimerArticle(list, id){
  const idx = list.findIndex(i=>i.id===id)
  if(idx>=0){
    list.splice(idx,1)
    sauver(list)
  }
}

function calculerTotal(list){
  return list.reduce((s,it)=>s + Number(it.prix),0)
}

function rendre(){
  const list = charger()
  const ul = document.getElementById('liste')
  const totalEl = document.getElementById('total')
  const empty = document.getElementById('empty')
  ul.innerHTML = ''
  if(list.length===0){ empty.style.display='block' } else { empty.style.display='none' }

  list.forEach(item=>{
    const li = document.createElement('li')
    const left = document.createElement('div'); left.className='left'
    const name = document.createElement('div'); name.textContent = item.nom
    const price = document.createElement('div'); price.className='price'; price.textContent = formatPrix(item.prix) + ' €'
    left.appendChild(name)

    const right = document.createElement('div')
    right.style.display='flex'; right.style.alignItems='center'; right.style.gap='12px'
    right.appendChild(price)
    const btn = document.createElement('button')
    btn.className='remove'
    btn.textContent = 'Supprimer'
    btn.onclick = ()=>{
      if(confirm(`Supprimer ${item.nom} (${formatPrix(item.prix)} €) ?`)){
        supprimerArticle(list, item.id)
        rendre()
      }
    }
    right.appendChild(btn)

    li.appendChild(left)
    li.appendChild(right)
    ul.appendChild(li)
  })

  totalEl.textContent = formatPrix(calculerTotal(list))
}

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('ajoutForm')
  form.addEventListener('submit', e=>{
    e.preventDefault()
    const nom = document.getElementById('nom').value.trim()
    const prix = parseFloat(document.getElementById('prix').value)
    if(!nom || isNaN(prix) ) return
    const list = charger()
    const id = Date.now()
    ajouterArticle(list, {id, nom, prix})
    form.reset()
    rendre()
  })

  // rendu initial
  rendre()
})
