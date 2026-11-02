const grid=document.querySelector('#products');
let products=[], category='Tout';
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const t=text=>window.origamiI18n.t(text);
const locale=()=>window.origamiI18n.language;
const money=n=>`L$ ${n.toLocaleString(locale())}`;
const dialog=document.querySelector('#product-dialog');
let selectedProduct=null;
const detailsLabels={fr:{close:'Fermer',view:'Voir la fiche'},en:{close:'Close',view:'View details'},de:{close:'Schließen',view:'Details ansehen'},es:{close:'Cerrar',view:'Ver detalles'},pt:{close:'Fechar',view:'Ver detalhes'},ja:{close:'閉じる',view:'詳細を見る'}};
function updateDetails(){
 document.querySelector('#detail-close').setAttribute('aria-label',detailsLabels[locale()].close);
 if(!selectedProduct)return;
 document.querySelector('#detail-title').textContent=selectedProduct.name.replace(/\s*~Origami Design~\s*/gi,'').replace(/^Box /,'');
 document.querySelector('#detail-category').textContent=t(selectedProduct.category);
 document.querySelector('#detail-price').textContent=money(selectedProduct.price);
 document.querySelector('#detail-image-fallback').textContent=t('Visuel disponible sur Marketplace ↗');
}
function openDetails(product){
 selectedProduct=product;
 const image=document.querySelector('#detail-image');
 image.hidden=false;document.querySelector('#detail-image-fallback').hidden=true;
 image.alt=product.name;image.src=product.image;
 document.querySelector('#detail-marketplace').href=product.url;
 updateDetails();dialog.showModal();document.body.classList.add('dialog-open');
}
document.querySelector('#detail-image').addEventListener('error',()=>{document.querySelector('#detail-image').hidden=true;document.querySelector('#detail-image-fallback').hidden=false;});
document.querySelector('#detail-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');selectedProduct=null;});
function render(){
 const query=normalize(document.querySelector('#search').value.trim());
 const sort=document.querySelector('#sort').value;
 const items=products.filter(p=>(category==='Tout'||p.category===category)&&normalize(p.name).includes(query));
 if(sort==='asc')items.sort((a,b)=>a.price-b.price);
 if(sort==='desc')items.sort((a,b)=>b.price-a.price);
 if(sort==='name')items.sort((a,b)=>a.name.localeCompare(b.name,locale()));
 grid.replaceChildren(...items.map(p=>{
  const card=document.createElement('button');card.type='button';card.className='product';card.setAttribute('aria-haspopup','dialog');card.setAttribute('aria-controls','product-dialog');card.addEventListener('click',()=>openDetails(p));
  const picture=document.createElement('div');picture.className='product-picture';
  const img=document.createElement('img');img.src=p.image;img.alt=p.name;img.loading='lazy';img.width=500;img.height=500;
  img.addEventListener('error',()=>{img.hidden=true;picture.classList.add('unavailable');picture.textContent=t('Visuel disponible sur Marketplace ↗');});
  const arrow=document.createElement('span');arrow.className='product-arrow';arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');picture.append(img,arrow);
  const meta=document.createElement('div');meta.className='product-meta';const cat=document.createElement('span');cat.textContent=t(p.category);const price=document.createElement('span');price.textContent=money(p.price);meta.append(cat,price);
  const title=document.createElement('h3');title.textContent=p.name.replace(/\s*~Origami Design~\s*/gi,'').replace(/^Box /,'');
  const action=document.createElement('span');action.className='product-action';action.textContent=detailsLabels[locale()].view+' +';card.append(picture,meta,title,action);return card;
 }));
 document.querySelector('#result-count').textContent=window.origamiI18n.count(items.length);
 document.querySelector('#empty').hidden=items.length!==0;
}
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.category;document.querySelector('#search').value='';document.querySelectorAll('[data-category]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});render();}));
document.querySelector('#search').addEventListener('input',render);
document.querySelector('#sort').addEventListener('change',render);
document.addEventListener('origami:language',()=>{render();updateDetails();});
document.querySelector('#year').textContent=new Date().getFullYear();
fetch('products.json?v=wall-stars-250', {cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('catalogue');return r.json();}).then(data=>{products=data;const hero=products.reduce((latest,p)=>!latest||Number(p.url.split('/').pop())>Number(latest.url.split('/').pop())?p:latest,null);if(hero){document.querySelector('#hero-image').src=hero.image;document.querySelector('#hero-image').alt=hero.name;document.querySelector('#hero-name').textContent=hero.name.replace(/~Origami Design~/gi,'');document.querySelector('#hero-product').href=hero.url;}render();}).catch(()=>{document.querySelector('#result-count').textContent=t('Le catalogue est momentanément indisponible. Retrouvez toutes nos créations sur Marketplace.');});
