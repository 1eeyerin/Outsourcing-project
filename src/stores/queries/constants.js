export const QUERY_KEYS = {
  FEEDBACKS: ['feedbacks'],
  FEEDBACK: (id) => ['feedback', id],
  FEEDBACK_PASSWORD_CHECK: (id) => ['feedback-password', id],
  MENUS: (category) => ['menus', category]
};
