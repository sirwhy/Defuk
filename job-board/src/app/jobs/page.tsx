'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  postedAt: string;
  isFeatured?: boolean;
}


const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Corp Inc.',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $150k',
    postedAt: '2 days ago',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Design Studio',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$90k - $130k',
    postedAt: '1 day ago',
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'StartupXYZ',
    location: 'San Francisco, CA',
    type: 'Remote',
    salary: '$130k - $170k',
    postedAt: '3 days ago',
    isFeatured: true,
  },
  {
    id: '4',
    title: 'Marketing Manager',
    company: 'Growth Co.',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$80k - $110k',
    postedAt: '5 hours ago',
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'AI Labs',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$140k - $180k',
    postedAt: '1 week ago',
  },
  {
    id: '6',
    title: 'UX Researcher',
    company: 'UserFirst',
    location: 'Remote',
    type: 'Contract',
    salary: '$70k - $100k',
    postedAt: '4 days ago',
  },
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('');

  const filteredJobs = sampleJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = typeFilter === '' || job.type === typeFilter;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600">
            {sampleJobs.length} jobs found
          </p>
        </div>

        {/* Search & Filter */}
        <div className="card mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="label">Search</label>
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="label">Location</label>
              <input
                type="text"
                placeholder="City, state, or remote"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="label">Job Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="input"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              {job.isFeatured && (
                <span className="badge badge-primary mb-3">Featured</span>
              )}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <Link href={`/jobs/${job.id}`} className="btn btn-outline text-sm">
                  View Details
                </Link>
              </div>
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
                  {job.salary}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {job.postedAt}
                </span>
              </div>
              <div className="flex gap-3">
                <Link href={`/jobs/${job.id}`} className="btn btn-primary">
                  Apply Now
                </Link>
                <button className="btn btn-secondary">
                  Save Job
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setLocationFilter('');
                setTypeFilter('');
              }}
              className="btn btn-outline mt-4"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
