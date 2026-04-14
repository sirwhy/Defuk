'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    type: 'Full-time',
    salaryMin: '',
    salaryMax: '',
    experienceLevel: 'Mid-level',
    skills: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Job posted successfully!');
        router.push('/jobs');
      }
    } catch (error) {
      alert('Error posting job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-3xl">
        <div className="mb-8">
          <Link href="/jobs" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Jobs
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Job</h1>
          <p className="text-gray-600">
            Fill in the details below to create your job listing
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-6">
          {/* Job Title */}
          <div>
            <label className="label">Job Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input"
              placeholder="e.g., Senior Software Engineer"
            />
          </div>

          {/* Company */}
          <div>
            <label className="label">Company Name *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="input"
              placeholder="Your company name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="label">Job Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input h-48 resize-none"
              placeholder="Describe the role, responsibilities, requirements, and benefits..."
            />
          </div>

          {/* Location & Type */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input"
                placeholder="e.g., New York, NY or Remote"
              />
            </div>
            <div>
              <label className="label">Job Type *</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="input"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          {/* Salary Range */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Minimum Salary</label>
              <input
                type="number"
                value={formData.salaryMin}
                onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                className="input"
                placeholder="e.g., 80000"
              />
            </div>
            <div>
              <label className="label">Maximum Salary</label>
              <input
                type="number"
                value={formData.salaryMax}
                onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                className="input"
                placeholder="e.g., 120000"
              />
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="label">Experience Level *</label>
            <select
              required
              value={formData.experienceLevel}
              onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
              className="input"
            >
              <option value="Entry-level">Entry-level</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
              <option value="Executive">Executive</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="label">Required Skills (comma separated)</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="input"
              placeholder="React, TypeScript, Node.js, etc."
            />
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? 'Posting...' : 'Post Job - Free'}
            </button>
            <Link href="/jobs" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Fast Posting</h3>
            <p className="text-sm text-gray-600">Post your job in under 2 minutes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Quality Candidates</h3>
            <p className="text-sm text-gray-600">Reach qualified professionals</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Free to Post</h3>
            <p className="text-sm text-gray-600">No hidden fees or charges</p>
          </div>
        </div>
      </div>
    </div>
  );
}
