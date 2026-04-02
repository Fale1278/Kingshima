const getDashboardStats = async (req, res) => {
  // In a real app, you'd fetch this from the DB based on the user
  // For now, we'll return dynamic-ish mock data that the backend "manages"
  const stats = [
    { title: "Skills Mastered", value: "12", label: "Level 4", color: "var(--accent-primary)" },
    { title: "Workshops", value: "8", label: "This Month", color: "#60A5FA" },
    { title: "Learning Streak", value: "15 Days", label: "Keep it up!", color: "#F87171" },
    { title: "Achievements", value: "24", label: "Total Badges", color: "#A78BFA" },
  ];
  res.json(stats);
};

const getGrowthData = async (req, res) => {
  const data = [10, 40, 25, 70, 45, 90, 100];
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  res.json({ data, months });
};

const getAnnouncements = async (req, res) => {
  const announcements = [
    { date: "Oct 12", text: "New Media Workshop starting this weekend!" },
    { date: "Oct 10", text: "Community prayer session tomorrow at 8 PM." },
    { date: "Oct 08", text: "October mentorship pairings are now live." },
    { date: "Oct 05", text: "Next community impact project proposal due Friday." }
  ];
  res.json(announcements);
};

export { getDashboardStats, getGrowthData, getAnnouncements };
