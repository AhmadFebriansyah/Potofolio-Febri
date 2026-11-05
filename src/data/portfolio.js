// ======================================================
//  SEMUA ISI PORTOFOLIO ADA DI FILE INI — GANTI SESUAI DATA ANDA
//  (dipakai oleh tampilan React dan chatbot di /api/chat.js)
// ======================================================

export const profile = {
  brand: 'Febri.',
  name: 'Ahmad Febriansyah',
  nickname: 'Febri',
  role: 'Fullstack Web Developer',
  roles: ['Fullstack Web Developer', 'System Developer Senior Staff', 'Data Warehouse Engineer'],
  intro:
    'Saya memiliki ketertarikan untuk menciptakan sesuatu yang memiliki nilai dan manfaat. Bagi saya, kepuasan terbesar bukan hanya ketika berhasil membangun sebuah aplikasi, tetapi juga ketika aplikasi tersebut dapat membantu dan memberikan solusi bagi orang lain.',
  photo: '/Foto_diri.jpeg', // ganti dengan foto Anda di folder public, mis. /profile.jpg
  cv: '/cv.pdf', // taruh file CV Anda di public/cv.pdf
  location: 'Jakarta Timur, Indonesia',
  // Area untuk peta di bagian Contact (sengaja area kelurahan, bukan titik rumah)
  map: {
    label: 'Penggilingan',
    query: 'Penggilingan, Cakung, Jakarta Timur',
    url: 'https://www.google.com/maps/search/?api=1&query=Penggilingan%2C+Cakung%2C+Jakarta+Timur',
  },
  email: 'ahmadfebriansyah662@gmail.com',
  whatsapp: '6281298068846', // format internasional tanpa +
  highlights: [
    { value: '4+', label: 'Tahun Pengalaman' },
    { value: 'PHP, JS', label: 'Bahasa Utama' },
    { value: '10+', label: 'Proyek Selesai' },
  ],
}

export const socials = [
  { icon: 'github', label: 'GitHub', handle: '@AhmadFebriansyah', url: 'https://github.com/AhmadFebriansyah' },
  { icon: 'linkedin', label: 'LinkedIn', handle: 'Ahmad Febriansyah', url: 'https://www.linkedin.com/in/ahmad-febriansyah/' },
  { icon: 'instagram', label: 'Instagram', handle: '@febry_7788', url: 'https://www.instagram.com/febry_7788/' },
  { icon: 'tiktok', label: 'TikTok', handle: '@programmerpemula17', url: 'https://tiktok.com/@programmerpemula17' },
]

export const about = {
  whoAmI:
    'Saya Full Stack Developer yang berpengalaman selama 4 tahun lebih membangun aplikasi internal perusahaan. Saya juga berpengalaman sebagai Data Warehouse & ETL menggunakan Apache NiFi dan Apache NiFi Registry.',
  approach:
    'Saya percaya kode yang baik adalah kode yang mudah dibaca dan dirawat. Saya mengutamakan performa, struktur yang jelas, dan pengalaman pengguna yang nyaman serta mengerti menggunakan aplikasinya.',
  details: [
    { label: 'Nama', value: 'Ahmad Febriansyah' },
    { label: 'Domisili', value: 'Jakarta, Indonesia' },
    { label: 'Email', value: 'ahmadfebriansyah662@gmail.com' },
    { label: 'Umur', value: '25 Tahun' },
    { label: 'University', value: 'Politeknik STMI Jakarta' },
    { label: 'GPA', value: '3.60' },
  ],
}

export const experiences = [
  {
    role: 'System Developer Senior Staff',
    company: 'PT Forisa Nusapersada',
    period: 'Feb 2023 — Sekarang',
    description: 'Mengembangkan aplikasi web internal perusahaan untuk mendukung kebutuhan operasional dan pengolahan data. Berkolaborasi dengan tim Data Analyst Sales dalam pengembangan dan penyediaan laporan (reporting), serta membangun Data Warehouse untuk mengintegrasikan dan mengelola data Sales dan BOSNET guna mendukung kebutuhan analisis dan pengambilan keputusan bisnis.',
    tech: ['React JS', 'Node.js', 'Laravel', 'PHP', 'JavaScript', 'Sql Server', 'PostgreSQL', 'Maria DB', 'AzureSQL', 'SSRS', 'Jasper Report', 'Apache NiFi', 'NiFi Registry', 'Visual Studio', 'VS Code', 'Restful API', 'Git'],
  },
  {
    role: 'Magang Web Developer',
    company: 'PT Gemala Kempa Daya',
    period: 'Oct 2021 — Apr 2023',
    description: 'Mendukung transformasi digital perusahaan dengan mengembangkan aplikasi web untuk mengoptimalkan proses operasional dan memenuhi kebutuhan bisnis di berbagai lini perusahaan.',
    tech: ['Laravel', 'PHP', 'Javascript', 'Jquery', 'Oracle', 'PostgreSQL', 'SVN'],
  }
]

export const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'React.js', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'HTML5', icon: 'html' },
      { name: 'CSS3', icon: 'css' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: 'node' },
      { name: 'Express.js', icon: 'express' },
      { name: 'PHP', icon: 'php' },
      { name: 'REST API', icon: 'api' },
      { name: 'JWT Auth', icon: 'jwt' },
    ],
  },
  {
    category: 'Database & ORM',
    items: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgres' },
      { name: 'MariaDB', icon: 'maria' },
      { name: 'SQL Server', icon: 'sqlserver' },
      { name: 'AzureSQL', icon: 'azuresql' },
      { name: 'Oracle', icon: 'oracle' },
      { name: 'Neon', icon: 'neon' },
    ],
  },
  {
    category: 'Tools & Infra',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Linux', icon: 'linux' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Postman', icon: 'postman' },
      { name: 'Svn', icon: 'svn' },
    ],
  },
]

