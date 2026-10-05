'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Backpack, BookOpen, Briefcase, CheckCircle2, Clock, FileBadge, Folder,
  GraduationCap, Heart, IdCard, Image as Photo, MapPin, Medal, MessageCircle,
  Minus, Package, PenTool, PhoneCall, Plus, Printer, Search, Shirt, ShoppingBag,
  Trash2, Trophy, X,
} from 'lucide-react';
import { categories, products, type Product } from '../lib/catalog';
import { galleryGroups, galleryTabs, type GalleryTab } from '../lib/gallery';

const WHATSAPP_NUMBER = '919981990811';
const icons: Record<string, typeof IdCard> = {
  id: IdCard, trophy: Trophy, medal: Medal, book: BookOpen, pen: PenTool,
  office: Briefcase, folder: Folder, print: Printer, photo: Photo,
  bag: Backpack, shirt: Shirt, certificate: FileBadge,
};

type Line = { id: string; qty: number };
type GalleryItem = { id: string; reference: string; title: string; image: string };

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Store() {
  const [category, setCategory] = useState('All services');
  const [sub, setSub] = useState('All');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<Line[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [panel, setPanel] = useState<'cart' | 'wishlist' | 'contact' | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [galleryTab, setGalleryTab] = useState<GalleryTab>('stationery');

  useEffect(() => {
    fetch('/api/shop')
      .then(async (response) => {
        const data: any = await response.json();
        if (!response.ok) throw new Error(data.error);
        setCart(data.cart);
        setWishlist(data.wishlist);
        setLoaded(true);
      })
      .catch((error) => setNotice(error.message));
  }, []);

  useEffect(() => {
    if (!panel && !product) return;
    const previous = document.activeElement as HTMLElement;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setPanel(null); setProduct(null); }
      if (event.key !== 'Tab') return;
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('.drawer button:not(:disabled), .drawer a, .drawer input:not(:disabled)')).filter((node) => node.offsetParent !== null);
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', handler);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = oldOverflow;
      previous?.focus();
    };
  }, [panel, product]);

  async function save(nextCart: Line[], nextWishlist: string[]) {
    if (!loaded) { setNotice('Saved items are unavailable. Please reload and try again.'); return; }
    setBusy(true);
    try {
      const response = await fetch('/api/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'state', cart: nextCart, wishlist: nextWishlist }),
      });
      const data: any = await response.json();
      if (!response.ok) throw new Error(data.error);
      setCart(nextCart);
      setWishlist(nextWishlist);
    } catch (error) {
      setNotice((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function add(productToAdd: Product) {
    const existing = cart.find((line) => line.id === productToAdd.id);
    const next = existing
      ? cart.map((line) => line.id === productToAdd.id ? { ...line, qty: Math.min(999, line.qty + 1) } : line)
      : [...cart, { id: productToAdd.id, qty: 1 }];
    save(next, wishlist);
    setNotice(`${productToAdd.name} added to your enquiry bag.`);
  }

  function toggleWishlist(id: string) {
    save(cart, wishlist.includes(id) ? wishlist.filter((item) => item !== id) : [...wishlist, id]);
  }

  const subcategories = ['All', ...new Set(products.filter((item) => category === 'All services' || item.category === category).map((item) => item.sub))];
  const list = products.filter((item) =>
    (category === 'All services' || item.category === category) &&
    (sub === 'All' || item.sub === sub) &&
    `${item.name} ${item.category} ${item.sub}`.toLowerCase().includes(query.toLowerCase())
  );
  const itemCount = cart.reduce((total, line) => total + line.qty, 0);
  const trophyTab = galleryTab === 'stationery' ? 'eco' : galleryTab;
  const trophyItems = galleryGroups[trophyTab];
  const trophyProductCount = galleryGroups.eco.length + galleryGroups.fiber.length + galleryGroups.wooden.length;
  const displayCount = category === 'Stationery items' ? galleryGroups.stationery.length : category === 'Trophies & medals' ? trophyProductCount : list.length;
  const bagMessage = useMemo(() => {
    const lines = cart.map((line, index) => {
      const item = products.find((entry) => entry.id === line.id);
      return `${index + 1}. ${item?.name ?? 'Item'} — Qty: ${line.qty}`;
    });
    return `Hello Shree School Mart, I want to enquire about these items:\n\n${lines.join('\n')}\n\nPlease share availability and prices.`;
  }, [cart]);

  function selectCategory(nextCategory: string) {
    setCategory(nextCategory);
    setSub('All');
    if (nextCategory === 'Stationery items') setGalleryTab('stationery');
    if (nextCategory === 'Trophies & medals') setGalleryTab('eco');
    document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
  }

  function ItemIcon({ item }: { item: Product }) {
    const Icon = icons[item.icon] || Package;
    return <div className={`item-art ${item.color}`}><Icon size={64} strokeWidth={1.3} /><span>{item.sub}</span></div>;
  }

  function ProductCard({ item }: { item: Product }) {
    const directMessage = `Hello Shree School Mart, I want to enquire about ${item.name}. Please share available options and price.`;
    return <article className="card">
      <div className="art-wrap">
        <button className="art-button" onClick={() => setProduct(item)} aria-label={`View ${item.name}`}><ItemIcon item={item} /></button>
        <button className={`wish ${wishlist.includes(item.id) ? 'selected' : ''}`} disabled={busy || !loaded} aria-label={`${wishlist.includes(item.id) ? 'Remove' : 'Add'} ${item.name} ${wishlist.includes(item.id) ? 'from' : 'to'} wishlist`} onClick={() => toggleWishlist(item.id)}><Heart size={19} /></button>
        {item.custom && <span className="custom-tag">Custom order</span>}
      </div>
      <div className="card-body">
        <small>{item.category}</small>
        <button className="product-title" onClick={() => setProduct(item)}>{item.name}</button>
        <div className="price-row">
          <strong>Contact for price</strong>
          <button className="add" onClick={() => add(item)} disabled={busy || !loaded} aria-label={`Add ${item.name} to enquiry bag`}><Plus size={20} /></button>
        </div>
        <a className="whatsapp-mini" href={whatsappUrl(directMessage)} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Order now</a>
      </div>
    </article>;
  }

  function ActualProductGrid({ items }: { items: GalleryItem[] }) {
    return <div className="actual-product-grid">
      {items.map((item) => <article className="actual-product" key={item.id}>
        <a className="gallery-photo" href={item.image} target="_blank" rel="noreferrer" aria-label={`Open ${item.title}`}><img src={item.image} loading="lazy" alt={`${item.title}, reference ${item.reference}`} /></a>
        <div className="actual-product-body"><span>{item.reference}</span><h3>{item.title}</h3><a href={whatsappUrl(`Hello Shree School Mart, I want to enquire about product reference ${item.reference} (${item.title}). Please share its availability and price.`)} target="_blank" rel="noreferrer"><MessageCircle size={15} /> Enquire on WhatsApp</a></div>
      </article>)}
    </div>;
  }

  return <>
    <div className="preview-bar">Online ordering and payment are coming soon · Enquire and order through WhatsApp</div>
    <header>
      <div className="header-inner">
        <a className="brand" href="/" aria-label="Shree School Mart home"><img src="/shree-school-mart-logo.jpeg" alt="Shree School Mart" /></a>
        <label className="search"><Search size={20} /><input placeholder="Search ID cards, trophies, printing…" aria-label="Search services" value={query} onChange={(event) => { setQuery(event.target.value); document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' }); }} /></label>
        <div className="header-actions">
          <button onClick={() => setPanel('wishlist')} aria-label="Open wishlist"><Heart /><span className="desktop-label">Wishlist</span>{wishlist.length > 0 && <b>{wishlist.length}</b>}</button>
          <button onClick={() => setPanel('cart')} aria-label="Open enquiry bag"><ShoppingBag /><span className="desktop-label">Enquiry bag</span><b>{itemCount}</b></button>
        </div>
      </div>
      <nav className="category-nav" aria-label="Services">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => selectCategory(item)}>{item}</button>)}</nav>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">UDAIPURA&apos;S SCHOOL, OFFICE & PRINTING STORE</span>
          <h1>Everyday essentials.<br /><em>Made personal.</em></h1>
          <p>Trophies, ID cards, stationery, school bags, office items, photo services and custom printing—all at Shree School Mart.</p>
          <div className="hero-buttons">
            <a className="primary yellow" href={whatsappUrl('Hello Shree School Mart, I want to know about your products and services.')} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Order on WhatsApp</a>
            <button className="hero-link" onClick={() => selectCategory('Stationery items')}>View actual product photos</button>
          </div>
          <div className="hero-tags"><span><BookOpen size={17} />School & stationery</span><span><Printer size={17} />Custom printing</span><span><Trophy size={17} />Awards & medals</span></div>
        </div>
        <div className="hero-image"><img src="/store-collection.png" alt="A trophy, medal, stationery, ID card and photo frame on a blue backdrop" /><span className="image-label">Your everyday essentials, together.</span></div>
      </section>

      <section className="benefits">
        <span><MapPin />Narmada Colony, Udaipura</span>
        <span><Clock />Open 8:30 AM–10:00 PM</span>
        <span><PhoneCall />Call: 99819 90811</span>
        <button onClick={() => setPanel('contact')}><MessageCircle />Contact the shop</button>
      </section>

      <section className="catalogue" id="catalogue">
        <div className="section-heading"><div><span className="eyebrow navy">PRODUCTS & SERVICES</span><h2>{category === 'All services' ? 'Everything you need, in one place.' : category}</h2></div><span>{displayCount} {category === 'Stationery items' || category === 'Trophies & medals' ? 'product images' : 'services'}</span></div>
        <div className="catalogue-layout">
          <aside className="filters">
            <h3>Browse services</h3>
            {categories.map((item, index) => <button className={category === item ? 'active' : ''} onClick={() => selectCategory(item)} key={item}><span>{item}</span><span>{index === 0 ? products.length : item === 'Stationery items' ? galleryGroups.stationery.length : item === 'Trophies & medals' ? trophyProductCount : products.filter((productItem) => productItem.category === item).length}</span></button>)}
            <div className="help-card"><MessageCircle size={26} /><h3>Need help choosing?</h3><p>Message us for current options, availability and prices.</p><a href={whatsappUrl('Hello Shree School Mart, I need help choosing a product or service.')} target="_blank" rel="noreferrer">Chat on WhatsApp</a></div>
          </aside>
          <div>
            {category !== 'Stationery items' && category !== 'Trophies & medals' && <>
              <div className="toolbar"><div className="subcategories">{subcategories.map((item) => <button className={sub === item ? 'active' : ''} onClick={() => setSub(item)} key={item}>{item}</button>)}</div></div>
              <div className="product-grid">{list.map((item) => <ProductCard item={item} key={item.id} />)}</div>
              {!list.length && <div className="empty"><Search /><h3>No matching service found</h3><p>Try a different search or browse all services.</p><button className="primary" onClick={() => { setQuery(''); setSub('All'); setCategory('All services'); }}>Show all services</button></div>}
            </>}
            {category === 'Stationery items' && <>
              <p className="gallery-intro">All stationery product photos supplied by Shree School Mart. Use the reference number while ordering.</p>
              <div className="product-video-card"><video controls preload="metadata" playsInline><source src="/products/stationery/product-video.mp4" type="video/mp4" />Your browser does not support this product video.</video><div><strong>Stationery product video</strong><span>Original video supplied by the shop</span></div></div>
              <ActualProductGrid items={galleryGroups.stationery} />
            </>}
            {category === 'Trophies & medals' && <>
              <p className="gallery-intro">Browse individual trophies and mementos cropped from the supplied catalogues. The original product code, size and MRP details remain visible in every image.</p>
              <div className="gallery-tabs" role="tablist" aria-label="Trophy catalogue categories">{galleryTabs.filter((tab) => tab.id !== 'stationery').map((tab) => <button key={tab.id} role="tab" aria-selected={trophyTab === tab.id} className={trophyTab === tab.id ? 'active' : ''} onClick={() => setGalleryTab(tab.id)}>{tab.label}<span>{tab.count}</span></button>)}</div>
              <ActualProductGrid items={trophyItems} />
            </>}
            <p className="catalogue-note">Prices are not listed yet. Please contact the shop on WhatsApp for current pricing and availability.</p>
          </div>
        </div>
      </section>

      <section className="custom-banner">
        <div><span className="eyebrow navy">CUSTOM PRINTING</span><h2>Share your idea. We&apos;ll help print it.</h2><p>ID cards, PVC cards, T-shirts, certificates, colour printouts and glossy photos.<br />Send your files and requirements directly on WhatsApp.</p></div>
        <a className="primary" href={whatsappUrl('Hello Shree School Mart, I want to enquire about a custom printing order.')} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Start an enquiry</a>
      </section>
    </main>

    <footer>
      <div className="footer-main">
        <div><a className="brand footer-brand" href="/"><img src="/shree-school-mart-logo.jpeg" alt="Shree School Mart" /></a><p>Study · Stationery · Supplies</p></div>
        <div><h3>Popular services</h3><button onClick={() => selectCategory('Stationery items')}>Stationery items</button><button onClick={() => selectCategory('Trophies & medals')}>Trophies & medals</button><button onClick={() => selectCategory('School bags')}>School bags</button><button onClick={() => selectCategory('Office items')}>Office items</button></div>
        <div><h3>Custom printing</h3><button onClick={() => selectCategory('ID & PVC cards')}>ID & PVC cards</button><button onClick={() => selectCategory('Printing services')}>Marksheets & certificates</button><button onClick={() => selectCategory('T-shirt printing')}>T-shirt printing & painting</button><button onClick={() => selectCategory('Photo services')}>Passport & glossy photos</button></div>
        <div><h3>Visit or contact</h3><p>Shree School Mart, Narmada Colony,<br />Udaipura 464770, Raisen (MP)</p><p>Open daily: 8:30 AM–10:00 PM</p><a className="contact-link" href={whatsappUrl('Hello Shree School Mart, I want to enquire about your products and services.')} target="_blank" rel="noreferrer"><MessageCircle size={17} />99819 90811</a><a className="contact-link secondary-contact" href="tel:+919584626452"><PhoneCall size={17} />Alternate: 95846 26452</a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Shree School Mart</span><span>Website ordering & online payment coming soon</span></div>
    </footer>

    {notice && <div className="toast" role="status"><span>{notice}</span><button aria-label="Dismiss notification" onClick={() => setNotice('')}><X size={18} /></button></div>}

    {(panel || product) && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) { setPanel(null); setProduct(null); } }}>
      <section className={`drawer ${product ? 'detail-drawer' : ''}`} role="dialog" aria-modal="true" aria-label={product?.name || panel || 'Shop details'}>
        <div className="drawer-heading"><h2>{product?.name || ({ cart: 'Your enquiry bag', wishlist: 'Your wishlist', contact: 'Contact Shree School Mart' } as const)[panel!]}</h2><button autoFocus aria-label="Close dialog" onClick={() => { setPanel(null); setProduct(null); }}><X /></button></div>
        {product && <>
          <ItemIcon item={product} />
          <p className="detail-category">{product.category} / {product.sub}</p>
          <p>{product.desc}</p>
          <h3 className="contact-price">Contact for price</h3>
          <p className="sample-note">Online ordering and payment are coming soon. You can enquire and place your order with the shop through WhatsApp.</p>
          <a className="primary whatsapp full" href={whatsappUrl(`Hello Shree School Mart, I want to order/enquire about ${product.name}. Please share available options and price.`)} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Order now on WhatsApp</a>
          <button className="secondary full" disabled={busy || !loaded} onClick={() => add(product)}>Add to enquiry bag</button>
        </>}

        {panel === 'wishlist' && <>{wishlist.length ? <div className="wishlist-grid">{products.filter((item) => wishlist.includes(item.id)).map((item) => <ProductCard item={item} key={item.id} />)}</div> : <div className="empty"><Heart /><h3>Save something you like.</h3><p>Tap the heart on a service to keep it here.</p><button className="primary" onClick={() => setPanel(null)}>Explore services</button></div>}</>}

        {panel === 'cart' && <>{cart.length ? <>
          <div className="bag-list">{cart.map((line) => { const item = products.find((entry) => entry.id === line.id)!; const Icon = icons[item.icon] || Package; return <div className="bag-item" key={item.id}><div className={`bag-art ${item.color}`}><Icon /></div><div className="bag-info"><h3>{item.name}</h3><span>Price available on request</span><div className="qty"><button disabled={busy || line.qty <= 1} aria-label={`Decrease ${item.name} quantity`} onClick={() => save(cart.map((entry) => entry.id === item.id ? { ...entry, qty: entry.qty - 1 } : entry), wishlist)}><Minus size={14} /></button><span>{line.qty}</span><button disabled={busy || line.qty >= 999} aria-label={`Increase ${item.name} quantity`} onClick={() => save(cart.map((entry) => entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry), wishlist)}><Plus size={14} /></button></div></div><div className="bag-end"><button aria-label={`Remove ${item.name}`} disabled={busy} onClick={() => save(cart.filter((entry) => entry.id !== item.id), wishlist)}><Trash2 size={17} /></button></div></div>; })}</div>
          <div className="summary"><p><CheckCircle2 size={17} />Your selected items and quantities will be added automatically to the WhatsApp message.</p><a className="primary whatsapp full" href={whatsappUrl(bagMessage)} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Order now on WhatsApp</a><button className="secondary full" disabled>Website checkout & payment — coming soon</button></div>
        </> : <div className="empty"><ShoppingBag /><h3>Your enquiry bag is empty.</h3><p>Add products here, then send the complete list on WhatsApp.</p><button className="primary" onClick={() => setPanel(null)}>Browse services</button></div>}</>}

        {panel === 'contact' && <div className="contact-panel">
          <img src="/shree-school-mart-logo.jpeg" alt="Shree School Mart" />
          <div><MapPin /><p><strong>Shop address</strong><br />Shree School Mart, Narmada Colony,<br />Udaipura 464770, Raisen (MP)</p></div>
          <div><Clock /><p><strong>Shop timings</strong><br />8:30 AM to 10:00 PM</p></div>
          <div><PhoneCall /><p><strong>Phone numbers</strong><br /><a href="tel:+919981990811">99819 90811</a><br /><a href="tel:+919584626452">95846 26452 (alternate)</a></p></div>
          <a className="primary whatsapp full" href={whatsappUrl('Hello Shree School Mart, I want to enquire about your products and services.')} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Chat on WhatsApp</a>
        </div>}
      </section>
    </div>}
  </>;
}
