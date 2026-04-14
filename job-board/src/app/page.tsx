import Link from 'next/link';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'JobBoard - Find Your Dream Job',
  description: 'Find the best job opportunities. Browse thousands of job listings from top companies.',
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Your Dream Job
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Browse thousands of job opportunities from top companies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs" className="btn bg-white text-blue-600 hover:bg-blue-50 text-lg px-8">
                Browse Jobs
              </Link>
              <Link href="/jobs/create" className="btn bg-blue-500 text-white hover:bg-blue-600 text-lg px-8 border-2 border-white">
                Post a Job - Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600 mt-2">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">5K+</div>
              <div className="text-gray-600 mt-2">Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600">50K+</div>
              <div className="text-gray-600 mt-2">Job Seekers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600">95%</div>
              <div className="text-gray-600 mt-2">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Get started in 3 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Create Profile</h3>
              <p className="text-gray-600">Sign up and create your professional profile with your skills and experience</p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Search & Apply</h3>
              <p className="text-gray-600">Browse thousands of jobs and apply with just one click</p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get Hired</h3>
              <p className="text-gray-600">Track your applications and land your dream job</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
              <p className="text-gray-600 mt-2">Top opportunities from trusted companies</p>
            </div>
            <Link href="/jobs" className="btn btn-outline">
              View All Jobs →
            </Link>
          </div>
          <div className="grid-responsive">
            <div className="job-card">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Senior Frontend Developer</h3>
                <span className="badge badge-primary">Full-time</span>
              </div>
              <p className="text-gray-600 mb-4">Tech Corp Inc. - Remote</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                $120k - $150k
              </div>
              <Link href="/jobs/1" className="btn btn-primary w-full">
                Apply Now
              </Link>
            </div>
            <div className="job-card">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Product Designer</h3>
                <span className="badge badge-primary">Full-time</span>
              </div>
              <p className="text-gray-600 mb-4">Design Studio - New York, NY</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                $90k - $130k
              </div>
              <Link href="/jobs/2" className="btn btn-primary w-full">
                Apply Now
              </Link>
            </div>
            <div className="job-card">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Backend Engineer</h3>
                <span className="badge badge-primary">Remote</span>
              </div>
              <p className="text-gray-600 mb-4">StartupXYZ - San Francisco, CA</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                $130k - $170k
              </div>
              <Link href="/jobs/3" className="btn btn-primary w-full">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Job Search?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of job seekers who found their dream job here
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs" className="btn bg-white text-blue-600 hover:bg-blue-50 text-lg px-8">
                Browse Jobs
              </Link>
              <Link href="/jobs/create" className="btn bg-blue-500 text-white hover:bg-blue-600 text-lg px-8">
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
