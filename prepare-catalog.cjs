const fs = require('node:fs');
const sources = process.argv.slice(2);
if (!sources.length) sources.push('marketplace-source.html');
const decode = s => s.replace(/&#(?:39|x27);/gi,"'").replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)));
const existing = fs.existsSync('products.json') ? JSON.parse(fs.readFileSync('products.json','utf8')) : [];
const catalog = new Map(existing.map(p=>[p.url,p]));
for (const source of sources) {
const html = fs.readFileSync(source, 'utf8');
const items = [...html.matchAll(/<div class="column gallery-item[\s\S]*?(?=<div class="column gallery-item|<div class="pagination|$)/g)].map(m => {
 const block=m[0];
 const link=block.match(/class="product-image" href="([^"]+)"/);
 const image=block.match(/https:\/\/slm-assets\.secondlife\.com\/assets\/(?:\\.|[^\s"'<>\\])+/);
 const name=block.match(/'name': '([^\n]*)',/);
 const price=block.match(/'price': '(\d+)'/);
 if(!link||!image||!name||!price) return null;
 const title=decode(name[1]);
 const category=/Arcade/i.test(title)?'Arcade':/Avatar|Minotaur/i.test(title)?'Avatars':/Outfit|Dress|Necklace|harness/i.test(title)?'Mode':/Santa|Gateau|Rez Day/i.test(title)?'Fêtes':'Décoration';
 return {name:title,price:Number(price[1]),category,url:new URL(decode(link[1]),'https://marketplace.secondlife.com').href,image:decode(image[0]).replace(/\\'/g,'%27').replace(/'/g,'%27').replace('/view_small/','/view_large/')};
}).filter(Boolean);
if(!items.length) throw new Error('Aucun produit reconnu dans '+source);
for(const item of items) catalog.set(item.url,item);
console.log(`${items.length} articles lus dans ${require('node:path').basename(source)}`);
}
// Articles retirés de la vitrine à la demande du propriétaire.
const excludedIds = new Set(['16486911','16486836']);
for (const [url] of catalog) if (excludedIds.has(new URL(url).pathname.split('/').pop())) catalog.delete(url);
fs.writeFileSync('products.json',JSON.stringify([...catalog.values()],null,2)+'\n');
console.log(`${catalog.size} articles uniques au total`);
