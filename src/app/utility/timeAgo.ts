function getTimeAgo(then: Date): string {
    const now = new Date();
    const diffMillis = now.getTime() - then.getTime();
    const secondsAgo = diffMillis / 1000;
    const minutesAgo = secondsAgo / 60;
    const hoursAgo = minutesAgo / 60;
  
    if (hoursAgo >= 24) {
      // If it's been more than 24 hours, display the date
      return then.toLocaleDateString();
    } else if (hoursAgo >= 1) {
      // If it's been more than 1 hour, display hours
      return `${Math.floor(hoursAgo)} hours ago`;
    } else if (minutesAgo >= 1) {
      // If it's been more than 1 minute, display minutes
      return `${Math.floor(minutesAgo)} minutes ago`;
    } else {
      // If it's less than a minute, display seconds
      return `${Math.floor(secondsAgo)} seconds ago`;
    }
  }

  