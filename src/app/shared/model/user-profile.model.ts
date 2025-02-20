export interface UserSkill {
    userSkillId?: string;
    skillName: string;
    proficiencyLevel: string;
  }
  
  export interface UserProfile {
    userId: string;
    username: string;
    email: string;
    mobile: string;
    status: string;
    role: string;
    createdAt: string;
    skills?: UserSkill[];
    resume?: {
      id: string;
      name: string;
      system_path: string;
      createdAt: string;
      updatedAt: string;
    };
  }
  