import UserProgress from '../models/UserProgress.js';
import Event from '../models/Event.js';
import Program from '../models/Program.js';

const getDashboardStats = async (req, res) => {
  try {
    const completedCourses = await UserProgress.countDocuments({ 
      user: req.user._id, 
      isCompleted: true 
    });
    
    const totalEvents = await Event.countDocuments({});
    
    // For now, we'll use semi-static data for streak and badges until those systems are built
    const stats = [
      { title: "Skills Mastered", value: completedCourses.toString(), label: "Completed", color: "var(--accent-primary)" },
      { title: "Workshops", value: totalEvents.toString(), label: "Upcoming", color: "#60A5FA" },
      { title: "Learning Streak", value: "15 Days", label: "Keep it up!", color: "#F87171" },
      { title: "Achievements", value: "24", label: "Total Badges", color: "#A78BFA" },
    ];
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGrowthData = async (req, res) => {
  const data = [10, 40, 25, 70, 45, 90, 100];
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  res.json({ data, months });
};

const getAnnouncements = async (req, res) => {
  const events = await Event.find({}).sort('date').limit(4);
  
  const announcements = events.map(e => ({
    date: e.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    text: `${e.title} at ${e.location}`
  }));

  // If no events, show default news
  if (announcements.length === 0) {
    announcements.push({ date: "Now", text: "Welcome to your new dashboard! Start a program to see progress." });
  }
  
  res.json(announcements);
};

export { getDashboardStats, getGrowthData, getAnnouncements };
