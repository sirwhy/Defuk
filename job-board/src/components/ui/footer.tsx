import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xl font-bold text-white">JobBoard</span>
            </Link>
            <p className="text-gray-400">
              Find your dream job with thousands of opportunities from top companies.
            </p>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li><Link href="/jobs" className="text-gray-400 hover:text-white">Browse Jobs</Link></li>
              <li><Link href="/jobs/create" className="text-gray-400 hover:text-white">Post Resume</Link></li>
              <li><Link href="/jobs/alerts" className="text-gray-400 hover:text-white">Job Alerts</Link></li>
              <li><Link href="/career-advice" className="text-gray-400 hover:text-white">Career Advice</Link></li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li><Link href="/jobs/create" className="text-gray-400 hover:text-white">Post a Job</Link></li>
              <li><Link href="/employer/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link href="/employer/solutions" className="text-gray-400 hover:text-white">Solutions</Link></li>
              <li><Link href="/employer/resources" className="text-gray-400 hover:text-white">Resources</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} JobBoard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
