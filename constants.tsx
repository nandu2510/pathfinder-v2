
import { CareerRole, DomainStats, RecommendedCourse, MarketStat } from './types';

const generateStats = (baseSalary: number): MarketStat[] => [
  { year: '2021', demand: 30, salary: baseSalary * 0.85 },
  { year: '2022', demand: 45, salary: baseSalary * 0.92 },
  { year: '2023', demand: 70, salary: baseSalary },
  { year: '2024', demand: 85, salary: baseSalary * 1.1 },
  { year: '2025', demand: 95, salary: baseSalary * 1.25 },
];

export const DOMAIN_STATS: DomainStats[] = [
  { role: 'Frontend Developer', avgSalary: '$112,000', trend: 'Steady', openings: '240k+', difficulty: 'Beginner', description: 'Crafting responsive and interactive user interfaces using modern web technologies.', marketStats: generateStats(112000) },
  { role: 'Backend Developer', avgSalary: '$128,000', trend: 'High', openings: '190k+', difficulty: 'Intermediate', description: 'Building the server-side logic, databases, and APIs that power applications.', marketStats: generateStats(128000) },
  { role: 'Full Stack Developer', avgSalary: '$135,000', trend: 'High', openings: '310k+', difficulty: 'Intermediate', description: 'Mastering both client and server-side development for complete end-to-end solutions.', marketStats: generateStats(135000) },
  { role: 'Mobile App Developer', avgSalary: '$118,000', trend: 'Steady', openings: '115k+', difficulty: 'Intermediate', description: 'Creating native and cross-platform applications for iOS and Android devices.', marketStats: generateStats(118000) },
  { role: 'UI/UX Designer', avgSalary: '$98,000', trend: 'Steady', openings: '85k+', difficulty: 'Beginner', description: 'Designing intuitive user journeys and aesthetically pleasing interfaces.', marketStats: generateStats(98000) },
  { role: 'Data Scientist', avgSalary: '$145,000', trend: 'High', openings: '140k+', difficulty: 'Advanced', description: 'Uncovering patterns in complex data to drive strategic business decisions.', marketStats: generateStats(145000) },
  { role: 'Data Engineer', avgSalary: '$138,000', trend: 'Rising', openings: '95k+', difficulty: 'Advanced', description: 'Designing and building systems for collecting, storing, and analyzing data at scale.', marketStats: generateStats(138000) },
  { role: 'Machine Learning Engineer', avgSalary: '$162,000', trend: 'High', openings: '105k+', difficulty: 'Advanced', description: 'Developing autonomous AI systems and predictive models.', marketStats: generateStats(162000) },
  { role: 'DevOps Engineer', avgSalary: '$142,000', trend: 'High', openings: '155k+', difficulty: 'Advanced', description: 'Bridging the gap between development and operations through automation.', marketStats: generateStats(142000) },
  { role: 'Cloud Architect', avgSalary: '$165,000', trend: 'Rising', openings: '80k+', difficulty: 'Advanced', description: 'Designing robust and scalable cloud infrastructure for modern enterprises.', marketStats: generateStats(165000) },
  { role: 'Cybersecurity Analyst', avgSalary: '$122,000', trend: 'High', openings: '210k+', difficulty: 'Intermediate', description: 'Protecting networks, devices, and data from unauthorized access or attack.', marketStats: generateStats(122000) },
  { role: 'Blockchain Developer', avgSalary: '$155,000', trend: 'Rising', openings: '40k+', difficulty: 'Advanced', description: 'Developing decentralized applications and smart contracts.', marketStats: generateStats(155000) },
  { role: 'Game Developer', avgSalary: '$105,000', trend: 'Steady', openings: '65k+', difficulty: 'Intermediate', description: 'Creating immersive digital experiences through game engines and interactive logic.', marketStats: generateStats(105000) },
  { role: 'Embedded Systems Engineer', avgSalary: '$115,000', trend: 'Steady', openings: '50k+', difficulty: 'Advanced', description: 'Designing specialized computer systems within larger mechanical or electrical systems.', marketStats: generateStats(115000) },
  { role: 'QA Automation Engineer', avgSalary: '$102,000', trend: 'Steady', openings: '90k+', difficulty: 'Beginner', description: 'Ensuring software quality through automated testing frameworks and bug tracking.', marketStats: generateStats(102000) },
];

export const CAREER_ROLES: CareerRole[] = [...DOMAIN_STATS.map(d => d.role), 'Not Sure'] as CareerRole[];

export const COURSES: RecommendedCourse[] = DOMAIN_STATS.flatMap((domain, dIdx) => 
  Array.from({ length: 4 }).map((_, cIdx) => ({
    id: `${domain.role.toLowerCase().replace(/\s+/g, '-')}-${cIdx}`,
    title: `${domain.role} Masterclass: ${['Level 1 Fundamentals', 'Advanced Architectures', 'Real-world Projects', 'Professional Certification'][cIdx]}`,
    provider: (['Google', 'Meta', 'IBM', 'Microsoft', 'Udemy', 'Coursera'][ (dIdx + cIdx) % 6 ]) as any,
    difficulty: (['Beginner', 'Intermediate', 'Advanced', 'All Levels'][cIdx]),
    isFree: cIdx === 0,
    duration: `${15 + (cIdx * 10)}h`,
    category: domain.role,
    rating: 4.5 + (Math.random() * 0.5),
    enrolledCount: `${(Math.random() * 100 + 10).toFixed(1)}k`
  }))
);

// Add extra courses to cross the 50 mark
export const EXTRA_COURSES: RecommendedCourse[] = [
  { id: 'soft-1', title: 'Technical Leadership for Devs', provider: 'IBM', difficulty: 'Advanced', isFree: false, duration: '20h', category: 'Full Stack Developer', rating: 4.9, enrolledCount: '15k' },
  { id: 'soft-2', title: 'Agile Project Management', provider: 'Google', difficulty: 'Beginner', isFree: true, duration: '12h', category: 'DevOps Engineer', rating: 4.8, enrolledCount: '80k' },
  { id: 'soft-3', title: 'Clean Code Principles', provider: 'Microsoft', difficulty: 'Intermediate', isFree: false, duration: '18h', category: 'Backend Developer', rating: 4.9, enrolledCount: '45k' },
  ...COURSES.slice(0, 10).map(c => ({...c, id: `ext-${c.id}`, title: `2025 Update: ${c.title}`}))
];

export const ALL_COURSES = [...COURSES, ...EXTRA_COURSES];

export const MOCK_CHART_DATA = generateStats(120000);
export const INITIAL_ROADMAPS: Record<string, any> = {};
