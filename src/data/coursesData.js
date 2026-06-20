// Courses Data representing all courses and their curriculums on the platform

export const COURSES = [
  {
    id: 'fullstack',
    title: 'Fullstack Web Development',
    category: 'Engineering',
    instructor: 'Kingshima Lead',
    duration: '4 Weeks',
    price: 199,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    description: 'Master modern web technologies from frontend UI to database integration.',
    curriculum: [
      {
        week: 1,
        title: 'HTML & CSS Essentials',
        theme: 'Responsive Web Layouts',
        color: '#ff6d40',
        lessons: [
          {
            id: 'fs-1-1',
            title: 'Introduction to HTML & CSS',
            duration: '45 min',
            description: 'Learn the basic skeleton of the web and style it with basic CSS selectors.',
            video_url: '',
            resources: ['HTML Cheat Sheet', 'CSS Basics Guide'],
            assignment: 'Build a semantic single-page personal biography website.'
          },
          {
            id: 'fs-1-2',
            title: 'CSS Flexbox & Layouts',
            duration: '60 min',
            description: 'Master grid alignment and flexible boxes for responsive page design.',
            video_url: '',
            resources: ['Flexbox Cheat Sheet', 'Layout Template'],
            assignment: 'Create a responsive navigation bar and visual card grid.'
          },
          {
            id: 'fs-1-3',
            title: 'Responsive Design & Media Queries',
            duration: '50 min',
            description: 'Optimize page displays across mobile, tablet, and desktop viewports.',
            video_url: '',
            resources: ['Responsive Best Practices PDF'],
            assignment: 'Make your biography website fully mobile-friendly.'
          }
        ],
        assignment: 'Design and code a fully responsive landing page from scratch.'
      },
      {
        week: 2,
        title: 'JavaScript Foundations',
        theme: 'Interactive Web Programming',
        color: '#a78bfa',
        lessons: [
          {
            id: 'fs-2-1',
            title: 'JavaScript Syntax & Logic',
            duration: '55 min',
            description: 'Learn variables, conditions, loops, and functional programming basics.',
            video_url: '',
            resources: ['JS Foundations Handout'],
            assignment: 'Write JavaScript functions to solve 10 algorithmic problems.'
          },
          {
            id: 'fs-2-2',
            title: 'DOM Manipulation',
            duration: '60 min',
            description: 'Connect script files to your HTML elements and update them dynamically.',
            video_url: '',
            resources: ['DOM Selection Guide'],
            assignment: 'Build a simple task tracker list with add/delete functionalities.'
          },
          {
            id: 'fs-2-3',
            title: 'Promises & Fetching APIs',
            duration: '45 min',
            description: 'Understand asynchronous operations, Promises, and fetch data from remote servers.',
            video_url: '',
            resources: ['Async Cheat Sheet'],
            assignment: 'Fetch and display current weather details using a free REST API.'
          }
        ],
        assignment: 'Build an interactive dashboard application utilizing external API endpoints.'
      },
      {
        week: 3,
        title: 'Modern React Development',
        theme: 'Building Dynamic User Interfaces',
        color: '#34d399',
        lessons: [
          {
            id: 'fs-3-1',
            title: 'React Fundamentals & Component Architecture',
            duration: '60 min',
            description: 'Understand the virtual DOM, JSX, components, and props.',
            video_url: '',
            resources: ['React Starter Guide'],
            assignment: 'Refactor your API dashboard into reusable React components.'
          },
          {
            id: 'fs-3-2',
            title: 'State & Event Handling',
            duration: '50 min',
            description: 'Learn the useState hook and handle interactive event cycles.',
            video_url: '',
            resources: ['React State Cheat Sheet'],
            assignment: 'Create an interactive filterable product list component.'
          },
          {
            id: 'fs-3-3',
            title: 'Effects & API Fetching in React',
            duration: '45 min',
            description: 'Implement the useEffect hook to sync components with APIs.',
            video_url: '',
            resources: ['UseEffect Best Practices'],
            assignment: 'Implement automated data fetching and search in your dashboard app.'
          }
        ],
        assignment: 'Develop a fully stateful, single-page application using React.'
      },
      {
        week: 4,
        title: 'Backend & APIs Integration',
        theme: 'Shipping Your Fullstack Project',
        color: '#fbbf24',
        lessons: [
          {
            id: 'fs-4-1',
            title: 'Node.js & Express Server Setup',
            duration: '55 min',
            description: 'Create a local HTTP server and learn express routing structures.',
            video_url: '',
            resources: ['Node Express Boilerplate'],
            assignment: 'Create a server with CRUD endpoints for managing tasks.'
          },
          {
            id: 'fs-4-2',
            title: 'Database Design with MongoDB',
            duration: '60 min',
            description: 'Connect databases, map documents, and define structural schemas.',
            video_url: '',
            resources: ['Mongoose Schemas Reference'],
            assignment: 'Integrate MongoDB with your Express CRUD server.'
          },
          {
            id: 'fs-4-3',
            title: 'Connecting Frontend & Backend',
            duration: '50 min',
            description: 'Establish CORS rules, configure proxy addresses, and deploy your site.',
            video_url: '',
            resources: ['Fullstack Deploy Checklist'],
            assignment: 'Link your React dashboard to your backend server and deploy.'
          }
        ],
        assignment: 'Deploy your complete Fullstack Web Application capstone project.'
      }
    ]
  },
  {
    id: 'digital-arts',
    title: 'Digital Arts & Design',
    category: 'Media',
    instructor: 'Creative Director',
    duration: '4 Weeks',
    price: 149,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    description: 'Unleash your creativity and master modern digital UI/UX layout and branding tools.',
    curriculum: [
      {
        week: 1,
        title: 'Figma Workspace & Layouts',
        theme: 'Figma Layout Essentials',
        color: '#ff6d40',
        lessons: [
          {
            id: 'da-1-1',
            title: 'Figma Basics & Tools',
            duration: '45 min',
            description: 'Get familiar with Figma workspace, frames, vector shapes, and groups.',
            video_url: '',
            resources: ['Figma Keyboard Shortcuts PDF'],
            assignment: 'Create a set of custom vector icons in Figma.'
          },
          {
            id: 'da-1-2',
            title: 'Typography & Visual Hierarchy',
            duration: '60 min',
            description: 'Understand font scaling, leading, tracking, and setting hierarchical balance.',
            video_url: '',
            resources: ['Type Scale Guide'],
            assignment: 'Design a clean text-focused newsletter mockup.'
          },
          {
            id: 'da-1-3',
            title: 'Color Theory & UI Application',
            duration: '50 min',
            description: 'Create functional palettes with dark/light mode accents.',
            video_url: '',
            resources: ['Functional Palette Builder'],
            assignment: 'Apply color palettes to a banking app screen mockup.'
          }
        ],
        assignment: 'Build a low-fidelity landing page wireframe in Figma.'
      },
      {
        week: 2,
        title: 'UI Components & Styling',
        theme: 'Designing UI Components',
        color: '#a78bfa',
        lessons: [
          {
            id: 'da-2-1',
            title: 'Auto Layout Essentials',
            duration: '55 min',
            description: 'Master auto-layout rules to build responsive containers.',
            video_url: '',
            resources: ['Auto Layout Sandbox File'],
            assignment: 'Design a responsive profile card and navigation menu.'
          },
          {
            id: 'da-2-2',
            title: 'Figma Components & Variants',
            duration: '60 min',
            description: 'Learn component properties, states, and variable variants.',
            video_url: '',
            resources: ['Component Design Guidelines'],
            assignment: 'Create a reusable interactive button component library.'
          },
          {
            id: 'da-2-3',
            title: 'Grid Systems & Constraints',
            duration: '45 min',
            description: 'Utilize layouts and constraints to ensure absolute responsive consistency.',
            video_url: '',
            resources: ['Grid Layout Guide'],
            assignment: 'Position elements correctly across Desktop and Mobile grid templates.'
          }
        ],
        assignment: 'Design a high-fidelity responsive dashboard screen layout.'
      },
      {
        week: 3,
        title: 'Interactions & Prototyping',
        theme: 'Creating Interactive Prototypes',
        color: '#34d399',
        lessons: [
          {
            id: 'da-3-1',
            title: 'Interactive Prototyping Basics',
            duration: '60 min',
            description: 'Connect screens, configure overlays, and trigger click events.',
            video_url: '',
            resources: ['Prototyping Framework PDF'],
            assignment: 'Wire up a simple three-screen user flow.'
          },
          {
            id: 'da-3-2',
            title: 'Smart Animate & Transitions',
            duration: '50 min',
            description: 'Create ultra-smooth animations, slide transitions, and micro-interactions.',
            video_url: '',
            resources: ['Smart Animate Cheat Sheet'],
            assignment: 'Build an animated mobile app menu transition.'
          },
          {
            id: 'da-3-3',
            title: 'Usability Testing Prototypes',
            duration: '45 min',
            description: 'Set up flows, run click tests, and record feedback loops.',
            video_url: '',
            resources: ['User Testing Sheets'],
            assignment: 'Perform a testing session on your prototype with another classmate.'
          }
        ],
        assignment: 'Deliver a fully animated mobile user flow prototype.'
      },
      {
        week: 4,
        title: 'Creative Branding Portfolio',
        theme: 'Developing Design Portfolios',
        color: '#fbbf24',
        lessons: [
          {
            id: 'da-4-1',
            title: 'Brand Identity Systems',
            duration: '55 min',
            description: 'Define logos, typography guidelines, and brand color guides.',
            video_url: '',
            resources: ['Brand System Guide'],
            assignment: 'Create a visual style sheet for a mockup tech startup.'
          },
          {
            id: 'da-4-2',
            title: 'Building Design Presentations',
            duration: '60 min',
            description: 'Present user problem research, visual solutions, and design choices.',
            video_url: '',
            resources: ['Presentation Template'],
            assignment: 'Build a slide deck presenting your mobile user flow designs.'
          },
          {
            id: 'da-4-3',
            title: 'Exporting & Design Handoff',
            duration: '50 min',
            description: 'Prepare assets, export layers, and set up developer handoff modes.',
            video_url: '',
            resources: ['Handoff Checklist'],
            assignment: 'Export and organize all design assets for developer handoff.'
          }
        ],
        assignment: 'Present your completed portfolio project case study.'
      }
    ]
  },
  {
    id: 'biblical-leadership',
    title: 'Biblical Leadership',
    category: 'Leadership',
    instructor: 'Pastor David',
    duration: '4 Weeks',
    price: 99,
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    description: 'Developing character, ethical strategy, and strong teams based on Kingdom leadership principles.',
    curriculum: [
      {
        week: 1,
        title: 'Foundations of Leadership',
        theme: 'Principles of Servant Leadership',
        color: '#ff6d40',
        lessons: [
          {
            id: 'bl-1-1',
            title: 'Biblical Definition of Leadership',
            duration: '45 min',
            description: 'Contrast secular and biblical views of status, influence, and leadership authority.',
            video_url: '',
            resources: ['Leadership Foundations PDF'],
            assignment: 'Write a reflection journal on leading vs serving in your current context.'
          },
          {
            id: 'bl-1-2',
            title: 'Integrity & Character Building',
            duration: '60 min',
            description: 'Examine key biblical figures whose character determined their leadership legacy.',
            video_url: '',
            resources: ['Character Dev Guide'],
            assignment: 'Identify 3 personal integrity habits to practice this week.'
          },
          {
            id: 'bl-1-3',
            title: 'Humility in Practice',
            duration: '50 min',
            description: 'How humility creates influence and supports team growth.',
            video_url: '',
            resources: ['Humility Framework'],
            assignment: 'Perform an act of service within your team and journal the outcomes.'
          }
        ],
        assignment: 'Draft a personal leadership covenant expressing your core values.'
      },
      {
        week: 2,
        title: 'Vision & Strategy',
        theme: 'Discerning and Mapping Vision',
        color: '#a78bfa',
        lessons: [
          {
            id: 'bl-2-1',
            title: 'Discerning God\'s Vision',
            duration: '55 min',
            description: 'Learn biblical discernment techniques to define high-impact projects.',
            video_url: '',
            resources: ['Vision Discernment Handout'],
            assignment: 'Draft a three-sentence mission statement for your core project.'
          },
          {
            id: 'bl-2-2',
            title: 'Strategic Mapping & Goal Setting',
            duration: '60 min',
            description: 'Convert abstract visions into structured goals with timeline checkpoints.',
            video_url: '',
            resources: ['Strategic Goal Sheet'],
            assignment: 'Map a 30-60-90 day execution plan for your current project.'
          },
          {
            id: 'bl-2-3',
            title: 'Overcoming Obstacles',
            duration: '45 min',
            description: 'How biblical leaders handled crises, criticisms, and systemic blockers.',
            video_url: '',
            resources: ['Crisis Resolution PDF'],
            assignment: 'Analyze a past crisis and list lessons for strategic resilience.'
          }
        ],
        assignment: 'Publish a complete 6-month strategic vision and timeline briefing.'
      },
      {
        week: 3,
        title: 'Team Building & Mentorship',
        theme: 'Developing Strong Teams',
        color: '#34d399',
        lessons: [
          {
            id: 'bl-3-1',
            title: 'Mentorship & Discipleship Model',
            duration: '60 min',
            description: 'Study the coaching frameworks utilized to grow other leaders.',
            video_url: '',
            resources: ['Mentoring Worksheet'],
            assignment: 'Schedule and outline a mentoring session with a peer.'
          },
          {
            id: 'bl-3-2',
            title: 'Conflict Resolution',
            duration: '50 min',
            description: 'Reconcile disputes using the Matthew 18 restorative methodology.',
            video_url: '',
            resources: ['Matthew 18 Restorative Guide'],
            assignment: 'Roleplay a conflict resolution scenario and log key learnings.'
          },
          {
            id: 'bl-3-3',
            title: 'Building Inclusive Cohorts',
            duration: '45 min',
            description: 'Cultivating shared responsibility and honoring unique talent strengths.',
            video_url: '',
            resources: ['Strengths Finder Outline'],
            assignment: 'Map the strengths of 3 team members and assign matching project roles.'
          }
        ],
        assignment: 'Design a cohort-wide collaboration charter defining feedback rules.'
      },
      {
        week: 4,
        title: 'Strategic Kingdom Impact',
        theme: 'Leading with Stewardship',
        color: '#fbbf24',
        lessons: [
          {
            id: 'bl-4-1',
            title: 'Stewardship of Resources',
            duration: '55 min',
            description: 'Manage time, talents, and financial resources with maximum accountability.',
            video_url: '',
            resources: ['Stewardship Matrix PDF'],
            assignment: 'Audit your weekly time allocation and highlight adjustment areas.'
          },
          {
            id: 'bl-4-2',
            title: 'Leading with Influence',
            duration: '60 min',
            description: 'Develop public speaking, writing, and networking presence.',
            video_url: '',
            resources: ['Communication Blueprint'],
            assignment: 'Draft a short video address detailing your project purpose.'
          },
          {
            id: 'bl-4-3',
            title: 'Mentoring Next Gen Leaders',
            duration: '50 min',
            description: 'Creating structures that secure future sustainability.',
            video_url: '',
            resources: ['Succession Plan Checklist'],
            assignment: 'Write a draft transition and handoff plan for your leadership role.'
          }
        ],
        assignment: 'Deliver your graduation Capstone Leadership Presentation.'
      }
    ]
  },
  {
    id: 'ai-bootcamp',
    title: 'AI Productivity Bootcamp',
    category: 'Engineering',
    instructor: 'Kingshima Lead',
    duration: '4 Weeks',
    price: 129,
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    description: 'A 4-week intensive bootcamp for creators, professionals, and learners to leverage AI for maximum output.',
    curriculum: [
      {
        week: 1,
        title: 'Foundations',
        theme: 'Building Your AI Base',
        color: '#ff6d40',
        lessons: [
          {
            id: '1-1',
            title: 'Introduction to AI & Its Role in Productivity',
            duration: '45 min',
            description: 'Understand what AI tools exist today and how they fit into your workflow.',
            video_url: '',
            resources: ['AI Tools Overview PDF', 'Starter Checklist'],
            assignment: 'List 5 tasks in your life that could be automated or improved with AI.'
          },
          {
            id: '1-2',
            title: 'Prompt Engineering Fundamentals',
            duration: '60 min',
            description: 'Learn how to communicate clearly with AI models to get powerful results.',
            video_url: '',
            resources: ['Prompt Templates Pack', 'Cheat Sheet'],
            assignment: 'Write 10 prompts for your most common daily tasks and test them.'
          },
          {
            id: '1-3',
            title: 'Setting Up Your AI-Powered Workflow',
            duration: '50 min',
            description: 'Build your personal AI toolkit and daily system.',
            video_url: '',
            resources: ['Workflow Template', 'Tool Comparison Guide'],
            assignment: 'Design your weekly AI workflow and share it in the community.'
          }
        ],
        assignment: 'Map your current productivity workflow and identify 3 areas AI can improve.'
      },
      {
        week: 2,
        title: 'Creativity',
        theme: 'AI as Your Creative Partner',
        color: '#a78bfa',
        lessons: [
          {
            id: '2-1',
            title: 'AI for Content Creation',
            duration: '55 min',
            description: 'Generate, edit, and publish content 10x faster with AI assistance.',
            video_url: '',
            resources: ['Content Templates', 'Platform Guide'],
            assignment: 'Create 3 pieces of content using AI tools and post one publicly.'
          },
          {
            id: '2-2',
            title: 'Visual Design with AI',
            duration: '60 min',
            description: 'Use AI image and design tools to produce professional visuals.',
            video_url: '',
            resources: ['Design Tool Comparison', 'Prompt Library for Visuals'],
            assignment: 'Design a social media graphic set using at least one AI design tool.'
          },
          {
            id: '2-3',
            title: 'Building a Creative System',
            duration: '45 min',
            description: 'Create repeatable creative systems that leverage AI at every step.',
            video_url: '',
            resources: ['Creative System Template', 'Automation Map'],
            assignment: 'Document your creative system and identify automation opportunities.'
          }
        ],
        assignment: 'Build a mini content campaign using only AI-assisted tools.'
      },
      {
        week: 3,
        title: 'Productivity',
        theme: 'Automating the Boring Stuff',
        color: '#34d399',
        lessons: [
          {
            id: '3-1',
            title: 'Task Automation with AI',
            duration: '60 min',
            description: 'Automate repetitive tasks using AI-powered tools and workflows.',
            video_url: '',
            resources: ['Automation Blueprint', 'Tool Setup Guide'],
            assignment: 'Identify and automate one recurring task in your workflow.'
          },
          {
            id: '3-2',
            title: 'AI for Research & Learning',
            duration: '50 min',
            description: 'Use AI to learn faster, research deeper, and retain more.',
            video_url: '',
            resources: ['Research Framework', 'Note-Taking Templates'],
            assignment: 'Research a topic of your choice using only AI tools and present findings.'
          },
          {
            id: '3-3',
            title: 'Time Management with AI',
            duration: '45 min',
            description: 'Let AI help you plan, prioritize, and protect your time.',
            video_url: '',
            resources: ['Time Blocking Template', 'Priority Matrix'],
            assignment: 'Build a 2-week AI-assisted schedule and follow it for 3 days.'
          }
        ],
        assignment: 'Cut your weekly task time by 20% using automation and AI tools.'
      },
      {
        week: 4,
        title: 'Execution',
        theme: 'Shipping Your AI-Powered Project',
        color: '#fbbf24',
        lessons: [
          {
            id: '4-1',
            title: 'Project Planning with AI',
            duration: '55 min',
            description: 'Plan and scope a real project using AI for research and structure.',
            video_url: '',
            resources: ['Project Brief Template', 'AI Planning Prompts'],
            assignment: 'Define your capstone project scope using the AI planning framework.'
          },
          {
            id: '4-2',
            title: 'Execution & Iteration',
            duration: '60 min',
            description: 'Build, test, and iterate your project with AI feedback loops.',
            video_url: '',
            resources: ['Feedback Loop Guide', 'Iteration Template'],
            assignment: 'Complete your first version and get feedback from the community.'
          },
          {
            id: '4-3',
            title: 'Presenting & Shipping Your Work',
            duration: '50 min',
            description: 'Present your project professionally and share it with the world.',
            video_url: '',
            resources: ['Presentation Framework', 'Launch Checklist'],
            assignment: 'Publish your capstone project and share the link with the cohort.'
          }
        ],
        assignment: 'Ship your AI-powered capstone project by end of week.'
      }
    ]
  }
];
