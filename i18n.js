// Textes de l'interface ; les noms des articles et les avis restent dans leur langue d'origine.
const english = {
 'Aller au catalogue':'Skip to catalogue',
 'Un autre monde. Votre imagination.':'Another world. Your imagination.',
 'Retrouvez-nous sur Second Life Marketplace ↗':'Find us on Second Life Marketplace ↗',
 'Les créations':'Creations','Le studio':'The studio','Questions':'FAQ',
 'Création virtuelle / Perspective libre':'Virtual creation / Free perspective',
 'CRÉATIONS VIRTUELLES · SECOND LIFE':'VIRTUAL CREATIONS · SECOND LIFE',
 'Votre monde.':'Your world.','Une autre':'Another','dimension.':'dimension.',
 'Objets singuliers, avatars et curiosités.':'Unique objects, avatars and curiosities.',
 'Des créations signées Manege & Denzel pour donner vie à votre imagination.':'Creations by Manege & Denzel to bring your imagination to life.',
 'Explorer les créations':'Explore the creations','Visiter en monde ↗':'Visit in-world ↗',
 'IMAGINÉ. FAÇONNÉ. DÉPLIÉ.':'IMAGINED. CRAFTED. UNFOLDED.',
 'DÉCOUVRIR L’UNIVERS ↓':'EXPLORE OUR WORLD ↓','À DÉCOUVRIR':'IN THE SPOTLIGHT',
 'La sélection du studio':'Studio selection','Voir sur Marketplace ↗':'View on Marketplace ↗',
 'DÉCORATION':'DECOR','MODE':'FASHION','CURIOSITÉS VIRTUELLES':'VIRTUAL CURIOSITIES',
 'L’UNIVERS ORIGAMI':'THE ORIGAMI WORLD','Des créations.':'Creations.','Du caractère.':'With character.',
 'Une touche étrange, ludique ou inattendue.':'A strange, playful or unexpected touch.',
 'Trouvez la pièce qui fait la différence.':'Find the piece that makes a difference.',
 'Tout':'All','Décoration':'Decor','Mode':'Fashion','Fêtes':'Celebrations',
 'Une création en tête ?':'Looking for something?', 'Trier :':'Sort by:',
 'Sélection du studio':'Studio selection','Prix croissant':'Price: low to high','Prix décroissant':'Price: high to low','Nom de A à Z':'Name: A to Z',
 'Chargement du catalogue…':'Loading catalogue…',
 'Aucune création ne correspond à votre recherche. Essayez un autre mot ou une autre catégorie.':'No creations match your search. Try another word or category.',
 'Les achats se font directement sur Second Life Marketplace.':'Purchases are made directly on Second Life Marketplace.',
 'Prix indicatifs en L$ ; la fiche Marketplace fait référence.':'Indicative prices in L$; see the Marketplace listing for current details.',
 'Toute la boutique sur Marketplace ↗':'Explore the full Marketplace store ↗',
 'DERRIÈRE LES CRÉATIONS':'BEHIND THE CREATIONS','Deux créateurs.':'Two creators.','Un univers à déplier.':'A world to unfold.',
 'Origami Design, c’est l’univers de Manege et Denzel dans Second Life. Des objets de décoration aux avatars, notre boutique rassemble des créations pour composer votre propre monde.':'Origami Design is the world of Manege and Denzel in Second Life. From decor to avatars, our store brings together creations to help you build your own world.',
 'Nous rendre visite en monde ↗':'Visit us in-world ↗',
 'LES MOTS DE LA COMMUNAUTÉ':'WORDS FROM THE COMMUNITY','Vos avis donnent vie':'Your reviews bring','à nos créations.':'our creations to life.',
 'Une sélection d’avis positifs publiés sur Marketplace.':'A selection of positive reviews posted on Marketplace.',
 'Commentaires originaux, dans leur langue de publication.':'Original comments, in the language they were posted.',
 'Lire l’avis ↗':'Read the review ↗',
 'AVANT DE VOUS LANCER':'BEFORE YOU GET STARTED','Quelques repères.':'A few helpful pointers.',
 'Comment acheter une création ?':'How do I buy a creation?',
 'Cliquez sur une création pour ouvrir sa fiche sur Second Life Marketplace. Connectez-vous à votre compte Second Life pour vérifier les détails et finaliser votre achat.':'Click a creation to open its Second Life Marketplace listing. Sign in to your Second Life account to check the details and complete your purchase.',
 'Ces objets sont-ils physiques ?':'Are these physical items?',
 'Les articles sont des créations virtuelles destinées à Second Life. Aucun objet physique n’est expédié.':'These items are virtual creations for Second Life. No physical items are shipped.',
 'Où trouver les permissions et compatibilités ?':'Where can I find permissions and compatibility details?',
 'Consultez la fiche Marketplace de chaque article avant l’achat : elle précise sa description, ses permissions et les éventuelles conditions d’utilisation ou de compatibilité.':'Check each Marketplace listing before purchasing for its description, permissions and any usage or compatibility requirements.',
 'Comment contacter le studio ?':'How can I contact the studio?',
 'Retrouvez le profil vendeur de Denzel7 depuis notre boutique Marketplace pour nous contacter dans Second Life. Pour une demande concernant un achat, indiquez le nom de l’article et les informations de la transaction.':'Find Denzel7’s seller profile through our Marketplace store to contact us in Second Life. For purchase enquiries, include the item name and transaction details.',
 'VOTRE PROCHAINE TROUVAILLE VOUS ATTEND':'YOUR NEXT DISCOVERY AWAITS','Faites place à l’inattendu.':'Make room for the unexpected.',
 'Entrer dans la boutique':'Enter the store','Site indépendant, non affilié à Linden Lab.':'Independent website, not affiliated with Linden Lab.',
 'Origami Design, accueil':'Origami Design, home','Navigation principale':'Main navigation','Filtrer par catégorie':'Filter by category','Rechercher une création':'Search for a creation','Trier les produits':'Sort products','5 étoiles sur 5':'5 out of 5 stars',
 'Visuel disponible sur Marketplace ↗':'Image available on Marketplace ↗',
 'Le catalogue est momentanément indisponible. Retrouvez toutes nos créations sur Marketplace.':'The catalogue is temporarily unavailable. Find all our creations on Marketplace.'
};
const languageKey='origami-language';
const supported=['fr','en','de','es','pt','ja'];
english.Arcade='Arcade';english.Avatars='Avatars';
const translate=(text,lang)=>lang==='fr'?text:(lang==='en'?(english[text]||text):(window.origamiTranslations[lang]?.[english[text]||text]||english[text]||text));
let savedLanguage;try{savedLanguage=localStorage.getItem(languageKey);}catch{}
const browserLanguages=(navigator.languages?.length?navigator.languages:[navigator.language||'en']).map(code=>code.toLowerCase().split('-')[0]);
let language=supported.includes(savedLanguage)?savedLanguage:(browserLanguages.find(code=>supported.includes(code))||'en');
const textEntries=[];
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){
 const node=walker.currentNode;
 if(node.parentElement.closest('script,style,svg,blockquote,.review-card h3,.language-switch'))continue;
 const original=node.nodeValue, key=original.trim();
 if(Object.hasOwn(english,key))textEntries.push({node,original,key});
}
const attributes=[];
document.querySelectorAll('[aria-label],[placeholder]').forEach(node=>{
 for(const attr of ['aria-label','placeholder']){const original=node.getAttribute(attr);if(Object.hasOwn(english,original))attributes.push({node,attr,original});}
});
window.origamiI18n={get language(){return language;},t(text){return translate(text,language);},count(n){return ({fr:()=>`${n} création${n>1?'s':''} à découvrir`,en:()=>`${n} creation${n!==1?'s':''} to discover`,de:()=>`${n} Kreation${n!==1?'en':''} entdecken`,es:()=>`${n} ${n===1?'creación':'creaciones'} por descubrir`,pt:()=>`${n} criaç${n===1?'ão':'ões'} para descobrir`,ja:()=>`${n}点の作品`})[language]();}};
function setLanguage(next){
 language=next;document.documentElement.lang=next;
 for(const {node,original,key} of textEntries)node.nodeValue=original.replace(key,translate(key,next));
 for(const {node,attr,original} of attributes)node.setAttribute(attr,translate(original,next));
 document.title=({fr:'Origami Design — Créations pour Second Life',en:'Origami Design — Creations for Second Life',de:'Origami Design — Kreationen für Second Life',es:'Origami Design — Creaciones para Second Life',pt:'Origami Design — Criações para Second Life',ja:'Origami Design — Second Lifeの作品'})[next];
 document.querySelector('meta[name="description"]').content=next==='fr'?'Découvrez les créations Origami Design par Manege et Denzel : décoration, avatars et mode pour Second Life. Retrouvez chaque article sur Marketplace.':'Explore Origami Design creations by Manege and Denzel: decor, avatars and fashion for Second Life. Find each item on Marketplace.';
 document.querySelector('#language-select').value=next;
 if(next!=='fr'&&next!=='en')document.querySelector('meta[name="description"]').content=translate('Origami Design, c’est l’univers de Manege et Denzel dans Second Life. Des objets de décoration aux avatars, notre boutique rassemble des créations pour composer votre propre monde.',next);
 document.querySelectorAll('.review-signature time').forEach(node=>{node.textContent=new Intl.DateTimeFormat(next,{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(node.dateTime+'T12:00:00Z'));});
 document.dispatchEvent(new Event('origami:language'));
}
document.querySelector('#language-select').addEventListener('change',event=>{const next=event.target.value;if(!supported.includes(next))return;try{localStorage.setItem(languageKey,next);}catch{}setLanguage(next);});
setLanguage(language);
