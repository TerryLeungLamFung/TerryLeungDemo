import {PersonalInformation} from './infoType';

export const baseInfo: PersonalInformation = {
  info: {
    firstName: 'Terry',
    lastName: 'Leung',
    tel: '(437) 556-6689',
    email: 'leunglamfungowp@gmail.com',
    address: 'North York, Toronto, ON',
    availability: 'Immediate',
    headline:
      'Seeking Software Developer Job in Canada // Mobile Application Developer @ EY Mtel  //  Connect The World With My App',
  },
  experience: [
    {
      companyName: 'EY Mtel Solutions Limited',
      startDate: '05/2021',
      endDate: '03/2023',
      position: 'Mobile Application Developer',
      description: [
        'Planned, designed, developed, tested, and maintained 8+ e-Commerce business mobile applications for 300000+ users',
        'Worked with PM, developers, QAs and BAs on pre-defined scopes and reported tickets on JIRA under agile methodology',
        'Mainly involved in frontend mobile development with React Native, Redux, Swift and Kotlin',
        'Built CI/CD pipelines to deploy mobile applications in AppStore and Play Store with GitHub CI/CD',
        'Utilized Swagger to generate specifications, documentation, and code for APIs',
        'Participated in 10+ RESTful APIs implementation with JavaScript and Nodejs, for frontend or backend microservices to integrate',
        'Enhanced the APIs performance and app responsiveness by optimizing SQL, reduced the execution time by 33%',
        'Well organizing development documents and application package information with Confluence',
      ],
    },
    {
      companyName: 'Huawei International Co. Limited',
      startDate: '10/2019',
      endDate: '02/2021',
      position: 'Solution Engineer',
      description: [
        'Reported directly to regional CTO for business strategy, solution design discussions, and daily programming processes',
        'Cooperated with multiple departments across the company to get business requirements and provide technical support',
        'Introduced modern DevOps approach for continuous improvement, that increase development lifecycle by 34%',
        'Participated in analyzing 120+ sites data and performing mathematical models, which reduced operation cost by 20%, to access the optimized solution on 5G coverage cell plan by Python',
      ],
    },
    {
      companyName: 'CMA Testing and Certification Laboratories',
      startDate: '09/2017',
      endDate: '09/2018',
      position: 'Laboratory Technician',
      description: [
        'Collaborated with director and teammates in hardware device safety testing and EM testing for 20+ enterprises',
        'Finished over 150+ testing base on International Electrotechnical Commission or CE safety requirements',
        'Developed APIs to get sensors’s data from the testing machine and visualize the data on dashboard',
      ],
    },
  ],
  skills: [
    {
      category: 'Backend',
      description: 'Nodejs, Javascript, Typescript, Python',
    },
    {
      category: 'Frontend',
      description: 'HTML5, XML, CSS, React, React Native, Swift, Kotlin',
    },
    {
      category: 'Database',
      description: 'MySQL, Postgres, MongoDB',
    },
    {
      category: 'Framework',
      description: 'Spring, Springboot, Expressjs, Redux, MUI, Swagger',
    },
    {
      category: 'Code Versioning Tools/Test/Build/Deployment',
      description:
        'Git, PostMan, Charles, Jest, Flipper, GitHub, GitLab, CI/CD, Confluence, Jenkins',
    },
    {
      category: 'Services',
      description: 'Firebase, Sentry, Akamai, AWS',
    },
  ],
  education: [
    {
      name: 'City University of Hong Kong',
      startYear: '09/2015',
      endYear: '07/20l9',
      qualify: 'B.S.E in Electronic Engineering',
      photo: '~/assets/images/demo/cityu.png',
    },
    {
      name: 'National Cheng Kung University',
      startYear: '07/2017',
      endYear: '08/2017',
      qualify: 'Summer Exchange Program in Computer Science',
      photo: '~/assets/images/demo/ncku.png',
    },
  ],
};
