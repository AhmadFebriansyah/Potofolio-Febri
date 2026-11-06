import {
  FaReact, FaNodeJs, FaGitAlt, FaGithub, FaDocker, FaLinux, FaHtml5, FaCss3Alt,
  FaLinkedin, FaInstagram, FaTiktok, FaWhatsapp, FaEnvelope,
} from 'react-icons/fa'
import {
  SiNextdotjs, SiTailwindcss, SiFramer, SiExpress, SiMysql, SiPostgresql,
  SiMongodb, SiPrisma, SiVercel, SiPostman, SiJsonwebtokens,
  SiPhp, SiMariadb, SiNeon, SiSubversion, SiLaravel, SiJquery, SiApachenifi,
} from 'react-icons/si'
import { DiMsqlServer } from 'react-icons/di'
import { VscAzure } from 'react-icons/vsc'
import { GrOracle } from 'react-icons/gr'
import { TbApi } from 'react-icons/tb'

// Ikon + warna brand, dipanggil lewat key string dari data/portfolio.js
export const icons = {
  react: [FaReact, '#61dafb'],
  nextjs: [SiNextdotjs, '#ffffff'],
  tailwind: [SiTailwindcss, '#38bdf8'],
  html: [FaHtml5, '#e34f26'],
  css: [FaCss3Alt, '#1572b6'],
  framer: [SiFramer, '#ffffff'],
  node: [FaNodeJs, '#5fa04e'],
  express: [SiExpress, '#ffffff'],
  api: [TbApi, '#22d3ee'],
  jwt: [SiJsonwebtokens, '#d63aff'],
  mysql: [SiMysql, '#4479a1'],
  postgres: [SiPostgresql, '#4169e1'],
  mongo: [SiMongodb, '#47a248'],
  php: [SiPhp, '#777bb4'],
  laravel: [SiLaravel, '#ff2d20'],
  jquery: [SiJquery, '#0769ad'],
  maria: [SiMariadb, '#c49a6c'],
  sqlserver: [DiMsqlServer, '#cc2927'],
  azuresql: [VscAzure, '#0089d6'],
  oracle: [GrOracle, '#f80000'],
  neon: [SiNeon, '#00e599'],
  nifi: [SiApachenifi, '#728e9b'],
  svn: [SiSubversion, '#809cc9'],
  prisma: [SiPrisma, '#ffffff'],
  git: [FaGitAlt, '#f05032'],
  github: [FaGithub, '#ffffff'],
  docker: [FaDocker, '#2496ed'],
  linux: [FaLinux, '#fcc624'],
  vercel: [SiVercel, '#ffffff'],
  postman: [SiPostman, '#ff6c37'],
  linkedin: [FaLinkedin, '#0a66c2'],
  instagram: [FaInstagram, '#e4405f'],
  tiktok: [FaTiktok, '#ffffff'],
  whatsapp: [FaWhatsapp, '#25d366'],
  email: [FaEnvelope, '#22d3ee'],
}

export function Icon({ name, className = '', colored = false }) {
  const entry = icons[name]
  if (!entry) return null
  const [Cmp, color] = entry
  return <Cmp aria-hidden="true" className={className} style={colored ? { color } : undefined} />
}
