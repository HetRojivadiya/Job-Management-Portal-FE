export interface Skill {
    id: string;
    skillName: string;
  }
  
  export interface Job {
    colorClass?: string|string[];
    applicationId? :string;
    id: string;
    title: string;
    description: string;
    experience_level: number;
    salary_range: number;
    location: string;
    postedBy: string;
    deadline: string;
    createdAt: string;
    updatedAt: string;
    skills: Skill[];
    status?: string;
    rejectionMassage?:string;
  }
  

  export interface AppliedJobsResponse {
    statusCode: number;
    message: string;
    data: Job[];
  }