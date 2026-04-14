'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;

  const [coverLetter, setCoverLetter] = useState('');

  // Mock job data
  const job = {
    id: jobId,
    title: 'Senior Frontend Developer',
    company: 'Tech Corp Inc.',
    description: `We are looking for an experienced Senior Frontend Developer to join our growing team. 
    In this role, you will be responsible for building and maintaining our web applications using 
    modern technologies.

    Responsibilities:
    - Build responsive and performant user interfaces
    - Collaborate with designers and backend developers
    - Write clean, maintainable code
    - Participate in code reviews
    - Mentor junior developers

    Requirements:
    - 5+ years of experience with React
    - Strong proficiency in TypeScript
    - Experience with modern CSS frameworks
    - Knowledge of state management (Redux, Zustand)
    - Understanding of web performance optimization
    - Excellent problem-solving skills

    Benefits:
    - Competitive salary
    - Health, dental, and vision insurance
    - 401(k) matching
    - Flexible PTO
    - Remote work options
    - Professional development budget`,
    location: 'Remote',
    type: 'Full-time',
    salaryMin: 120000,
    salaryMax: 150000,
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    experienceLevel: 'Senior',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux'],
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Application submitted! We will contact you soon.');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link href="/jobs" className="text-blue-600 hover:underline">
            ← Back to Jobs
          </Link>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="card mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{job.company}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {job.type}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="card mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">{job.description}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="card mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span key={skill} className="badge badge-primary">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Apply Form */}
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Apply for this Job</h2>
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="label">Email *</label>
                  <input
                    type="email"
                    required
                    className="input"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input
                    type="tel"
                    className="input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="label">Cover Letter *</label>
                  <textarea
                    required
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="input h-32 resize-none"
                    placeholder="Tell us why you're a great fit..."
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Submit Application
                </button>
              </form>
            </div>

            {/* Company Info */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About {job.company}</h3>
              <p className="text-gray-600 text-sm">
                Leading technology company focused on innovative solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
