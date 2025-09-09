import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Shield, ClipboardCheck, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter, ArrowRight, Check, Star, Users, TrendingUp, Award, Calendar, DollarSign, FileText, Clock, Building, Search, CheckCircle, AlertCircle, Gavel, Zap, BarChart3, HandshakeIcon, Briefcase, UserCheck, FileSearch, Smartphone, Globe, Headphones, Leaf, Heart, Brain, Activity, Stethoscope, Pill, BookOpen, PlayCircle, MessageCircle, Video } from 'lucide-react';

const FORM_ENDPOINT = "https://formspree.io/f/mwpnyekj";

const LegalWeedDocWebsite = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [tz, setTz] = useState("");
  const [minDt, setMinDt] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedCondition, setSelectedCondition] = useState('chronic-pain');
  
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Maria Rodriguez",
      condition: "Chronic Pain Patient",
      text: "Dr. Green helped me find relief from chronic back pain after years of ineffective treatments. The medical cannabis program has given me my life back.",
      rating: 5
    },
    {
      name: "James Wilson",
      condition: "Cancer Survivor",
      text: "During my chemotherapy, medical cannabis was the only thing that helped with nausea and appetite. Dr. Green's guidance was invaluable.",
      rating: 5
    },
    {
      name: "Sarah Chen",
      condition: "Anxiety & PTSD",
      text: "The personalized treatment plan has significantly reduced my anxiety symptoms. Professional, compassionate care throughout the process.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const conditionTreatments: any = {
    'chronic-pain': {
      title: "Chronic Pain Management",
      icon: <Activity className="w-8 h-8" />,
      description: "Evidence-based medical cannabis treatment for persistent pain conditions",
      benefits: [
        { title: "Reduced Opioid Dependency", desc: "Lower reliance on addictive pain medications" },
        { title: "Improved Sleep Quality", desc: "Better rest and recovery patterns" },
        { title: "Enhanced Mobility", desc: "Increased daily function and activity levels" },
        { title: "Inflammation Reduction", desc: "Natural anti-inflammatory properties" },
        { title: "Personalized Dosing", desc: "Tailored treatment plans for optimal relief" },
        { title: "Ongoing Monitoring", desc: "Regular follow-ups and adjustments" }
      ]
    },
    'cancer': {
      title: "Cancer Support Care",
      icon: <Heart className="w-8 h-8" />,
      benefits: [
        { title: "Nausea & Vomiting Relief", desc: "Effective anti-emetic properties" },
        { title: "Appetite Stimulation", desc: "Combat treatment-related weight loss" },
        { title: "Pain Management", desc: "Multi-modal pain relief approach" },
        { title: "Anxiety Reduction", desc: "Emotional support during treatment" },
        { title: "Sleep Improvement", desc: "Better rest during recovery" },
        { title: "Quality of Life", desc: "Enhanced overall well-being" }
      ]
    },
    'mental-health': {
      title: "Mental Health Support",
      icon: <Brain className="w-8 h-8" />,
      benefits: [
        { title: "Anxiety Management", desc: "Reduce excessive worry and panic" },
        { title: "PTSD Treatment", desc: "Address trauma-related symptoms" },
        { title: "Depression Support", desc: "Complement traditional therapies" },
        { title: "Stress Reduction", desc: "Lower cortisol and stress response" },
        { title: "Mood Stabilization", desc: "More consistent emotional regulation" },
        { title: "Social Function", desc: "Improved interpersonal relationships" }
      ]
    }
  };

  const services = [
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: 'Medical Evaluations',
      description: 'Comprehensive assessments to determine medical cannabis eligibility and create personalized treatment plans.',
      features: ['Initial Consultation', 'Condition Assessment', 'Treatment Planning'],
      color: 'from-green-600 to-green-700'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Card Certification',
      description: 'Official medical marijuana card recommendations and state registration assistance.',
      features: ['State Compliance', 'Documentation Support', 'Renewal Services'],
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: <Pill className="w-8 h-8" />,
      title: 'Treatment Monitoring',
      description: 'Ongoing care and dosage adjustments to optimize therapeutic outcomes and minimize side effects.',
      features: ['Follow-up Visits', 'Dosage Optimization', 'Side Effect Management'],
      color: 'from-purple-600 to-purple-700'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Patient Education',
      description: 'Comprehensive education on medical cannabis, dosing, delivery methods, and safety protocols.',
      features: ['Educational Resources', 'Safety Training', 'Product Guidance'],
      color: 'from-amber-600 to-amber-700'
    }
  ];

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
      setErrorMsg("");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-900 tracking-tight">
                Legal<span className="text-green-600">Weed</span>Doc
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'Conditions', 'About', 'Process', 'Contact'].map((item) => {
                const sectionId = item === 'Contact' ? 'contact-form' : item.toLowerCase();
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(sectionId)}
                    className="font-medium transition-colors duration-200 hover:text-green-600 relative group text-gray-700"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
                  </button>
                );
              })}
              <button
                onClick={() => scrollToSection('consultation')}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Book Consultation
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t">
            <div className="px-4 py-4 space-y-2">
              {['Home', 'Services', 'Conditions', 'About', 'Process', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('consultation')}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold mt-4"
              >
                Book Consultation
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
          
          {/* Subtle leaf pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 transform rotate-12">
              <Leaf className="w-24 h-24 text-green-600" />
            </div>
            <div className="absolute top-1/3 right-1/3 transform -rotate-45">
              <Leaf className="w-32 h-32 text-green-600" />
            </div>
            <div className="absolute bottom-1/4 left-1/3 transform rotate-45">
              <Leaf className="w-20 h-20 text-green-600" />
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 transform ${
              visibleSections.has('hero')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="mb-6 flex justify-center gap-4">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold border border-green-200">
                Licensed Medical Professional
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold border border-blue-200">
                State Certified Provider
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 leading-tight">
              Medical Cannabis
              <span className="block mt-2 bg-gradient-to-r from-green-600 via-green-500 to-green-400 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              Professional medical marijuana evaluations and ongoing care. 
              Helping patients access legal, therapeutic cannabis treatments with compassionate, evidence-based medicine.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button
                onClick={() => scrollToSection('consultation')}
                className="px-10 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-green-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <Calendar className="w-5 h-5" />
                Schedule Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('conditions')}
                className="px-10 py-4 bg-white border-2 border-green-600 text-green-600 rounded-full font-bold text-lg hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
              >
                <FileText className="w-5 h-5" />
                Qualifying Conditions
              </button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: '2000+', sublabel: 'Patients Helped', icon: <Users className="w-6 h-6" /> },
                { label: '97%', sublabel: 'Approval Rate', icon: <CheckCircle className="w-6 h-6" /> },
                { label: '24hr', sublabel: 'Certification', icon: <Clock className="w-6 h-6" /> },
                { label: '4.9★', sublabel: 'Patient Rating', icon: <Star className="w-6 h-6" /> }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-green-100">
                  <div className="flex justify-center mb-2 text-green-600">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section id="conditions" className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight">
              Qualifying Medical Conditions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
              Evidence-based medical cannabis treatment for a wide range of conditions. 
              Personalized care plans tailored to your specific medical needs.
            </p>
          </div>

          {/* Condition Selector - Mobile Friendly */}
          <div className="flex justify-center mb-8 md:mb-12 px-2">
            <div className="bg-white rounded-2xl md:rounded-full shadow-lg p-2 w-full max-w-4xl">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                {Object.keys(conditionTreatments).map((condition) => (
                  <button
                    key={condition}
                    onClick={() => setSelectedCondition(condition)}
                    className={`px-4 sm:px-6 py-3 rounded-xl sm:rounded-full font-semibold transition-all duration-300 text-sm sm:text-base flex-1 ${
                      selectedCondition === condition
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {conditionTreatments[condition].title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Treatment Benefits - Mobile Optimized Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
            {conditionTreatments[selectedCondition].benefits.map((benefit: any, index: any) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 border border-green-100 ${
                  visibleSections.has('conditions') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center text-white mb-3 md:mb-4">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Additional Qualifying Conditions - Mobile Responsive */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-green-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
              Other Qualifying Conditions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                ['Epilepsy & Seizures', 'Glaucoma', 'HIV/AIDS', 'Multiple Sclerosis'],
                ['Crohn\'s Disease', 'Parkinson\'s Disease', 'Alzheimer\'s', 'ALS'],
                ['Arthritis', 'Fibromyalgia', 'Migraines', 'And Many More...']
              ].map((column, colIndex) => (
                <div key={colIndex} className="space-y-3">
                  {column.map((condition, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Leaf className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm md:text-base text-gray-700">{condition}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Comprehensive Medical Services
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Professional medical cannabis evaluations, certification, and ongoing patient care 
              with a focus on safety, efficacy, and compassionate treatment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100 ${
                  visibleSections.has('services') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  <div className={`mx-auto flex items-center justify-center w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                        <span className="text-sm font-medium text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-green-700 to-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Patient Success Stories
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Real experiences from patients who found relief through medical cannabis treatment
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-2xl text-white mb-8 italic leading-relaxed">
                "{testimonials[activeTestimonial].text}"
              </p>
              <div className="text-center">
                <div className="text-xl font-bold text-white">{testimonials[activeTestimonial].name}</div>
                <div className="text-green-200">{testimonials[activeTestimonial].condition}</div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-white w-8' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Getting your medical marijuana card is straightforward. Our streamlined process 
              ensures you receive proper evaluation and certification quickly and professionally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Book Consultation',
                description: 'Schedule your confidential medical evaluation online or by phone. Bring medical records if available.',
                icon: <Calendar className="w-8 h-8" />,
                color: 'from-green-600 to-green-700',
                time: '< 5 min'
              },
              {
                step: '02',
                title: 'Medical Evaluation',
                description: 'Meet with Dr. Green to discuss your condition, symptoms, and treatment goals. Professional assessment.',
                icon: <Stethoscope className="w-8 h-8" />,
                color: 'from-blue-600 to-blue-700',
                time: '30-45 min'
              },
              {
                step: '03',
                title: 'Receive Recommendation',
                description: 'Receive your medical recommendation and state registration assistance. Begin legal medical cannabis treatment.',
                icon: <CheckCircle className="w-8 h-8" />,
                color: 'from-purple-600 to-purple-700',
                time: '24-48 hrs'
              }              
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 transform ${
                  visibleSections.has('process') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-8">
                  <div className={`mx-auto w-24 h-24 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <div className="text-sm font-semibold text-green-600 mb-4">{item.time}</div>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 transform ${
              visibleSections.has('about') ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              {/* <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8">
                Dr. Sarah Green, MD
              </h2> */}
              <div className="text-lg text-gray-600 mb-6">
                <span className="font-semibold text-green-600">Board Certified Internal Medicine</span>
              </div>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                With over 15 years of clinical experience, Dr. Green specializes in integrative medicine 
                and medical cannabis therapy. She is dedicated to helping patients find safe, effective 
                alternatives to traditional medications.
              </p>
              
              <div className="grid grid-cols-1 gap-6 mb-8">
                <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">2000+</h4>
                  <p className="text-gray-600">Patients Successfully Treated</p>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">15+ Years</h4>
                  <p className="text-gray-600">Medical Practice Experience</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  'Licensed Medical Doctor',
                  'Board Certified Internal Medicine',
                  'Medical Cannabis Certification',
                  'State Licensed Physician',
                  'Member, Society of Cannabis Clinicians'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative transition-all duration-1000 transform ${
              visibleSections.has('about') ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
                  <Heart className="w-8 h-8 mb-4" />
                  <h4 className="text-lg font-bold mb-2">Compassionate Care</h4>
                  <p className="text-sm opacity-90">Patient-centered approach to healing</p>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                  <BookOpen className="w-8 h-8 mb-4" />
                  <h4 className="text-lg font-bold mb-2">Evidence-Based</h4>
                  <p className="text-sm opacity-90">Latest research and medical standards</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
                  <Shield className="w-8 h-8 mb-4" />
                  <h4 className="text-lg font-bold mb-2">Safe & Legal</h4>
                  <p className="text-sm opacity-90">Full compliance with state regulations</p>
                </div>
                <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-6 text-white">
                  <Users className="w-8 h-8 mb-4" />
                  <h4 className="text-lg font-bold mb-2">Ongoing Support</h4>
                  <p className="text-sm opacity-90">Continuous care and monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 via-green-800 to-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '97%', label: 'Recommendation Success Rate' },
              { number: '24hrs', label: 'Certification Turnaround' },
              { number: '4.9/5', label: 'Patient Satisfaction' },
              { number: '<24hrs', label: 'Response Time' }
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="consultation" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-700"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to Explore Medical Cannabis?
          </h2>
          <p className="text-xl text-green-100 mb-10 leading-relaxed max-w-3xl mx-auto">
            Take the first step toward natural relief. Schedule your confidential consultation 
            with Dr. Green to discuss your medical cannabis options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('contact-form')}
              className="px-10 py-4 bg-white text-green-700 rounded-full font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Schedule Consultation
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-green-700 transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8 leading-tight md:leading-snug">
            Contact The Legal Weed Doc
          </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to begin your medical cannabis journey? Get in touch to schedule your consultation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Office Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Medical Office</h4>
                    <p className="text-gray-600">3870 Convention St<br />Baton Rouge, LA 70806</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">
                      Office: (225) 387-7858<br />
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">
                      General: rbnaksmedical@yahoo.com<br />
                    
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Hours</h4>
                    <p className="text-gray-600">
                      Mon-Fri: 9:00 AM - 6:00 PM<br />
                      Sat: 9:00 AM - 2:00 PM<br />
                      Sun: By Appointment
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h4>
                <div className="flex gap-4">
                  {[
                    { label: 'Facebook', href: '#', Icon: Facebook },
                    { label: 'Instagram', href: '#', Icon: Instagram },
                    { label: 'Twitter', href: '#', Icon: Twitter },
                    { label: 'YouTube', href: '#', Icon: Youtube }
                  ].map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600/40"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div id="contact-form" className="scroll-mt-20 bg-green-50 rounded-3xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Schedule Consultation</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-green-200 focus:border-green-600 focus:outline-none transition-colors bg-white"
                  />
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-green-200 focus:border-green-600 focus:outline-none transition-colors bg-white"
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-green-200 focus:border-green-600 focus:outline-none transition-colors bg-white"
                />

                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-green-200 focus:border-green-600 focus:outline-none transition-colors bg-white"
                />

                <select
                  name="condition"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-green-200 focus:border-green-600 focus:outline-none transition-colors text-gray-600 bg-white"
                >
                  <option value="">Primary Condition</option>
                  <option>Chronic Pain</option>
                  <option>Cancer/Chemotherapy</option>
                  <option>Anxiety/PTSD</option>
                  <option>Epilepsy/Seizures</option>
                  <option>Glaucoma</option>
                  <option>Multiple Sclerosis</option>
                  <option>Crohn's Disease</option>
                  <option>Other</option>
                </select>

                <select
                  name="consultationType"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-green-200 focus:border-green-600 focus:outline-none transition-colors text-gray-600 bg-white"
                >
                  <option value="">Consultation Type</option>
                  <option>In-Person Visit</option>
                  <option>Telemedicine (Video Call)</option>
                  <option>Phone Consultation</option>
                </select>

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    name="preferredDate"
                    type="date"
                    min={minDt.split('T')[0]}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-green-200 focus:border-green-600 focus:outline-none transition-colors bg-white"
                  />
                  <select
                    name="preferredTime"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-green-200 focus:border-green-600 focus:outline-none transition-colors text-gray-600 bg-white"
                  >
                    <option value="">Preferred Time</option>
                    <option>Morning (9AM-12PM)</option>
                    <option>Afternoon (12PM-4PM)</option>
                    <option>Evening (4PM-6PM)</option>
                  </select>
                </div>

                <textarea
                  name="message"
                  placeholder="Tell us about your symptoms, current medications, or any questions..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-green-200 focus:border-green-600 focus:outline-none transition-colors resize-none bg-white"
                />

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="hipaa"
                    name="hipaaConsent"
                    required
                    className="mt-1 w-4 h-4 text-green-600 border-green-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="hipaa" className="text-sm text-gray-600">
                    I consent to the collection and use of my health information for medical evaluation purposes, 
                    in accordance with HIPAA privacy regulations.
                  </label>
                </div>

                {/* Hidden fields */}
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                <input type="hidden" name="source" value="legalweeddoc.com/consultation" />
                <input type="hidden" name="timezone" value={tz} />

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60"
                >
                  {sending ? "Scheduling..." : "Schedule Consultation"}
                </button>

                {sent && <p className="text-green-600 text-sm font-semibold">Thank you! We'll contact you within 24 hours to confirm your appointment.</p>}
                {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Logo + Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold text-white">
                  Legal<span className="text-green-400">Weed</span>Doc
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md mb-6">
                Professional medical cannabis evaluations and compassionate patient care. 
                Helping patients access safe, legal, therapeutic cannabis treatments.
              </p>
              <div className="text-sm text-gray-500">
                <p>Licensed Medical Practice</p>
                <p>State Certified Cannabis Physician</p>
                <p>HIPAA Compliant • Fully Insured</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Services", "Conditions", "About", "Process", "Contact"].map((item) => {
                  const sectionId = item === "Contact" ? "contact-form" : item.toLowerCase();
                  return (
                    <li key={item}>
                      <button
                        onClick={() => scrollToSection(sectionId)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={() => scrollToSection('consultation')}
                    className="text-green-400 hover:text-green-300 transition-colors font-semibold"
                  >
                    Book Consultation →
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>3870 Convention St</li>
                <li>Baton Rouge, LA, 70806</li>
                <li className="text-green-400 font-semibold">(225) 387-7858</li>
                <li>rbnaksmedical@yahoo.com</li>
                <li className="mt-4">
                  <span className="font-semibold text-white">Office Hours:</span><br />
                  Mon-Fri: 9AM-6PM<br />
                  Sat: 9AM-2PM
                </li>
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Patient Resources</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Qualifying Conditions</li>
                  <li>Treatment Guidelines</li>
                  <li>Dosage Information</li>
                  <li>Safety Protocols</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Education</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Cannabis Basics</li>
                  <li>Medical Research</li>
                  <li>Strain Information</li>
                  <li>FAQ</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal Information</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Louisiana Cannabis Laws</li>
                  <li>Patient Rights</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>&copy; 2025 Legal Weed Doc. All rights reserved. | Licensed Lousiana Medical Practice</p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Medical Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalWeedDocWebsite;