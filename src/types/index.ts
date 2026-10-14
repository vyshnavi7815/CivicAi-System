export type SupportedLanguage = 'en' | 'te' | 'hi' | 'ta' | 'kn' | 'ml' | 'mr' | 'bn';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  subtext: string;
}

export interface ProblemCategory {
  id: string;
  titleKey: string;
  defaultTitle: string;
  defaultDescription: string;
  imageUrl: string;
  isDangerous?: boolean;
  dangerNotice?: string;
  defaultDepartment: string;
  iconName: string;
}

export interface CitizenDetails {
  fullName: string;
  phone: string;
  city: string;
  area: string;
  streetLandmark: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  locationAccuracy?: number;
  isGpsDetected?: boolean;
}

export interface AIAnalysisResult {
  detectedIssue: string;
  wasteOrDamageType: string;
  estimatedSeverity: 'Low' | 'Medium' | 'High' | 'Critical';
  confidence: number;
  evidenceDescription: string;
  categoryMatch: boolean;
  suggestedCategory?: string;
  safetyRiskLevel: 'Safe' | 'Caution' | 'Danger';
  safetyAdvice?: string;
  isDuplicateSuspect?: boolean;
  duplicateReason?: string;
  flaggedForReview?: boolean;
  // Automatic Workforce & Equipment estimation
  crewMembersNeeded?: number;
  crewType?: string;
  equipmentNeeded?: string[];
  estimatedResolutionTime?: string;
  estimatedVolumeOrSize?: string;
}

export interface VerificationResult {
  status: 'Appears resolved' | 'Partially resolved' | 'Still visible' | 'Needs manual review';
  confidence: number;
  findings: string;
  recommendedApproval?: boolean;
  reviewedBy?: string;
  verifiedAt?: string;
}

export interface CivicReport {
  id: string;
  citizenName: string;
  citizenPhone: string;
  language: SupportedLanguage;
  city: string;
  area: string;
  landmark: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: string;
  description: string;
  imageUrl: string;
  afterImageUrl?: string;
  status: 'Submitted' | 'Under Review' | 'Assigned' | 'In Progress' | 'Resolved - Awaiting Verification' | 'Completed' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  department: string;
  assignedWorker?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  rejectionReason?: string;
  rewardPoints: number;
  aiAnalysis?: AIAnalysisResult;
  verification?: VerificationResult;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  ward: string;
  reportsSubmitted: number;
  points: number;
  badge: string;
  badgeColor: string;
}
