import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, Clock3, MapPin, MessageCircle, SlidersHorizontal, X } from 'lucide-react';
import { packages, packageCategories, formatPrice } from '../data/packages';
import { site } from '../data/content';
import './Packages.css';

export default function Packages() {
  const [category, setCategory] = useState('All trips');
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState('');
  const [travellers, setTravellers] = useState('2');
  const [customise, setCustomise] = useState(false);
  const [requests, setRequests] = useState('');
  const dialog = useRef(null);
  const visible = packages.filter(item => category === 'All trips' || item.category === category);
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selected]);

  function close() {
    dialog.current.close();
    setSelected(null);
    setDate('');
    setTravellers('2');
    setCustomise(false);
    setRequests('');
  }

  function enquiry(event) {
    event.preventDefault();
    const message = `Hi TrippyGo! I'm interested in "${selected.title}" (${selected.days} days / ${selected.nights} nights).\nTravellers: ${travellers}\nPreferred departure: ${date || 'Flexible'}\nPackage price: ${formatPrice(selected.price)} per person\nPlan: ${customise ? 'Customised package' : 'Standard package'}${customise ? `\nRequested changes: ${requests || 'Please help me personalise this trip.'}` : ''}\n${customise ? 'Please share the revised itinerary and price for these changes.' : 'Please confirm availability and booking details for the standard package.'}`;
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  return <section id="packages" className="packages-section">
    <div className="container">
      <div className="section-heading" data-reveal>
        <div><span className="eyebrow">GOOD THINGS COME IN PACKAGES</span><h2>A few days away.<br/><em>A whole new feeling.</em></h2></div>
        <p>Thoughtful routes, lovely stays, and room for you.<br/>Pick a package, or customise one to suit you.</p>
      </div>
      <div className="package-toolbar">
        <div className="filters" aria-label="Filter packages">
          {packageCategories.map(item => <button key={item} className={`filter ${category === item ? 'active' : ''}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <span className="package-count" aria-live="polite"><SlidersHorizontal size={14}/>{visible.length} curated trip ideas</span>
      </div>
      <div className="packages-grid">
        {visible.map((item, index) => <article className="package-card" key={item.id} style={{ '--card-delay': `${index * 65}ms` }}>
          <button className="package-cover" onClick={() => setSelected(item)} aria-label={`View ${item.title} package`}>
            <img src={item.image} alt={item.alt} loading="lazy"/>
            <span className="package-badge">{item.badge}</span>
            <span className="package-place"><MapPin size={14}/>{item.destination}</span>
            <span className="package-cover-arrow"><ArrowUpRight size={20}/></span>
          </button>
          <div className="package-content">
            <div className="package-meta"><span><Clock3 size={13}/>{item.days} days / {item.nights} nights</span><span>{item.category}</span></div>
            <h3><button onClick={() => setSelected(item)}>{item.title}</button></h3>
            <p className="package-route">{item.route}</p>
            <p className="package-description">{item.description}</p>
            <div className="package-features">{item.features.map(feature => <span key={feature}><Check size={12}/>{feature}</span>)}</div>
            <div className="package-price-row"><div><small>STANDARD PACKAGE · PER PERSON</small><strong>{formatPrice(item.price)}</strong></div><button className="package-detail-button" onClick={() => setSelected(item)}>View trip <ArrowUpRight size={17}/></button></div>
          </div>
        </article>)}
      </div>
      <div className="custom-package" data-reveal><div><span className="custom-package-icon"><SlidersHorizontal size={23}/></span><div><h3>Have a different trip in mind?</h3><p>Change the stays, duration, or experiences. We’ll price your custom plan separately.</p></div></div><a href="#contact" className="text-link">Customise a package <ArrowRight size={17}/></a></div>
      <p className="sample-note">Standard packages have a set per-person price. Customisation is available with a separately priced itinerary.</p>
    </div>
    <dialog className="package-dialog" ref={dialog} aria-labelledby="package-dialog-title" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === dialog.current) close(); }}>
      {selected && <>
        <button className="dialog-close" onClick={close} aria-label="Close package details"><X size={21}/></button>
        <div className="package-dialog-cover"><img src={selected.image} alt={selected.alt}/><span>{selected.destination} / {selected.days} days</span></div>
        <div className="package-dialog-body">
          <span className="eyebrow">A TRIP TO MAKE YOUR OWN</span><h2 id="package-dialog-title">{selected.title}</h2><p className="package-dialog-intro">{selected.description}</p>
          <div className="package-dialog-facts"><span><Clock3 size={15}/>{selected.days} days · {selected.nights} nights</span><span><MapPin size={15}/>{selected.destination}</span><strong>{formatPrice(selected.price)} <small>/ person</small></strong></div>
          <h3>Your days, beautifully unhurried</h3>
          <ol className="package-timeline">{selected.itinerary.map((day, index) => <li key={day.title}><span className="timeline-day">{String(index + 1).padStart(2, '0')}</span><div><h4>{day.title}</h4><p>{day.text}</p></div></li>)}</ol>
          <div className="package-inclusions"><h3>A clear price. Room to make it yours.</h3><p>The displayed rate is per person for the standard package. Prefer a different stay, more days, or extra experiences? Choose customisation below for a revised itinerary and price. We’ll confirm the inclusions, occupancy, travel dates, taxes, and any additional charges before booking. Flights and optional activities are not assumed to be included.</p></div>
          <form className="package-enquiry" onSubmit={enquiry}>
            <h3>Make this your next trip</h3><p>No payment here. Just a conversation about your plans.</p>
            <div className="enquiry-fields"><label>Preferred departure <span>(optional)</span><input type="date" min={minDate} value={date} onChange={event => setDate(event.target.value)}/></label><label>Travellers<select value={travellers} onChange={event => setTravellers(event.target.value)}>{['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map(value => <option key={value}>{value}</option>)}</select></label></div>
            <label className="customise-toggle"><input type="checkbox" checked={customise} onChange={event => setCustomise(event.target.checked)}/><span><strong>I’d like to customise this package</strong><small>Changes to the standard plan are priced separately.</small></span></label>
            {customise && <label className="customise-request">What would you like to change?<textarea value={requests} onChange={event => setRequests(event.target.value)} maxLength={1000} rows={3} placeholder="A different stay, an extra night, particular activities…"/></label>}
            <button className="button button-green" type="submit">{customise ? 'Discuss my custom trip' : 'Enquire about this package'} <MessageCircle size={18}/></button><small>Opens WhatsApp with your trip details. Send when you’re ready.</small>
          </form>
        </div>
      </>}
    </dialog>
  </section>;
}
