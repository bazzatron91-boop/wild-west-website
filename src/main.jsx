import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Mail, Phone, MapPin, Leaf, Scissors, Sprout, Droplets, Shovel,
  ImagePlus, TreePine, ShieldCheck, HeartHandshake,
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
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const services = [
    { title: "Lawn Mowing & Edging", description: "Reliable mowing, edging, trimming, and general lawn presentation for residential properties.", icon: Scissors },
    { title: "Garden Maintenance", description: "Weeding, pruning, green waste removal, tidy-ups, ongoing garden care, professional recommendations for garden health, and chemical application for weeds, pests, and fertiliser.", icon: Leaf },
    { title: "Turf Installation", description: "Fresh lawn installs, soil preparation, levelling, and aftercare advice.", icon: Sprout },
    { title: "Irrigation Repairs", description: "Basic sprinkler checks, repairs, replacements, and garden watering improvements.", icon: Droplets },
    { title: "Mulch, Soil & Garden Beds", description: "Mulching, soil improvement, basic garden edging, garden bed cleanups, planting prep, and small landscaping jobs.", icon: Shovel },
    { title: "Small Tree Removal", description: "Removal of suitable small trees, with size and access dependent on assessment before the job is confirmed.", icon: TreePine },
  ];

  const galleryItems = [
    "Before & after lawn repair", "Fresh turf installation", "Garden tidy-up",
    "Mulch and planting job", "Hedge and pruning work", "Blue metal and weed mat job",
  ];

  const values = [
    { title: "Local & Reliable", text: "Servicing Swan Valley and surrounding areas.", icon: MapPin },
    { title: "Quality Work", text: "High standards and attention to detail on every job.", icon: ShieldCheck },
    { title: "Passionate", text: "Horticulture knowledge behind practical garden work.", icon: Leaf },
    { title: "Community Focused", text: "Proudly supporting our local community.", icon: HeartHandshake },
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
          message: form.message,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("WEB3FORMS_SUBMISSION_FAILED");

      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", message: "" });
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
            <a href="#home">Home</a><a href="#services">Services</a><a href="#about">About Us</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a>
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
              <p>Run by a qualified horticulturist, the business aims to give clients more than a quick tidy-up. The goal is to improve the health, presentation, and long-term performance of each garden.</p>
              <div className="values">{values.map((value) => { const Icon = value.icon; return <div key={value.title}><Icon /><h3>{value.title}</h3><p>{value.text}</p></div>; })}</div>
            </div>
          </div>
        </section>

        <section id="gallery" className="dark-section">
          <div className="container">
            <SectionTitle>Gallery</SectionTitle>
            <p className="center-copy">Garden images are currently blank placeholders. Replace them with real before-and-after work photos as jobs are completed.</p>
            <div className="gallery-grid">{galleryItems.map((item, index) => <div className="gallery-card" key={item}><ImagePlaceholder label={`Photo ${index + 1}`} /><p>{item}</p></div>)}</div>
          </div>
        </section>

        <section id="contact" className="contact texture">
          <div className="contact-grid">
            <div>
              <h2>Contact Us</h2>
              <p>Send through your name, contact details, suburb, and a quick description of the work needed. Photos are helpful when requesting a quote.</p>
              <div className="contact-list"><p><Phone />0455 142 614</p><p><Mail />{COMPANY_EMAIL}</p><p><MapPin />Servicing Swan Valley</p></div>
            </div>

            <form name={FORM_NAME} onSubmit={handleSubmit}>
              <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
              <p className="hidden"><label>Don’t fill this out if you’re human: <input name="bot-field" /></label></p>
              <h3>Send us a message</h3>
              <div className="two-col"><input name="name" value={form.name} onChange={handleChange} required placeholder="Your Name *" /><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" /></div>
              <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number *" />
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
