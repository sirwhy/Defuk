# JobBoard - Job Listing Platform

Modern job board website built with Next.js 14, TypeScript, and Tailwind CSS.

**Status:** ✅ Production Ready  
**Deploy:** Ready for Vercel

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📁 Features

- ✅ Browse jobs with search & filters
- ✅ Job detail pages with apply form
- ✅ Employer job posting
- ✅ User authentication (NextAuth.js)
- ✅ Responsive design
- ✅ PostgreSQL/SQLite support

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 + TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL/SQLite (Prisma ORM)
- **Auth:** NextAuth.js
- **Deployment:** Vercel

---

## 🗄️ Database Setup

### SQLite (Development)
```env
DATABASE_URL="file:./dev.db"
```

### PostgreSQL (Production)
```env
DATABASE_URL="postgresql://user:password@host:5432/db"
```

---

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

```bash
vercel --prod
```

---

## 📝 Environment Variables

```env
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
DATABASE_URL=postgresql://user:password@host:5432/db
NEXTAUTH_URL=http://localhost:3000
```

---

## 📊 Pages

- `/` - Home page
- `/jobs` - Browse jobs
- `/jobs/[id]` - Job details
- `/jobs/create` - Post job
- `/login` - Sign in
- `/register` - Sign up

---

## 📄 License

MIT License
