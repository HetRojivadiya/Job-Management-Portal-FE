export interface UserSkill {
    userSkillId: string;
    skillName: string;
    proficiencyLevel: string;
  }
  
  export interface UserResponse {
    userId: string;
    username: string;
    email: string;
    mobile: string;
    status: string;
     totalApplications?: { value: number; color: string };
    skills: UserSkill[];
  }
  