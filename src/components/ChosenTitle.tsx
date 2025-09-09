import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Shield, ClipboardCheck, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter, ArrowRight, Check, Star, Users, TrendingUp, Award, Calendar, DollarSign, FileText, Clock, Building, Search, CheckCircle, AlertCircle, Gavel, Zap, BarChart3, HandshakeIcon, Briefcase, UserCheck, FileSearch, Smartphone, Globe, Headphones } from 'lucide-react';
import { SiTiktok, SiLinkedin } from 'react-icons/si';
import ChosenTitle from "../img/chosenTitle.png"

const FORM_ENDPOINT = "https://formspree.io/f/mwpnyekj";

const ChosenTitleWebsite = () => {
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
  const [selectedPartnerType, setSelectedPartnerType] = useState('lenders');
  
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

  const heroImages = [
    {
      gradient: 'from-blue-900 via-blue-800 to-indigo-900',
      title: 'Real Estate Title Services',
      subtitle: 'Secure Transactions'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const testimonials = [
    {
      name: "Sarah Martinez",
      role: "Senior Loan Officer",
      company: "First National Mortgage",
      text: "Chosen Title has streamlined our closing process significantly. Their 24-hour turnaround on title commitments keeps our deals moving.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Managing Broker",
      company: "Premier Realty Group",
      text: "The partner portal is a game-changer. I can track all my transactions in real-time and my clients love the transparency.",
      rating: 5
    },
    {
      name: "David Thompson",
      role: "Real Estate Attorney",
      company: "Thompson & Associates",
      text: "Their attention to detail and proactive issue resolution has made them our go-to title partner for complex commercial transactions.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const partnerBenefits: any = {
    lenders: {
      title: "For Lenders",
      icon: <Building className="w-8 h-8" />,
      benefits: [
        { title: "24-Hour Title Commitments", desc: "Fast turnaround to keep loans on schedule" },
        { title: "Dedicated Underwriting", desc: "Direct access to underwriters for complex issues" },
        { title: "Compliance Support", desc: "TRID compliant processes and documentation" },
        { title: "Volume Discounts", desc: "Competitive pricing for portfolio clients" },
        { title: "Integration Ready", desc: "API connectivity with major LOS platforms" },
        { title: "Priority Processing", desc: "Expedited service for time-sensitive closings" }
      ]
    },
    brokers: {
      title: "For Brokers",
      icon: <Briefcase className="w-8 h-8" />,
      benefits: [
        { title: "Commission Protection", desc: "Secure handling of commission disbursements" },
        { title: "Marketing Co-op", desc: "Joint marketing opportunities and materials" },
        { title: "Client Portal Access", desc: "Branded portal for your clients" },
        { title: "Referral Rewards", desc: "Competitive referral program with tracking" },
        { title: "Educational Resources", desc: "CE courses and market updates" },
        { title: "Mobile App", desc: "Track transactions on the go" }
      ]
    },
    realtors: {
      title: "For Realtors",
      icon: <Home className="w-8 h-8" />,
      benefits: [
        { title: "Real-Time Updates", desc: "Instant notifications on transaction progress" },
        { title: "After-Hours Support", desc: "Evening and weekend availability" },
        { title: "Seller Net Sheets", desc: "Quick estimates for listing presentations" },
        { title: "Pre-Listing Reports", desc: "Title reports before listing" },
        { title: "Client Communication", desc: "Automated updates keep clients informed" },
        { title: "Closing Gifts", desc: "Professional closing gifts for your clients" }
      ]
    }
  };

  const services = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Title Insurance',
      description: 'Comprehensive title insurance policies protecting buyers and lenders from potential ownership disputes and title defects.',
      features: ['Owner\'s Title Insurance', 'Lender\'s Title Insurance', 'Enhanced Coverage'],
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Title Searches',
      description: 'Thorough examination of public records to verify clear title and identify any liens, encumbrances, or title issues.',
      features: ['Property History Research', 'Lien Verification', 'Chain of Title Analysis'],
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: <Gavel className="w-8 h-8" />,
      title: 'Closing Services',
      description: 'Full-service closing coordination ensuring smooth real estate transactions from contract to deed recording.',
      features: ['Document Preparation', 'Escrow Services', 'Wire Transfer Coordination'],
      color: 'from-blue-600 to-indigo-700'
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: 'Commercial Services',
      description: 'Specialized title services for commercial real estate transactions, including complex multi-party deals.',
      features: ['Commercial Title Insurance', 'Multi-Property Transactions', '1031 Exchange Support'],
      color: 'from-yellow-500 to-amber-600'
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg">
        {/* Flex container: left = logo/text, right = nav links */}
        <div className="flex justify-between items-center h-20">

          {/* Logo + Text (Left) */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <img
              src={ChosenTitle}
              alt="Chosen Title Logo"
              className="h-30 w-auto object-contain"
            />
            <span className="text-3xl font-serif text-black tracking-tight">
              Chosen Title
            </span>
          </div>

          {/* Desktop Nav Links (Right) */}
          <div className="hidden md:flex items-center space-x-8">
            {['Services', 'Partners', 'About', 'Process', 'Contact'].map((item) => {
              const sectionId = item === 'Contact' ? 'contact-form' : item.toLowerCase();
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(sectionId)}
                  className="font-medium transition-colors duration-200 hover:text-yellow-500 relative group text-gray-700"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full"></span>
                </button>
              );
            })}

            {/* Partner Portal CTA */}
            <button
              onClick={() => scrollToSection('partner-portal')}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Partner Portal
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
            {['Home', 'Services', 'Partners', 'About', 'Process', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('partner-portal')}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold mt-4"
            >
              Partner Portal
            </button>
          </div>
        </div>
      )}
    </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
          
          {/* Animated Gradient Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
          
          {/* Grid Pattern Overlay */}

          
          {/* Subtle House Silhouettes */}
          <div className="absolute bottom-0 left-0 right-0 h-64 opacity-10">
            <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="rgba(255,255,255,0.1)" d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,186.7C960,181,1056,171,1152,181.3C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
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
    <div className="mb-2 flex justify-center gap-4">
      <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
        Trusted by 500+ Real Estate Professionals
      </span>
    </div>

    <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
      Your Partner in
      <span className="block mt-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent animate-gradient-x">
        Title Excellence
      </span>
    </h1>
            <p className="text-xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Empowering lenders, brokers, and realtors with fast, reliable title services. 
              24-hour commitments, real-time tracking, and dedicated support for every transaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => scrollToSection('partner-portal')}
                className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <HandshakeIcon className="w-5 h-5" />
                Become a Partner
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('contact-form')}
                className="px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Clock className="w-5 h-5" />
                Get Quick Quote
              </button>
            </div>

            {/* Trust Indicators with glass effect */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: '24-48hr', sublabel: 'Turnaround', icon: <Zap className="w-6 h-6" /> },
                { label: '99.9%', sublabel: 'Accuracy', icon: <CheckCircle className="w-6 h-6" /> },
                { label: '10,000+', sublabel: 'Closings', icon: <Award className="w-6 h-6" /> },
                { label: '4.9★', sublabel: 'Partner Rating', icon: <Star className="w-6 h-6" /> }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="flex justify-center mb-2 text-yellow-400">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white">{stat.label}</div>
                  <div className="text-sm text-white/70">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section - NEW */}
      <section id="partners" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Built for Real Estate Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Specialized solutions and dedicated support for lenders, brokers, and realtors. 
              Join our network of successful partners.
            </p>
          </div>

          {/* Partner Type Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full shadow-lg p-2 flex gap-2">
              {Object.keys(partnerBenefits).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedPartnerType(type)}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedPartnerType === type
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {partnerBenefits[type].title}
                </button>
              ))}
            </div>
          </div>

          {/* Partner Benefits Display */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {partnerBenefits[selectedPartnerType].benefits.map((benefit: any, index: any) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                  visibleSections.has('partners') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Partner Portal Preview */}
          <div id="partner-portal" className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl md:rounded-3xl p-6 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Partner Portal</h3>
                <p className="text-lg md:text-xl mb-6 md:mb-8 text-blue-100">
                  Access your dedicated dashboard with real-time transaction tracking, 
                  document management, and instant communication tools.
                </p>
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {[
                    'Track all transactions in one place',
                    'Upload and manage documents securely',
                    'Get instant status updates',
                    'Access marketing resources',
                    'View commission statements',
                    'Generate reports and analytics'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 flex-shrink-0" />
                      <span className="text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full md:w-auto bg-yellow-400 text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-yellow-300 transition-colors text-sm md:text-base">
                  Request Portal Access
                </button>
              </div>
              <div className="relative mt-8 md:mt-0">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-8 border border-white/20">
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <div className="text-base md:text-lg font-semibold truncate">Welcome Back</div>
                      <div className="text-xs md:text-sm text-blue-200 truncate">sarah.martinez@firstnational.com</div>
                    </div>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <div className="bg-white/10 rounded-lg p-3 md:p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm md:text-base">Active Transactions</span>
                        <span className="text-xl md:text-2xl font-bold">12</span>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 md:p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm md:text-base">This Month's Closings</span>
                        <span className="text-xl md:text-2xl font-bold">28</span>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 md:p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm md:text-base">Documents Pending</span>
                        <span className="text-xl md:text-2xl font-bold">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Comprehensive Title Services
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Full-service title solutions with technology-driven efficiency and personalized support for every transaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
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
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
          </div>
        
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See what our partners say about working with Chosen Title
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
                <div className="text-blue-200">{testimonials[activeTestimonial].role}</div>
                <div className="text-blue-300">{testimonials[activeTestimonial].company}</div>
              </div>
            </div>

            {/* Testimonial Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-yellow-400 w-8' : 'bg-white/40'
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
              Streamlined Process
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From order to closing in record time. Our efficient process keeps your deals moving forward.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Order Placement',
                description: 'Submit orders instantly through our portal, API, or phone. Receive confirmation in minutes.',
                icon: <FileSearch className="w-8 h-8" />,
                color: 'from-blue-600 to-blue-700',
                time: '< 5 min'
              },
              {
                step: '02',
                title: 'Title Work',
                description: 'Our team conducts thorough searches and prepares commitments within 24-48 hours.',
                icon: <Search className="w-8 h-8" />,
                color: 'from-yellow-500 to-yellow-600',
                time: '24-48 hrs'
              },
              {
                step: '03',
                title: 'Closing',
                description: 'Seamless coordination with all parties. Documents ready, funds disbursed, deal closed.',
                icon: <CheckCircle className="w-8 h-8" />,
                color: 'from-green-600 to-green-700',
                time: 'On schedule'
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
                <div className="text-sm font-semibold text-blue-600 mb-4">{item.time}</div>
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
              <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8">
                Texas Title Experts Since 2010
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                With over a decade of experience and 10,000+ successful closings, we've built our reputation on reliability, speed, and exceptional service. Our team of licensed professionals combines deep local knowledge with cutting-edge technology.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">$2B+</h4>
                  <p className="text-gray-600">Transaction Volume</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">500+</h4>
                  <p className="text-gray-600">Partner Offices</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  'Stewart Title Underwriter',
                  'Licensed Texas Title Agent',
                  'ALTA Best Practices Certified',
                  'E&O Insurance Coverage',
                  'BBB A+ Rating'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0">
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
  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
    <UserCheck className="w-8 h-8 mb-4" />
    <h4 className="text-lg font-bold mb-2">Dedicated Teams</h4>
    <p className="text-sm opacity-90">Assigned account managers for each partner</p>
  </div>
  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white">
    <BarChart3 className="w-8 h-8 mb-4" />
    <h4 className="text-lg font-bold mb-2">Performance Metrics</h4>
    <p className="text-sm opacity-90">Real-time dashboards and reporting</p>
  </div>
  <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white">
    <Headphones className="w-8 h-8 mb-4" />
    <h4 className="text-lg font-bold mb-2">24/7 Support</h4>
    <p className="text-sm opacity-90">Always available when you need us</p>
  </div>
  <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
    <Award className="w-8 h-8 mb-4" />
    <h4 className="text-lg font-bold mb-2">Industry Awards</h4>
    <p className="text-sm opacity-90">Recognized for service excellence</p>
  </div>
</div>     
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - NEW */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '24hrs', label: 'Average Title Commitment' },
              { number: '99.9%', label: 'On-Time Closings' },
              { number: '4.9/5', label: 'Partner Satisfaction' },
              { number: '<2hrs', label: 'Support Response Time' }
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-yellow-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Ready to Streamline Your Closings?
          </h2>
          <p className="text-xl text-gray-800 mb-10 leading-relaxed max-w-3xl mx-auto">
            Join 500+ real estate professionals who trust Chosen Title for fast, accurate, and reliable title services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('contact-form')}
              className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Partnership Today
            </button>
            <button
              onClick={() => scrollToSection('partner-portal')}
              className="px-10 py-4 bg-transparent border-2 border-gray-900 text-gray-900 rounded-full font-bold text-lg hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              Request Demo
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're a lender, broker, or realtor, we're here to support your success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Multiple Ways to Reach Us</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Main Office</h4>
                    <p className="text-gray-600">8330 Lyndon B Johnson Fwy STE B360<br />Dallas, TX 75243</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Direct Lines</h4>
                    <p className="text-gray-600">
                      Main: (469) 466-1002
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">
                      General: terri@chosentitle.com<br />
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect on Social</h4>
                <div className="flex gap-4">
                  {[
                    { label: 'LinkedIn', href: '#', Icon: SiLinkedin },
                    { label: 'Facebook', href: '#', Icon: Facebook },
                    { label: 'Twitter', href: '#', Icon: Twitter },
                    { label: 'Instagram', href: '#', Icon: Instagram }
                  ].map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600/40"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div id="contact-form" className="scroll-mt-20 bg-gray-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Partnership Information</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                  />
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  placeholder="Business Email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                />

                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                />

                <input
                  name="company"
                  type="text"
                  placeholder="Company Name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                />

                <select
                  name="partnerType"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:outline-none transition-colors text-gray-600"
                >
                  <option value="">I am a...</option>
                  <option>Lender / Loan Officer</option>
                  <option>Real Estate Broker</option>
                  <option>Real Estate Agent</option>
                  <option>Attorney</option>
                  <option>Builder / Developer</option>
                  <option>Property Buyer</option>
                  <option>Other</option>
                </select>

                <select
                  name="monthlyVolume"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:outline-none transition-colors text-gray-600"
                >
                  <option value="">Monthly Transaction Volume</option>
                  <option>1-5 transactions</option>
                  <option>6-15 transactions</option>
                  <option>16-30 transactions</option>
                  <option>31+ transactions</option>
                </select>

                <textarea
                  name="message"
                  placeholder="Tell us about your needs or any specific questions..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                />

                {/* spam trap (honeypot) */}
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                {/* optional metadata */}
                <input type="hidden" name="source" value="chosentitle.com/partner-inquiry" />
                <input type="hidden" name="timezone" value={tz} />

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60"
                >
                  {sending ? "Sending..." : "Get Partnership Details"}
                </button>

                {sent && <p className="text-green-600 text-sm font-semibold">Thank you! A partnership specialist will contact you within 24 hours.</p>}
                {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Grid */}
          <div className="grid md:grid-cols-4 gap-12">
            
            {/* Logo + Description */}
            <div className="md:col-span-2 flex flex-col items-start -mt-22">
              <img
                src={ChosenTitle}
                alt="Chosen Title Logo"
                className="h-72 w-72 object-contain brightness-0 invert"
              />
              <p className="text-gray-400 leading-relaxed max-w-md -mt-15">
                Trusted by 500+ real estate professionals for fast, accurate title
                services and exceptional partnership support across Texas.
              </p>
            </div>


            {/* Quick Links */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                {["Services", "Partners", "About", "Process", "Contact"].map((item) => {
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
                    onClick={() => scrollToSection('partner-portal')}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold"
                  >
                    Partner Portal →
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-lg font-semibold">Get in Touch</h4>
              <ul className="space-y-2 text-gray-400">
                <li>8330 Lyndon B Johnson Fwy STE B360</li>
                <li>Dallas, TX 75243</li>
                <li className="text-yellow-400 font-semibold">(469) 466-1002</li>
                <li>terri@chosentitle.com</li>
              </ul>
            </div>
          </div>

          {/* Partner Resources */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Lender Resources</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Rate Sheets</li>
                  <li>Closing Cost Calculator</li>
                  <li>TRID Compliance Guide</li>
                  <li>API Documentation</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Realtor Resources</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Marketing Materials</li>
                  <li>Seller Net Sheets</li>
                  <li>Mobile App Download</li>
                  <li>Training Videos</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Knowledge Base</li>
                  <li>Partner Portal Login</li>
                  <li>Schedule Training</li>
                  <li>24/7 Helpdesk</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>&copy; 2025 Chosen Title Company. All rights reserved. | Licensed Texas Title Agent</p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">ALTA Best Practices</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChosenTitleWebsite;