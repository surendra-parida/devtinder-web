export const formatMessageTime = (date) => {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (d.toDateString() === today.toDateString()) {
    return `Today, ${time}`;
  }

  if (d.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${time}`;
  }

  return `${d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  })}, ${time}`;
};
