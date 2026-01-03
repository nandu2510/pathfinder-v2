
export type CareerRole = 
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full Stack Developer'
  | 'Mobile App Developer'
  | 'UI/UX Designer'
  | 'Data Scientist'
  | 'Data Engineer'
  | 'Machine Learning Engineer'
  | 'DevOps Engineer'
  | 'Cloud Architect'
  | 'Cybersecurity Analyst'
  | 'Blockchain Developer'
  | 'Game Developer'
  | 'Embedded Systems Engineer'
  | 'QA Automation Engineer'
  | 'Not Sure';

export interface MarketStat {
  year: string;
  demand: number;
  salary: number;
}

export interface DomainStats {
  role: CareerRole;
  avgSalary: string;
  trend: 'High' | 'Steady' | 'Rising';
  openings: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  marketStats: MarketStat[];
}

export interface UserProfile {
  name: string;
  email: string;
  academicLevel: string;
  interests: string[];
  careerGoal: CareerRole;
  learningPace: 'Slow' | 'Moderate' | 'Fast';
  dailyAvailability: number;
  onboarded: boolean;
  completedCourses: string[];
}

export interface RecommendedCourse {
  id: string;
  title: string;
  provider: 'IBM' | 'Coursera' | 'Udemy' | 'Google' | 'Meta' | 'Microsoft';
  difficulty: string;
  isFree: boolean;
  duration: string;
  category: CareerRole;
  rating: number;
  enrolledCount: string;
}

export interface Task {
  id: string;
  title: string;
  type: 'academic' | 'learning' | 'personal' | 'event' | 'hackathon';
  priority: 'low' | 'medium' | 'high';
  startTime: string;
  endTime: string;
  completed: boolean;
}

export interface HackathonPhase {
  id: string;
  name: string;
  duration: string;
  progress: number;
}

// Fixed the error: "Module '"../types"' has no exported member 'RoadmapNode'."
export interface RoadmapNode {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'completed' | 'available' | 'locked';
  skills: string[];
  courses: RecommendedCourse[];
}
