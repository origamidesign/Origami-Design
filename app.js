const grid=document.querySelector('#products');
let products=[], category='Tout';
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const money=n=>`L$ ${n.toLocaleString('fr-FR')}`;
function render(){
 const query=normalize(document.querySelector('#search').value.trim());
 const sort=document.querySelector('#sort').value;
 const items=products.filter(p=>(category==='Tout'||p.category===category)&&normalize(p.name).includes(query));
 if(sort==='asc')items.sort((a,b)=>a.price-b.price);
 if(sort==='desc')items.sort((a,b)=>b.price-a.price);
 if(sort==='name')items.sort((a,b)=>a.name.localeCompare(b.name,'fr'));
 grid.replaceChildren(...items.map(p=>{
  const card=document.createElement('a');card.className='product';card.href=p.url;card.target='_blank';card.rel='noopener noreferrer';
  const picture=document.createElement('div');picture.className='product-picture';
  const img=document.createElement('img');img.src=p.image;img.alt=p.name;img.loading='lazy';img.width=500;img.height=500;
  img.addEventListener('error',()=>{img.hidden=true;picture.classList.add('unavailable');picture.textContent='Visuel disponible sur Marketplace ↗';});
  const arrow=document.createElement('span');arrow.className='product-arrow';arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');picture.append(img,arrow);
  const meta=document.createElement('div');meta.className='product-meta';const cat=document.createElement('span');cat.textContent=p.category;const price=document.createElement('span');price.textContent=money(p.price);meta.append(cat,price);
  const title=document.createElement('h3');title.textContent=p.name.replace(/\s*~Origami Design~\s*/gi,'').replace(/^Box /,'');
  const action=document.createElement('span');action.className='product-action';action.textContent='Voir sur Marketplace ↗';card.append(picture,meta,title,action);return card;
 }));
 document.querySelector('#result-count').textContent=`${items.length} création${items.length>1?'s':''} à découvrir`;
 document.querySelector('#empty').hidden=items.length!==0;
}
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.category;document.querySelector('#search').value='';document.querySelectorAll('[data-category]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});render();}));
document.querySelector('#search').addEventListener('input',render);
document.querySelector('#sort').addEventListener('change',render);
document.querySelectorAll('[data-universe]').forEach(link=>link.addEventListener('click',()=>document.querySelector(`[data-category="${link.dataset.universe}"]`).click()));
document.querySelector('#year').textContent=new Date().getFullYear();
fetch('products.json?v=catalogue-129-3', {cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('catalogue');return r.json();}).then(data=>{products=data;const hero=products.find(p=>/Hands Planter Shelf/i.test(p.name))||products[0];if(hero){document.querySelector('#hero-image').src=hero.image;document.querySelector('#hero-image').alt=hero.name;document.querySelector('#hero-name').textContent=hero.name.replace(/~Origami Design~/gi,'');document.querySelector('#hero-product').href=hero.url;}render();}).catch(()=>{document.querySelector('#result-count').textContent='Le catalogue est momentanément indisponible. Retrouvez toutes nos créations sur Marketplace.';});
