import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Calendar, Shield, Clock, CheckCircle, Leaf, Video, FileText, MessageCircle } from 'lucide-react';

const FORM_ENDPOINT = "https://formspree.io/f/mwpnyekj";

const LegalWeedDocWebsite = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [tz, setTz] = useState("");
  const [minDt, setMinDt] = useState("");
  
  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const toLocal = (d: any) => {
      const off = d.getTimezoneOffset();
      const local = new Date(d.getTime() - off * 60000);
      return local.toISOString().slice(0, 16);
    };
    setMinDt(toLocal(new Date()));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: any) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    setErrorMsg("");
  
    try {
      const resp = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" }, 
        body: new FormData(e.currentTarget),
      });
  
      const data = await resp.json().catch(() => null);
  
      if (resp.ok) {
        setSent(true);
        e.currentTarget.reset();
      } else {
        const msg =
          (data?.errors && data.errors.map((e: any) => e.message).join(" ")) ||
          data?.error ||
          `Request failed (${resp.status}). Please try again.`;
        setErrorMsg(msg);
      }
    } catch (err) {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Legal<span className="text-green-600">Weed</span>Doc.com
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-green-600 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-green-600 transition-colors">
                How It Works
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-700 hover:text-green-600 transition-colors">
                FAQ
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-green-600 transition-colors">
                Contact
              </button>
              <a 
                href="tel:225-387-7858" 
                className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="text-lg">225-387-7858</span>
              </a>
              <button 
                onClick={() => scrollToSection('book')}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Book Appointment $99
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-green-600 transition-colors text-left">
                  Home
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-green-600 transition-colors text-left">
                  How It Works
                </button>
                <button onClick={() => scrollToSection('faq')} className="text-gray-700 hover:text-green-600 transition-colors text-left">
                  FAQ
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-green-600 transition-colors text-left">
                  Contact
                </button>
                <a 
                  href="tel:225-387-7858" 
                  className="flex items-center gap-2 text-green-600 font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  225-387-7858
                </a>
                <button 
                  onClick={() => scrollToSection('book')}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-xl font-semibold"
                >
                  Book Appointment $99
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Get Your Louisiana Medical Marijuana<br />Recommendation Online
            </h1>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="text-4xl md:text-5xl font-bold text-green-600">$99</div>
              <div className="text-2xl text-gray-700">Per Visit</div>
            </div>
            <p className="text-xl text-gray-700 mb-4">
              Telemedicine appointments with <strong>Dr. Raynando Banks Sr.</strong>
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Licensed Louisiana Physician
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="font-medium">Fast</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Secure</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Confidential</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium">Compliant</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:225-387-7858"
                className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Phone className="w-6 h-6" />
                Call Now: 225-387-7858
              </a>
              <button 
                onClick={() => scrollToSection('book')}
                className="inline-flex items-center gap-2 bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-xl text-xl font-semibold hover:bg-green-50 transition-all"
              >
                Book Now
                <Calendar className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Who We Are</h2>
          <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-green-700 mb-6">Raynando L. Banks, M.D., INC</h3>
            <div className="flex items-start gap-3 mb-6 text-gray-700">
              <MapPin className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-lg">3870 Convention St</p>
                <p className="text-lg">Baton Rouge, LA 70806</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-8">
              <Phone className="w-6 h-6 text-green-600" />
              <a href="tel:225-387-7858" className="text-2xl font-bold text-green-600 hover:text-green-700">
                225-387-7858
              </a>
            </div>
            <div className="space-y-4 text-gray-700 text-lg">
              <p>
                Dr. Raynando Banks Sr. is a Louisiana-licensed family medicine physician. He provides convenient 
                and secure telemedicine consultations for medical marijuana recommendations.
              </p>
              <p className="font-semibold text-gray-900">
                Our mission is to make the process <span className="text-green-600">simple, compliant, and patient-focused</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">How It Works</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Simple steps to get your recommendation</p>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Book Online</h3>
              <p className="text-gray-600">
                Choose your appointment time. $99 per visit.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Meet Virtually</h3>
              <p className="text-gray-600">
                Join your telemedicine call with Dr. Banks.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Recommendation</h3>
              <p className="text-gray-600">
                Your recommendation is sent electronically.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">4</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Dispensary</h3>
              <p className="text-gray-600">
                Shop legally at any licensed Louisiana dispensary.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => scrollToSection('book')}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              Schedule My Visit
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Simple & Transparent</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Clear pricing with no surprises</p>
          
          <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-600 rounded-2xl p-10 max-w-lg mx-auto shadow-lg">
            <div className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-3">$99</div>
              <div className="text-2xl text-gray-700 mb-8">per visit</div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">Telemedicine consultation</span>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">Medical marijuana recommendation</span>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">HIPAA-compliant digital record</span>
                </div>
              </div>

              <div className="bg-green-100 border border-green-300 rounded-xl p-4">
                <p className="text-green-900 font-bold text-lg">No hidden fees. Ever.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose Us</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Louisiana-licensed physician</h3>
                <p className="text-gray-600 text-sm">Board-certified and state-approved</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Telemedicine from home</h3>
                <p className="text-gray-600 text-sm">No need to travel or wait in office</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Fast approval</h3>
                <p className="text-gray-600 text-sm">Quick and efficient process</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Clear pricing</h3>
                <p className="text-gray-600 text-sm">No surprises or hidden fees</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Local practice in Baton Rouge</h3>
                <p className="text-gray-600 text-sm">Serving Louisiana patients</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">HIPAA-compliant</h3>
                <p className="text-gray-600 text-sm">Your privacy is protected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 hover:bg-green-50 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is this legal in Louisiana?</h3>
              <p className="text-gray-700">
                Yes. Louisiana physicians can provide medical marijuana recommendations via telemedicine.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:bg-green-50 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Do I have to come in person?</h3>
              <p className="text-gray-700">
                No. Everything is done online in a secure, HIPAA-compliant session.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:bg-green-50 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How long does it last?</h3>
              <p className="text-gray-700">
                The duration of your recommendation will be determined by Dr. Banks during your consultation.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:bg-green-50 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Do you sell cannabis?</h3>
              <p className="text-gray-700">
                No. We only provide medical recommendations.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:bg-green-50 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How do I renew?</h3>
              <p className="text-gray-700">
                Book another appointment online when you need a new recommendation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal & Privacy */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Legal & Privacy</h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4 text-gray-700">
            <p className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>We do not sell or promote cannabis products.</span>
            </p>
            <p className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>This service is limited to patients residing in Louisiana.</span>
            </p>
            <p className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Approval is at the physician's discretion following a telemedicine consultation.</span>
            </p>
            <p className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>All records and communications are HIPAA-compliant.</span>
            </p>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="font-bold text-green-700 text-xl mb-3">Raynando L. Banks, M.D., INC</p>
              <p className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-green-600" />
                3870 Convention St, Baton Rouge, LA 70806
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                <a href="tel:225-387-7858" className="text-green-600 font-bold text-lg hover:text-green-700">
                  225-387-7858
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Use our secure online form to schedule your telemedicine visit.
            </p>
            <p className="text-gray-700 font-medium">
              Appointments fill quickly — reserve your spot today.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all"
                    placeholder="(225) 555-0123"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    min={minDt.split('T')[0]}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Preferred Time *</label>
                  <select
                    name="preferredTime"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all"
                  >
                    <option value="">Select a time</option>
                    <option>Morning (9AM-12PM)</option>
                    <option>Afternoon (12PM-4PM)</option>
                    <option>Evening (4PM-6PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Additional Information (Optional)</label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all resize-none"
                  placeholder="Tell us anything else we should know..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="hipaa"
                  name="hipaaConsent"
                  required
                  className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="hipaa" className="text-sm text-gray-600">
                  I consent to the collection and use of my health information for medical evaluation purposes, 
                  in accordance with HIPAA privacy regulations. *
                </label>
              </div>

              {/* Hidden fields */}
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
              <input type="hidden" name="source" value="legalweeddoc.com" />
              <input type="hidden" name="timezone" value={tz} />

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {sending ? "Scheduling..." : "Confirm My Appointment"}
              </button>

              {sent && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-green-700 font-medium">
                    Thank you! We'll contact you within 24 hours to confirm your appointment and arrange payment.
                  </p>
                </div>
              )}
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700">{errorMsg}</p>
                </div>
              )}
            </form>

            <div className="text-center mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-3">Prefer to call?</p>
              <a 
                href="tel:225-387-7858"
                className="inline-flex items-center gap-2 text-green-600 text-2xl font-bold hover:text-green-700 transition-colors"
              >
                <Phone className="w-6 h-6" />
                225-387-7858
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo & Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">
                  Legal<span className="text-green-400">Weed</span>Doc.com
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Professional medical marijuana recommendations. Licensed Louisiana practice.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  3870 Convention St, Baton Rouge, LA 70806
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:225-387-7858" className="text-green-400 font-semibold hover:text-green-300">
                    225-387-7858
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  rbnaksmedical@yahoo.com
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <button onClick={() => scrollToSection('home')} className="block hover:text-white transition-colors">
                  Home
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="block hover:text-white transition-colors">
                  How It Works
                </button>
                <button onClick={() => scrollToSection('faq')} className="block hover:text-white transition-colors">
                  FAQ
                </button>
                <button onClick={() => scrollToSection('book')} className="block text-green-400 hover:text-green-300 transition-colors font-semibold">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p className="mb-2">© 2025 LegalWeedDoc.com | Raynando L. Banks, M.D., INC | All Rights Reserved</p>
            <div className="flex justify-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <span>|</span>
              <button onClick={() => scrollToSection('book')} className="hover:text-white transition-colors">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalWeedDocWebsite;