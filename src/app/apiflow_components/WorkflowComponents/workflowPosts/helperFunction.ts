export function formatTimeAgo(dateString: any) {
  const now: any = new Date();
  const postedDate: any = new Date(dateString);

  // Check if the date is today
  const isToday = now.toDateString() === postedDate.toDateString();

  if (isToday) {
    // If the date is today, format it as 'HH:MM AM/PM'
    const hours = postedDate.getHours();
    const minutes = postedDate.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${((hours + 11) % 12) + 1}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${period}`;
    return formattedTime;
  } else {
    // Calculate the time difference in milliseconds
    const timeDiff = now - postedDate;

    // If the post was more than 24 hours ago, calculate days and return 'X day(s) ago'
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

    if (daysDiff === 1) {
      return "1 day ago";
    } else if (daysDiff > 1 && daysDiff <= 7) {
      return `${daysDiff} days ago`;
    } else if (daysDiff > 7) {
      // If the post was more than 7 days ago, return the date in 'DDMMMYYYY' format
      const day = postedDate.getDate();
      const month = postedDate.toLocaleString("default", { month: "short" });
      const year = postedDate.getFullYear();
      return `${day}${month}${year}`;
    } else {
      // For time difference less than 1 day, return hours ago
      const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)); // in hours
      return hoursDiff + "h ago";
    }
  }
}
