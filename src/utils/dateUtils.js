export const formatDate = (dateString) => {
  if (!dateString) return 'Not set';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // If it's today
  if (diffDays === 0) {
    return 'Today';
  }
  
  // If it's within a week
  if (diffDays <= 7) {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
  
  // Otherwise show full date
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const isOverdue = (endDate) => {
  if (!endDate) return false;
  const today = new Date();
  const end = new Date(endDate);
  return end < today;
};

export const getDaysUntilDue = (endDate) => {
  if (!endDate) return null;
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const validateDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return true;
  return new Date(startDate) <= new Date(endDate);
};

export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};