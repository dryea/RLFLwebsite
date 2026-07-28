export interface ResourceConfig {
  title: string;
  newLabel: string;
  basePath: string;
  apiName: string;
}

export const cmsResources: Record<string, ResourceConfig> = {
  products: { title: "Products", newLabel: "New Product", basePath: "/cms/products", apiName: "Products" },
  services: { title: "Services", newLabel: "New Service", basePath: "/cms/services", apiName: "Services" },
  team: { title: "Team Members", newLabel: "New Member", basePath: "/cms/team", apiName: "Team" },
  branches: { title: "Branches", newLabel: "New Branch", basePath: "/cms/branches", apiName: "Branches" },
  rates: { title: "Rates", newLabel: "New Rate", basePath: "/cms/rates", apiName: "Rates" },
  news: { title: "News", newLabel: "New Article", basePath: "/cms/news", apiName: "News" },
  notices: { title: "Notices", newLabel: "New Notice", basePath: "/cms/notices", apiName: "Notices" },
  reports: { title: "Reports", newLabel: "New Report", basePath: "/cms/reports", apiName: "Reports" },
  gallery: { title: "Gallery", newLabel: "New Album", basePath: "/cms/gallery", apiName: "Gallery" },
  downloads: { title: "Downloads", newLabel: "New Download", basePath: "/cms/downloads", apiName: "Downloads" },
  faq: { title: "FAQ", newLabel: "New FAQ", basePath: "/cms/faq", apiName: "Faq" },
  careers: { title: "Careers", newLabel: "New Job", basePath: "/cms/careers", apiName: "Careers" },
  users: { title: "Users", newLabel: "New User", basePath: "/cms/users", apiName: "Users" },
  settings: { title: "Settings", newLabel: "New Setting", basePath: "/cms/settings", apiName: "Settings" },
  enquiries: { title: "Enquiries", newLabel: "", basePath: "/cms/enquiries", apiName: "" },
};
