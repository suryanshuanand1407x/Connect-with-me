const ADMIN_PASSWORD = 'Password@123'; // In production, use environment variables
const STORAGE_KEY = 'ideaSubmissions';

export const auth = {
  authenticate: (password: string) => password === ADMIN_PASSWORD,
  
  saveSubmission: (submission: any) => {
    const submissions = auth.getSubmissions();
    submissions.unshift(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  },

  getSubmissions: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }
};

