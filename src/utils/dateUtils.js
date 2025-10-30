export const formatDate = (dateString) => {
  if (!dateString) return 'Not set';
  
  const date = new Date(dateString);
  
  // Format as DD/MM/YYYY
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
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
  
  // Format as DD/MM/YYYY for display
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

// Parse DD/MM/YYYY format to ISO date string
export const parseDateInput = (dateString) => {
  if (!dateString || !dateString.trim()) return null;
  
  // Remove any extra spaces
  const cleanDate = dateString.trim();
  
  // Check if it's in DD/MM/YYYY format
  const ddmmyyyyRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = cleanDate.match(ddmmyyyyRegex);
  
  if (!match) return null;
  
  const [, day, month, year] = match;
  
  // Validate the date parts
  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);
  
  if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12) {
    return null;
  }
  
  // Create date object (month is 0-indexed in JavaScript)
  const date = new Date(yearNum, monthNum - 1, dayNum);
  
  // Check if the date is valid (handles leap years, month days, etc.)
  if (date.getDate() !== dayNum || date.getMonth() !== monthNum - 1 || date.getFullYear() !== yearNum) {
    return null;
  }
  
  return date.toISOString();
};

// Validate DD/MM/YYYY format
export const isValidDateFormat = (dateString) => {
  if (!dateString || !dateString.trim()) return true; // Empty is valid
  return parseDateInput(dateString) !== null;
};