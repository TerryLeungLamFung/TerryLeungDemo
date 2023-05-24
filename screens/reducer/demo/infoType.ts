export type PersonalInformation = {
  info?: {
    firstName: string;
    lastName: string;
    tel: string;
    email: string;
    headline: string;
    address: string;
    availability: string;
  };
  experience?: WorkExperience[];
  skills?: Skills[];
  education?: School[];
};

export type WorkExperience = {
  companyName: string;
  startDate: string;
  endDate: string;
  position: string;
  description: string[];
};

export type Skills = {
  category: string;
  description: string;
};

export type School = {
  name: string;
  startYear: string;
  endYear: string;
  qualify: string;
  photo?: string;
};
