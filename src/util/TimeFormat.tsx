export function formatFirestoreTimestamp(timestamp:any) {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  
    const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const period = date.getHours() >= 12 ? 'PM' : 'AM';
  
    return `${formattedTime}`;
  }