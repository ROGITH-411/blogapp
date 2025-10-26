import React, { useState } from 'react'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-current mb-6">
            Contact <span className="text-green-600 dark:text-red-500">Us</span>
          </h1>
          <p className="text-xl text-current opacity-80 max-w-2xl mx-auto">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-current mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 dark:bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-current mb-1">Email</h3>
                  <p className="text-current opacity-70">hello@inkflow.com</p>
                  <p className="text-current opacity-70">support@inkflow.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 dark:bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-current mb-1">Address</h3>
                  <p className="text-current opacity-70">123 Creative Street</p>
                  <p className="text-current opacity-70">Innovation District, Tech City 12345</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 dark:bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-current mb-1">Phone</h3>
                  <p className="text-current opacity-70">+1 (555) 123-4567</p>
                  <p className="text-current opacity-70">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-transparent border-2 border-current/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-current mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-current font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border-2 border-current/30 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500 focus:border-current transition-all text-current placeholder-current/50"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-current font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border-2 border-current/30 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500 focus:border-current transition-all text-current placeholder-current/50"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-current font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border-2 border-current/30 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500 focus:border-current transition-all text-current placeholder-current/50"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-current font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-transparent border-2 border-current/30 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500 focus:border-current transition-all text-current placeholder-current/50 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-transparent border-2 border-current text-current px-6 py-3 rounded-full font-semibold hover:bg-green-500/20 dark:hover:bg-red-500/20 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(0,0,0,0.6)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}