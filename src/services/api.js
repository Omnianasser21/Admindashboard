const content = [
  {
    id: 1,
    section: 'Hero Section',
    description: 'Main banner area with headline and call-to-action.',
    title: 'We Build Digital Experiences',
    subtitle: 'Creative technology for modern brands',
    body: 'Digital Mov helps companies transform ideas into powerful digital products.',
    buttonText: 'Get Started',
    buttonUrl: '/get-started',
    updatedAt: '2026-09-12',
  },
  {
    id: 2,
    section: 'About Section',
    description: 'Company introduction and mission statement.',
    title: 'About Digital Mov',
    subtitle: 'Our story',
    body: 'We are a team of creators, engineers, and strategists building the future of digital.',
    buttonText: 'Learn More',
    buttonUrl: '/about',
    updatedAt: '2026-09-10',
  },
  {
    id: 3,
    section: 'Services Section',
    description: 'Overview of services offered.',
    title: 'What We Do',
    subtitle: 'Services & Solutions',
    body: 'Web development, brand strategy, UI/UX design, and digital transformation consulting.',
    buttonText: 'View Services',
    buttonUrl: '/services',
    updatedAt: '2026-09-08',
  },
  {
    id: 4,
    section: 'Contact Section',
    description: 'Contact information and inquiry form.',
    title: 'Get in Touch',
    subtitle: "We'd love to hear from you",
    body: 'Reach out through the form or contact details below.',
    buttonText: 'Contact Us',
    buttonUrl: '/contact',
    updatedAt: '2026-09-05',
  },
];

const media = [
  { id: 1, name: 'hero-banner.jpg', url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 2, name: 'team-collab.jpg', url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 3, name: 'workspace.jpg', url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 4, name: 'project-1.jpg', url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 5, name: 'project-2.jpg', url: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 6, name: 'creative-team.jpg', url: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const settings = {
  websiteName: 'Digital Mov',
  phone: '+1 (555) 010-2030',
  whatsapp: '+1 (555) 010-2040',
  email: 'hello@digitalmov.com',
  address: '100 Tech Avenue, San Francisco, CA',
  facebook: 'https://facebook.com/digitalmov',
  instagram: 'https://instagram.com/digitalmov',
};

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const api = {
  async getContent() {
    await delay(200);
    return [...content];
  },
  async getContentById(id) {
    await delay(150);
    return content.find((c) => c.id === Number(id)) || null;
  },
  async updateContent(id, data) {
    await delay(300);
    const item = content.find((c) => c.id === Number(id));
    if (item) Object.assign(item, data, { updatedAt: new Date().toISOString().split('T')[0] });
    return item;
  },
  async getMedia() {
    await delay(200);
    return [...media];
  },
  async deleteMedia(id) {
    await delay(200);
    const idx = media.findIndex((m) => m.id === Number(id));
    if (idx > -1) media.splice(idx, 1);
    return true;
  },
  async getSettings() {
    await delay(200);
    return { ...settings };
  },
  async updateSettings(data) {
    await delay(300);
    Object.assign(settings, data);
    return { ...settings };
  },
};
