import { NextRequest, NextResponse } from 'next/server';

// Mock jobs data (replace with database later)
let jobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Corp Inc.',
    description: 'We are looking for an experienced Frontend Developer to join our team.',
    location: 'Remote',
    type: 'Full-time',
    salaryMin: 120000,
    salaryMax: 150000,
    postedAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Design Studio',
    description: 'Join our design team to create beautiful user experiences.',
    location: 'New York, NY',
    type: 'Full-time',
    salaryMin: 90000,
    salaryMax: 130000,
    postedAt: new Date().toISOString(),
    isActive: true,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    jobs,
    count: jobs.length,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const newJob = {
    id: Date.now().toString(),
    ...body,
    postedAt: new Date().toISOString(),
    isActive: true,
  };

  jobs = [...jobs, newJob];

  return NextResponse.json({
    success: true,
    job: newJob,
    message: 'Job posted successfully',
  });
}
