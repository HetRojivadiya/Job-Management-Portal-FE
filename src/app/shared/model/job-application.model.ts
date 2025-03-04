export interface ChangeApplicationStatus {
  status: string;
  rejectionMessage: string;
  applicationId: string;
}

export interface ChangeApplicationStatusResponse {
  statusCode: number;
  message: string;
}

export interface UserProfileResponse {
  userId: string;
  username: string;
  email: string;
  mobile: string;
  status: string;
  role: string;
  createdAt?: string | Date;
  skills: UserSkillResponse[];
  resume?: ResumeResponse;
}

export interface UserSkillResponse {
  userSkillId: string;
  skillName: string;
  proficiencyLevel: number;
}

export interface ResumeResponse {
  id: string;
  name: string;
  system_path: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  userId: string;
  userProfile: UserProfileResponse;
}

export interface ApplicationStatusResponse {
  statusCode: number;
  message: string;
  data: {
    pending: number;
    approved: number;
    rejected: number;
  };
}

export interface ApplicationStatusData {
  pending: number;
  approved: number;
  rejected: number;
}

export interface ApplicationCountResponse {
  statusCode: number;
  message: string;
  data: number[];
}

export type ApplicationCountData = number[];
