const fs = require('node:fs');
const html = fs.readFileSync('marketplace-source.html', 'utf8');
const decode = s => s.replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,'&');
const items = [...html.matchAll(/<div class="column gallery-item[\s\S]*?(?=<div class="column gallery-item|<div class="pagination|$)/g)].map(m => {
 const block=m[0];
 const link=block.match(/class="product-image" href="([^"]+)"/);
 const image=block.match(/ src="(https:\/\/slm-assets[^\"]+)"/);
 const name=block.match(/'name': '([^\n]*)',/);
 const price=block.match(/'price': '(\d+)'/);
 if(!link||!image||!name||!price) return null;
 const title=decode(name[1]);
 const category=/Avatar|Minotaur/i.test(title)?'Avatars':/Outfit|Dress|Necklace|harness/i.test(title)?'Mode':/Santa|Gateau|Rez Day/i.test(title)?'Fêtes':'Décoration';
 return {name:title,price:Number(price[1]),category,url:'https://marketplace.secondlife.com'+decode(link[1]),image:decode(image[1])};
}).filter(Boolean);
fs.writeFileSync('products.json',JSON.stringify(items,null,2)+'\n');
console.log(`${items.length} articles importés`);
