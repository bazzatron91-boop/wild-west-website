import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Mail, Phone, MapPin, Leaf, Scissors, Sprout, Droplets, Shovel,
  ImagePlus, TreePine, ShieldCheck, HeartHandshake,
  Share2, Globe, Star, CalendarDays, ClipboardList,
} from "lucide-react";
import "./styles.css";

const COMPANY_EMAIL = "wildwesthorticulture@gmail.com";
const FORM_NAME = "wild-west-contact";
const WEB3FORMS_ACCESS_KEY = "29846d33-902a-408f-b9f1-19418fe755d6";

function SectionTitle({ children }) {
  return (
    <div className="section-title">
      <div className="title-brush"><h2>{children}</h2></div>
      <div className="leaf-line"><span /><Leaf /><span /></div>
    </div>
  );
}

function ImagePlaceholder({ label, large = false }) {
  return (
    <div className={`image-placeholder ${large ? "large" : ""}`}>
      <div><ImagePlus /><p>{label}</p></div>
    </div>
  );
}

function App() {
  const emptyForm = {
    name: "",
    phone: "",
    email: "",
    suburb: "",
    serviceType: "",
    frequency: "",
    preferredContact: "",
    photosLink: "",
    message: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const services = [
    { title: "Lawn Mowing & Edging", description: "Reliable mowing, edging, trimming, and general lawn presentation for residential properties.", icon: Scissors },
    { title: "Regular Garden Maintenance", description: "One-off, fortnightly, monthly, and seasonal garden care options for lawns, beds, pruning, weeds, and general presentation.", icon: CalendarDays },
    { title: "Weeding & Weed Control", description: "Manual weeding, tidy garden beds, and suitable chemical application for weeds where appropriate.", icon: Leaf },
    { title: "Hedge Trimming & Pruning", description: "Shaping, reduction, tidy pruning, dead growth removal, and practical plant health advice.", icon: Scissors },
    { title: "Turf Installation", description: "Fresh lawn installs, soil preparation, levelling, turf laying, and aftercare advice.", icon: Sprout },
    { title: "Irrigation Repairs", description: "Basic sprinkler checks, repairs, replacements, and garden watering improvements.", icon: Droplets },
    { title: "Mulch, Soil & Garden Beds", description: "Mulching, soil improvement, garden bed cleanups, planting preparation, and edging refreshes.", icon: Shovel },
    { title: "Garden Clean-Ups", description: "Overgrown garden tidy-ups, green waste removal, end-of-lease presentation, and pre-sale outdoor refreshes.", icon: ClipboardList },
    { title: "Small Tree Removal", description: "Removal of suitable small trees, with size and access dependent on assessment before the job is confirmed.", icon: TreePine },
  ];

  const galleryItems = [
    { title: "Before & after lawn repair" },
    { title: "Fresh turf installation", image: "/fresh-turf-installation.png", alt: "Before and after fresh turf installation" },
    { title: "Garden tidy-up" },
    { title: "Mulch and planting job" },
    { title: "Hedge and pruning work", image: "/hedge-pruning-work.png", alt: "Before and after hedge pruning work" },
    { title: "Blue metal and weed mat job", image: "/blue-metal-weed-mat-job.png", alt: "Before and after blue metal and weed mat job" },
  ];

  const values = [
    { title: "Service Area", text: "Servicing all of 6056, 6055, 6054, 6069, 6076 and surrounds.", icon: MapPin },
    { title: "Quality Work", text: "High standards and attention to detail on every job.", icon: ShieldCheck },
    { title: "Passionate", text: "Horticulture knowledge behind practical garden work.", icon: Leaf },
    { title: "Community Focused", text: "Proudly supporting our local community.", icon: HeartHandshake },
  ];

  const reviews = [
    { source: "Google", text: "Client review coming soon.", name: "Google Review" },
    { source: "Facebook", text: "Client review coming soon.", name: "Facebook Review" },
    { source: "Google", text: "Client review coming soon.", name: "Google Review" },
  ];

  const faqs = [
    { question: "Do you offer once-off garden tidy-ups?", answer: "Yes, once-off garden tidy-ups are available for properties that need a fresh start or seasonal clean-up." },
    { question: "Do you provide regular maintenance?", answer: "Yes, regular maintenance can be arranged based on your garden, schedule, and the level of care needed." },
    { question: "Which areas do you service?", answer: "Wild West Horticulture services 6056, 6055, 6054, 6069, 6076 and surrounding areas." },
    { question: "Can you quote from photos?", answer: "Photos are helpful for an initial idea, though some jobs may need an in-person inspection before a final quote." },
    { question: "Do you remove green waste?", answer: "Green waste removal can be included depending on the job and the amount of material involved." },
    { question: "Do you install turf?", answer: "Yes, turf installation work can include preparation, levelling, laying, and aftercare advice." },
    { question: "Do you do weed control?", answer: "Yes, weed control options include manual removal and suitable chemical application where appropriate." },
    { question: "Can you repair irrigation?", answer: "Basic irrigation and sprinkler repairs can be assessed and completed where suitable." },
    { question: "Are you insured?", answer: "Yes, Wild West Horticulture is fully insured." },
    { question: "How do I request a quote?", answer: "Use the contact form, call, or email with your suburb, contact details, and a short description of the work needed." },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(false);
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New Wild West Horticulture enquiry",
          from_name: form.name,
          name: form.name,
          phone: form.phone,
          email: form.email || COMPANY_EMAIL,
          suburb: form.suburb,
          service_type: form.serviceType,
          frequency: form.frequency,
          preferred_contact: form.preferredContact,
          photos_link: form.photosLink,
          message: form.message,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("WEB3FORMS_SUBMISSION_FAILED");

      setSubmitted(true);
      setForm(emptyForm);
    } catch (error) {
      setSubmitError("Your message could not be sent right now. Please call or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <header>
        <div className="nav-wrap">
          <a href="#home" className="logo-box" aria-label="Wild West Horticulture home">
            <img src="/wild-west-logo.png" alt="Wild West Horticulture" />
          </a>
          <nav>
            <a href="#home">Home</a><a href="#services">Services</a><a href="#about">About Us</a><a href="#gallery">Gallery</a><a href="#reviews">Reviews</a><a href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="top-button">Get in touch</a>
        </div>
      </header>

      <main id="home">
        <section className="hero texture">
          <div className="hero-grid">
            <div>
              <p className="kicker">ESTD 2026 · Swan Valley</p>
              <h1>Outdoor Spaces.<span>Wildly Better.</span></h1>
              <div className="leaf-line left"><span /><Leaf /><span /></div>
              <p className="hero-copy">Reliable, local and passionate about creating beautiful outdoor spaces.</p>
              <div className="hero-actions"><a href="#contact">Request a quote</a><a href="#services">Our services</a></div>
            </div>
            <div className="hero-image">
              <div className="script-note">From small yards to big properties,<br />we’ve got you covered!</div>
              <img className="hero-garden-image" src="/main-garden-image.png" alt="Before and after garden work by Wild West Horticulture" />
            </div>
          </div>
        </section>

        <section id="services" className="dark-section">
          <div className="container">
            <SectionTitle>Our Services</SectionTitle>
            <div className="services-grid">
              {services.map((service) => {
                const Icon = service.icon;
                return <article className="service-card" key={service.title}><div className="icon-circle"><Icon /></div><div><h3>{service.title}</h3><p>{service.description}</p></div></article>;
              })}
            </div>
          </div>
        </section>

        <section id="about" className="about texture">
          <div className="about-grid">
            <div className="framed"><ImagePlaceholder label="About image placeholder" large /></div>
            <div>
              <h2>About <span>Wild West</span> Horticulture</h2>
              <p><strong>Wild West Horticulture is a Perth-based horticulture and garden care business focused on quality work, practical advice, and reliable service.</strong></p>
              <p>Run by a qualified horticulturist and fully insured, the business aims to give clients more than a quick tidy-up. The goal is to improve the health, presentation, and long-term performance of each garden.</p>
              <div className="values">{values.map((value) => { const Icon = value.icon; return <div key={value.title}><Icon /><h3>{value.title}</h3><p>{value.text}</p></div>; })}</div>
            </div>
          </div>
        </section>

        <section id="gallery" className="dark-section">
          <div className="container">
            <SectionTitle>Gallery</SectionTitle>
            <p className="center-copy">A selection of previous work completed for local clients, showing the care, detail, and practical improvements Wild West Horticulture brings to outdoor spaces.</p>
            <div className="gallery-grid">
              {galleryItems.map((item, index) => (
                <div className="gallery-card" key={item.title}>
                  {item.image ? <img className="gallery-image" src={item.image} alt={item.alt} /> : <ImagePlaceholder label={`Photo ${index + 1}`} />}
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="reviews texture">
          <div className="container review-container">
            <SectionTitle>Reviews</SectionTitle>
            <p className="review-copy">Feedback from clients across Google and Facebook will be added here as Wild West Horticulture continues helping local outdoor spaces look their best.</p>
            <div className="review-grid">
              {reviews.map((review, index) => (
                <article className="review-card" key={`${review.source}-${index}`}>
                  <div className="stars"><Star /><Star /><Star /><Star /><Star /></div>
                  <p>{review.text}</p>
                  <strong>{review.name}</strong>
                  <small>{review.source}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="dark-section">
          <div className="container">
            <SectionTitle>FAQ</SectionTitle>
            <div className="faq-grid">
              {faqs.map((faq) => (
                <article className="faq-item" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact texture">
          <div className="contact-grid">
            <div>
              <h2>Contact Us</h2>
              <p>Send through your name, contact details, suburb, and a quick description of the work needed. Photos are helpful when requesting a quote.</p>
              <div className="contact-list">
                <p><Phone />0455 142 614</p>
                <p><Mail />{COMPANY_EMAIL}</p>
                <p><Share2 /><a href="#" aria-label="Wild West Horticulture Instagram">Instagram</a></p>
                <p><Globe /><a href="#" aria-label="Wild West Horticulture Facebook">Facebook</a></p>
              </div>
            </div>

            <form name={FORM_NAME} onSubmit={handleSubmit}>
              <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
              <p className="hidden"><label>Don’t fill this out if you’re human: <input name="bot-field" /></label></p>
              <h3>Send us a message</h3>
              <div className="two-col"><input name="name" value={form.name} onChange={handleChange} required placeholder="Your Name *" /><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" /></div>
              <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number *" />
              <div className="two-col"><input name="suburb" value={form.suburb} onChange={handleChange} placeholder="Suburb" /><input name="serviceType" value={form.serviceType} onChange={handleChange} placeholder="Service Needed" /></div>
              <div className="two-col"><input name="frequency" value={form.frequency} onChange={handleChange} placeholder="One-off or Regular?" /><input name="preferredContact" value={form.preferredContact} onChange={handleChange} placeholder="Preferred Contact Method" /></div>
              <input name="photosLink" value={form.photosLink} onChange={handleChange} placeholder="Photo Link" />
              <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Message *" />
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send Message"}</button>
              {submitted && <p className="success">Thanks. Your enquiry has been sent.</p>}
              {submitError && <p className="error">{submitError}</p>}
              <p className="form-note">Your message will be sent directly to our team.</p>
            </form>
          </div>
        </section>
      </main>

      <footer><p>Quality Work. Great Service. Wild West.</p><em>Proudly supporting our local community</em><small>© {new Date().getFullYear()} Wild West Horticulture. All rights reserved.</small></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
