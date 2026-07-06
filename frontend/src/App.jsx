import React, { useState } from 'react';
import { Calendar, MessageSquare, CheckCircle, Send } from 'lucide-react';

/* change */  import profilepic from './assets/profilepic.jpg';

export default function App() {
  // Static Projects Data
  const projects = [
    {
      title: "Simple Temperature Converter",
      description: "A Simple and Fast Temperature Converter system built using Python, Flask and HTML",
      tags: ["Flask", "Python", "HTML"]
    },
    {
      title: "Personal Expense Tracker & Budgeter",
      description: "A clean dashboard to log your daily spending, categorize expenses, and see where your money goes. It uses straightforward CRUD logic. ",
      tags: ["MongoDB", "Tailwind CSS", "Express", "Node", "React"]
    },
    {
      title: "Simple QR Code Generator",
      description: "A sleek, lightweight MERN stack web application that allows users to instantly convert URLs, text, or Wi-Fi credentials into downloadable QR codes.",
      tags: ["Flask", "Python", "HTML"]
    },
  ];

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    requestType: 'project', // 'project' or 'callback'
    callbackTime: ''
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      // Using relative path to match Vercel/Local monolithic execution
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (data.success) {
        setStatus({ loading: false, success: "Form submitted successfully! ✅", error: null });
        setFormData({ name: '', email: '', description: '', requestType: 'project', callbackTime: '' });
      } else {
        throw new Error(data.error || "Submission failed");
      }
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.message });
    }
  };

  return (
    
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-900">
      
      {/* Navbar */}
     {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo and Company Name Group */}
          <a href="#" className="flex items-center gap-3 group">
           
            <img 
              src="Logo.png" 
              alt="Company Logo" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-305"
            />
            
            {/* Company Name */}
            <span className="text-xl font-bold tracking-wider text-slate-100 group-hover:text-teal-400 transition-colors">
              Invictus Technologies 
            </span>
          </a>

          {/* Navigation Links */}
          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <a href="#projects" className="hover:text-teal-400 transition">Projects</a>
            <a href="#contact" className="hover:text-teal-400 transition">Contact & Callbacks</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}


      
      <header className="max-w-5xl mx-auto px-6 py-20 text-center md:text-left md:flex md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Shubham Badekar</span> 
          </h1>
          <p className="mt-4 text-slate-400 text-lg leading-relaxed">
            I build scalable web applications, robust backends, and seamless user experiences. Let's build something exceptional together.
          </p>
          
          {/* Social Links */}
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <a href="https://github.com/shubham3123" target="_blank" rel="noreferrer" 
               className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-lg font-medium transition border border-slate-700">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/shubham-badekar-90488a1b2/" target="_blank" rel="noreferrer"
               className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-slate-950 px-5 py-2.5 rounded-lg font-semibold transition">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-16 border-t border-slate-800">
        <h2 className="text-2xl font-bold text-teal-400 mb-8">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-slate-800/50 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition">
              <h3 className="text-xl font-bold text-slate-100">{project.title}</h3>
              <p className="mt-2 text-slate-400 text-sm leading-relaxed">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="bg-slate-900 text-teal-400 text-xs px-2.5 py-1 rounded border border-teal-900/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Dynamic Form Section */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-16 border-t border-slate-800 mb-12">
        <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-100">Let's Work Together</h2>
          <p className="text-slate-400 text-sm mt-1 mb-6">Submit a project overview or request an immediate callback.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Toggle Request Type */}
            <div className="grid grid-cols-2 gap-3 p-1 bg-slate-900 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, requestType: 'project' })}
                className={`flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition ${formData.requestType === 'project' ? 'bg-teal-600 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <MessageSquare size={16} /> Project Request
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, requestType: 'callback' })}
                className={`flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition ${formData.requestType === 'callback' ? 'bg-teal-600 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Calendar size={16} /> Schedule Callback
              </button>
            </div>

            {/* General Inputs */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                <input 
                  type="text" required value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-teal-500 text-slate-100 text-sm transition"
                  placeholder="Please Enter Your Name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" required value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-teal-500 text-slate-100 text-sm transition"
                  placeholder="Please Enter Your Email Address"
                />
              </div>
            </div>

            {/* Conditional Callback Scheduling Field */}
            {formData.requestType === 'callback' && (
              <div className="animate-fadeIn">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Preferred Date & Time</label>
                <input 
                  type="datetime-local" required
                  value={formData.callbackTime}
                  onChange={(e) => setFormData({...formData, callbackTime: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-teal-500 text-slate-100 text-sm transition text-slate-400"
                />
              </div>
            )}

            {/* Description Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {formData.requestType === 'project' ? 'Project Description & Details' : 'Briefly mention the agenda for the call'}
              </label>
              <textarea 
                rows="4" required value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-teal-500 text-slate-100 text-sm transition resize-none"
                placeholder={formData.requestType === 'project' ? "Tell me about your product requirements, stack, timeline..." : "I'd love to talk about a full-time role / project consulting."}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit" disabled={status.loading}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {status.loading ? "Submitting..." : (
                <> <Send size={16} /> {formData.requestType === 'project' ? "Send Request" : "Schedule Call"} </>
              )}
            </button>

            {/* Status Messages */}
            {status.success && (
              <div className="p-4 bg-emerald-950/50 border border-emerald-800 text-emerald-400 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle size={16} /> {status.success}
              </div>
            )}
            {status.error && (
              <div className="p-4 bg-rose-950/50 border border-rose-800 text-rose-400 rounded-lg text-sm">
                ❌ {status.error}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}