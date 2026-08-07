export interface ColumnConfig {
  key: string;
  label: string;
  type?: "text" | "image" | "date" | "badge" | "money" | "boolean";
  badgeColors?: Record<string, string>;
  truncate?: number;
}

export interface ResourceConfig {
  title: string;
  newLabel: string;
  basePath: string;
  apiName: string;
  displayField?: string;
  columns: ColumnConfig[];
}

const statusCol: ColumnConfig = {
  key: "status",
  label: "Status",
  type: "badge",
  badgeColors: {
    published: "bg-green-100 text-green-800",
    active: "bg-blue-100 text-blue-800",
    pending: "bg-amber-100 text-amber-800",
    draft: "bg-yellow-100 text-yellow-800",
    inactive: "bg-gray-100 text-gray-600",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  },
};

export const cmsResources: Record<string, ResourceConfig> = {
  products: {
    title: "Products", newLabel: "New Product", basePath: "/cms/products", apiName: "Products", displayField: "title",
    columns: [
      { key: "bannerImage", label: "Image", type: "image" },
      { key: "title", label: "Product", truncate: 40 },
      { key: "categoryName", label: "Category", type: "badge", badgeColors: { Savings: "bg-purple-100 text-purple-800", "Fixed Deposits": "bg-blue-100 text-blue-800", Loans: "bg-green-100 text-green-800" } },
      { key: "audience", label: "Audience", type: "badge", badgeColors: { personal: "bg-gray-100 text-gray-700", business: "bg-indigo-100 text-indigo-800", digital: "bg-teal-100 text-teal-800" } },
      { key: "interestRateInfo", label: "Rate", truncate: 25 },
      { key: "isPopular", label: "Popular", type: "boolean" },
      statusCol,
    ],
  },
  services: {
    title: "Services", newLabel: "New Service", basePath: "/cms/services", apiName: "Services", displayField: "title",
    columns: [
      { key: "icon", label: "Icon" },
      { key: "title", label: "Service", truncate: 40 },
      { key: "summary", label: "Summary", truncate: 50 },
      { key: "isExternal", label: "External", type: "boolean" },
      statusCol,
    ],
  },
  team: {
    title: "Team Members", newLabel: "New Member", basePath: "/cms/team", apiName: "TeamMembers", displayField: "name",
    columns: [
      { key: "photo", label: "Photo", type: "image" },
      { key: "name", label: "Name" },
      { key: "designation", label: "Designation", truncate: 30 },
      { key: "isActive", label: "Active", type: "boolean" },
    ],
  },
  branches: {
    title: "Branches", newLabel: "New Branch", basePath: "/cms/branches", apiName: "Branches", displayField: "name",
    columns: [
      { key: "name", label: "Branch" },
      { key: "address", label: "Address", truncate: 40 },
      { key: "district", label: "District" },
      { key: "phone", label: "Phone" },
      { key: "isActive", label: "Active", type: "boolean" },
    ],
  },
  rates: {
    title: "Rates", newLabel: "New Rate", basePath: "/cms/rates", apiName: "Rates", displayField: "productName",
    columns: [
      { key: "productName", label: "Product", truncate: 30 },
      { key: "categoryName", label: "Category" },
      { key: "tenure", label: "Tenure" },
      { key: "singleRate", label: "Rate", type: "money" },
      { key: "effectiveDate", label: "Effective", type: "date" },
      statusCol,
    ],
  },
  news: {
    title: "News", newLabel: "New Article", basePath: "/cms/news", apiName: "News", displayField: "title",
    columns: [
      { key: "image", label: "Image", type: "image" },
      { key: "title", label: "Title", truncate: 50 },
      { key: "publishedAt", label: "Published", type: "date" },
      statusCol,
    ],
  },
  notices: {
    title: "Notices", newLabel: "New Notice", basePath: "/cms/notices", apiName: "Notices", displayField: "title",
    columns: [
      { key: "title", label: "Notice", truncate: 50 },
      { key: "publishedDate", label: "Date", type: "date" },
      statusCol,
    ],
  },
  reports: {
    title: "Reports", newLabel: "New Report", basePath: "/cms/reports", apiName: "Reports", displayField: "title",
    columns: [
      { key: "title", label: "Report", truncate: 50 },
      { key: "fiscalYear", label: "Fiscal Year" },
      { key: "publishedAt", label: "Published", type: "date" },
      statusCol,
    ],
  },
  gallery: {
    title: "Gallery", newLabel: "New Album", basePath: "/cms/gallery", apiName: "Albums", displayField: "title",
    columns: [
      { key: "coverImage", label: "Cover", type: "image" },
      { key: "title", label: "Album", truncate: 40 },
      { key: "isActive", label: "Active", type: "boolean" },
    ],
  },
  downloads: {
    title: "Downloads", newLabel: "New Download", basePath: "/cms/downloads", apiName: "Downloads", displayField: "title",
    columns: [
      { key: "title", label: "Title", truncate: 40 },
      { key: "fileSize", label: "Size" },
      { key: "isActive", label: "Active", type: "boolean" },
    ],
  },
  faq: {
    title: "FAQ", newLabel: "New FAQ", basePath: "/cms/faq", apiName: "Faq", displayField: "question",
    columns: [
      { key: "question", label: "Question", truncate: 60 },
      { key: "isActive", label: "Active", type: "boolean" },
    ],
  },
  careers: {
    title: "Careers", newLabel: "New Job", basePath: "/cms/careers", apiName: "Careers", displayField: "title",
    columns: [
      { key: "title", label: "Position", truncate: 40 },
      { key: "department", label: "Department" },
      { key: "location", label: "Location" },
      { key: "type", label: "Type", type: "badge", badgeColors: { "Full-time": "bg-green-100 text-green-800", "Part-time": "bg-amber-100 text-amber-800", "Internship": "bg-blue-100 text-blue-800" } },
      statusCol,
    ],
  },
  users: {
    title: "Users", newLabel: "New User", basePath: "/cms/users", apiName: "Users", displayField: "name",
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "isActive", label: "Active", type: "boolean" },
    ],
  },
  settings: {
    title: "Settings", newLabel: "New Setting", basePath: "/cms/settings", apiName: "Settings", displayField: "key",
    columns: [
      { key: "key", label: "Key" },
      { key: "value", label: "Value", truncate: 40 },
    ],
  },
  enquiries: {
    title: "Enquiries", newLabel: "", basePath: "/cms/enquiries", apiName: "", displayField: "name",
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "createdAt", label: "Date", type: "date" },
    ],
  },
  trainings: {
    title: "Trainings", newLabel: "New Training", basePath: "/cms/trainings", apiName: "Trainings", displayField: "program",
    columns: [
      { key: "date", label: "Date (BS)", type: "date" },
      { key: "program", label: "Program", truncate: 40 },
      { key: "name", label: "Staff" },
      { key: "branch", label: "Branch" },
      { key: "position", label: "Position" },
      { key: "organizer", label: "Organizer", truncate: 25 },
      { key: "duration", label: "Duration" },
    ],
  },
  "quick-actions": {
    title: "Quick Actions", newLabel: "New Quick Action", basePath: "/cms/quick-actions", apiName: "QuickActions", displayField: "label",
    columns: [
      { key: "label", label: "Label", truncate: 30 },
      { key: "labelNp", label: "Label (NP)", truncate: 30 },
      { key: "href", label: "Link", truncate: 40 },
      { key: "icon", label: "Icon" },
      { key: "isHighlight", label: "Highlight", type: "boolean" },
      { key: "isActive", label: "Active", type: "boolean" },
    ],
  },
};
