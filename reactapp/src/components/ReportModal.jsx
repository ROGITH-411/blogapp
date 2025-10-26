import React, { useState } from 'react'
import api from '../api/axiosClient'

const ReportModal = ({ blogId, isOpen, onClose }) => {
  const [report, setReport] = useState({ reporter: '', reason: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const submitReport = async (e) => {
    e.preventDefault()
    if (!report.reporter.trim() || !report.reason.trim()) return

    setSubmitting(true)
    try {
      await api.post(`/api/reports/blog/${blogId}`, report)
      setSuccess(true)
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setReport({ reporter: '', reason: '' })
      }, 2000)
    } catch (err) {
      console.error('Failed to submit report:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-purple-500/20 rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Report Post</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Report Submitted</h4>
            <p className="text-gray-400">Thank you for helping keep our community safe.</p>
          </div>
        ) : (
          <form onSubmit={submitReport} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Your Name</label>
              <input
                type="text"
                value={report.reporter}
                onChange={(e) => setReport({...report, reporter: e.target.value})}
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Reason for Report</label>
              <textarea
                value={report.reason}
                onChange={(e) => setReport({...report, reason: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Please describe why you're reporting this post..."
              />
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ReportModal