export interface Notification {
  id: number;
  type: "scheme";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "high" | "medium" | "low";
  eligibility: string;
}

export const notifications: Notification[] = [
  {
    id: 1,
    type: "scheme",
    title: "PM-KISAN Scheme - New Enrollment Open",
    message: "You are eligible for PM-KISAN scheme! Farmers with less than 2 hectares of land can receive ₹6,000 annually.",
    timestamp: "2 hours ago",
    read: false,
    priority: "high",
    eligibility: "Farmers with less than 2 hectares of land"
  },
  {
    id: 2,
    type: "scheme",
    title: "PM FME Scheme - Food Processing Units",
    message: "Based on your profile, you qualify for PM FME scheme. Get up to 35% subsidy on food processing unit setup.",
    timestamp: "1 day ago",
    read: true,
    priority: "high",
    eligibility: "Food processing entrepreneurs, small businesses"
  },
  {
    id: 3,
    type: "scheme",
    title: "Startup India Seed Fund - Apply Now",
    message: "Your startup profile matches our criteria! Apply for up to ₹50 lakhs seed funding for your innovative business.",
    timestamp: "3 days ago",
    read: false,
    priority: "high",
    eligibility: "Registered startups, innovative entrepreneurs"
  },
  {
    id: 4,
    type: "scheme",
    title: "PMEGP - Employment Generation Program",
    message: "You are eligible for PMEGP! Start your own business with government support and funding assistance.",
    timestamp: "1 week ago",
    read: true,
    priority: "medium",
    eligibility: "Unemployed youth, entrepreneurs aged 18-35"
  },
  {
    id: 5,
    type: "scheme",
    title: "MUDRA Loan - Small Business Funding",
    message: "Your business profile qualifies for MUDRA loan. Get funding up to ₹10 lakhs for your micro enterprise.",
    timestamp: "2 weeks ago",
    read: true,
    priority: "medium",
    eligibility: "Micro entrepreneurs, small business owners"
  },
  {
    id: 6,
    type: "scheme",
    title: "PM-KMY - Pension Scheme for Farmers",
    message: "Farmers aged 18-40 can enroll in PM-KMY pension scheme. Secure your future with monthly pension benefits.",
    timestamp: "3 weeks ago",
    read: false,
    priority: "medium",
    eligibility: "Farmers aged 18-40 years"
  },
  {
    id: 7,
    type: "scheme",
    title: "Ayushman Bharat - Health Coverage",
    message: "Your family qualifies for Ayushman Bharat health coverage. Get free treatment up to ₹5 lakhs annually.",
    timestamp: "4 weeks ago",
    read: true,
    priority: "high",
    eligibility: "Families below poverty line, vulnerable groups"
  },
  {
    id: 8,
    type: "scheme",
    title: "PM-KISAN - Kisan Credit Card",
    message: "Eligible farmers can apply for Kisan Credit Card. Get easy credit for agricultural activities.",
    timestamp: "1 month ago",
    read: false,
    priority: "medium",
    eligibility: "Farmers with land ownership"
  },
  {
    id: 9,
    type: "scheme",
    title: "PM FME - Food Processing Subsidy",
    message: "Food processing entrepreneurs can get 35% subsidy on project cost. Apply now for your food business.",
    timestamp: "1 month ago",
    read: true,
    priority: "medium",
    eligibility: "Food processing entrepreneurs, small businesses"
  },
  {
    id: 10,
    type: "scheme",
    title: "Startup India - Innovation Fund",
    message: "Innovative startups can apply for government funding. Your business idea qualifies for support.",
    timestamp: "1 month ago",
    read: false,
    priority: "high",
    eligibility: "Innovative startups, technology entrepreneurs"
  },
  {
    id: 11,
    type: "scheme",
    title: "PMEGP - Rural Employment Program",
    message: "Rural entrepreneurs can start businesses with government support. You are eligible for this program.",
    timestamp: "2 months ago",
    read: true,
    priority: "medium",
    eligibility: "Rural entrepreneurs, unemployed youth"
  },
  {
    id: 12,
    type: "scheme",
    title: "MUDRA - Shishu Loan Scheme",
    message: "Micro enterprises can get loans up to ₹50,000 under MUDRA Shishu scheme. Apply now!",
    timestamp: "2 months ago",
    read: false,
    priority: "medium",
    eligibility: "Micro enterprises, small vendors"
  },
  {
    id: 13,
    type: "scheme",
    title: "PM-KISAN - Agricultural Support",
    message: "Small and marginal farmers can receive direct income support. Check your eligibility now.",
    timestamp: "2 months ago",
    read: true,
    priority: "high",
    eligibility: "Small and marginal farmers"
  },
  {
    id: 14,
    type: "scheme",
    title: "PM FME - Food Processing Units",
    message: "Set up food processing units with government subsidy. Your business profile matches our criteria.",
    timestamp: "3 months ago",
    read: true,
    priority: "medium",
    eligibility: "Food processing entrepreneurs"
  },
  {
    id: 15,
    type: "scheme",
    title: "Startup India - Seed Fund",
    message: "Early-stage startups can get seed funding. Your innovative idea qualifies for government support.",
    timestamp: "3 months ago",
    read: false,
    priority: "high",
    eligibility: "Early-stage startups, innovative entrepreneurs"
  }
]; 