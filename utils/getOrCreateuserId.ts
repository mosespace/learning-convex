import generateUserId from './generateRandomId';

// Function to get or create userId
export default function getUserId() {
  if (typeof window === 'undefined') return null;

  const storageKey = 'user_id';
  let userId = localStorage.getItem(storageKey);

  if (!userId) {
    userId = generateUserId();
    localStorage.setItem(storageKey, userId);
  }

  return userId;
}