export const projects = [
  {
    title: 'Ryze Sport',
    description: 'Website e-commerce yang dikembangkan menggunakan pendekatan pengembangan berbantuan AI Vibe Coding dengan Claude AI. Website ini memiliki berbagai fitur, termasuk katalog produk, pencarian dan filter produk, detail produk, keranjang belanja, serta pengelolaan pesanan.',
    image: '/projects/ryze.png',
    tech: ['React', 'Node JS', 'Vercel', 'PostgreSQL', 'Neon', 'Claude', 'Express JS'],
    demo: 'https://ryzesport.vercel.app',
    repo: 'https://github.com/AhmadFebriansyah/ryzesport.git',
  },
  {
    title: 'Website Portofolio',
    description: 'Website Portofolio.',
    image: '/portofolio.png',
    tech: ['React', 'Node JS', 'Vercel'],
    demo: 'https://potofolio-febri.vercel.app/',
    repo: 'https://github.com/AhmadFebriansyah/Potofolio-Febri.git',
  },
  {
    title: 'Chatbot Personal Trainer',
    description: 'Chatbot personal trainer (AI) yang menyediakan panduan latihan fisik dan saran kebugaran yang dipersonalisasi melalui teknologi Gemini AI',
    image: '/projects/pt.png',
    tech: ['Node JS', 'Express JS', 'Gemini API', 'Antigravity', 'Gemini', 'Vercel'],
    demo: 'https://personal-trainer-eta-six.vercel.app/',
    repo: 'https://github.com/AhmadFebriansyah/PersonalTrainer.git',
  },
  {
    title: 'Web Based Point of Sales (POS)',
    description: 'Aplikasi web internal untuk mengelola data penjualan, transaksi, dan inventaris secara real-time di berbagai outlet, dilengkapi dengan dashboard pemantauan langsung untuk mendukung operasional acara PRJ, SIAL Interfood, PopIce X JKT48, dan Pestapora 2026.',
    image: '/projects/POS/pos_forisa.png',
    tech: ['Laravel', 'PHP', 'JavaScript', 'Jquery', 'Maria DB', 'HTML', 'CSS'],
    pdf: '/projects/pdf/pos.pdf', // jika diisi: kartu bisa diklik untuk melihat PDF
  },
  {
    title: 'Database Migration with Apache NiFi',
    description: 'Merancang dan mengimplementasikan proses migrasi database dari Azure SQL dan SQL Server ke PostgreSQL untuk membangun platform data terpusat, sehingga tim Sales Analytics dapat melakukan query, analisis, dan pengolahan data secara lebih efisien.',
    image: '/projects/migrasi.png',
    tech: ['Apache NiFi', 'NiFi Registry', 'Linux', 'Azure SQL', 'SQL Server', 'PostgreSQL'],
    pdf: '/projects/pdf/Migrasi Database.pdf',
  },
  {
    title: 'Dashboard NPL',
    description: 'Mengembangkan dashboard eksekutif untuk jajaran Direksi (BOD) guna memantau pengembangan produk baru, linimasa proyek, jadwal cuti dan perjalanan dinas para manajer, serta agenda rapat yang akan datang.',
    image: '/projects/NPL/npl2.png',
    tech: ['Laravel', 'PHP', 'JavaScript', 'Jquery', 'Sql Server', 'HTML', 'CSS'],
    pdf: '/projects/pdf/NPL.pdf',
  },
  {
    title: 'Program Commitment Marketing',
    description: 'Mengembangkan Program Commitment Marketing, yaitu sistem diskon bertingkat yang memberikan potongan harga lebih besar kepada distributor berdasarkan volume pembelian, sesuai dengan ketentuan dan aturan bisnis yang telah ditetapkan.',
    image: '/images/komitmen.png',
    tech: ['Laravel', 'PHP', 'JavaScript', 'Jquery', 'Sql Server', 'HTML', 'CSS', 'Sql Server Reporting Services'],
    pdf: '/projects/pdf/Komitmen.pdf',
  },
]

// pdf (opsional): jika diisi, kartu bisa diklik untuk melihat sertifikat
export const certificates = [
  {
    title: 'Foundations of Coding Full-Stack',
    issuer: 'Microsoft · Coursera',
    date: 'Apr 2026',
    image: '/projects/Certificates/foundation.png',
    pdf: '/projects/Certificates/Coursera_Foundation.pdf',
  },
  {
    title: 'Introduction to Programming With C#',
    issuer: 'Microsoft · Coursera',
    date: 'Mei 2026',
    image: '/projects/Certificates/introduction.png',
    pdf: '/projects/Certificates/Coursera_Intruduction_Programming.pdf',
  },
  {
    title: 'Belajar Dasar-Dasar DevOps',
    issuer: 'Dicoding Academy',
    date: 'Sep 2023',
    image: '/projects/Certificates/devops.png',
    pdf: '/projects/Certificates/sertifikat_course_382_1022906_180923105414.pdf',
  },
]

export const githubUrl = 'https://github.com/AhmadFebriansyah'
