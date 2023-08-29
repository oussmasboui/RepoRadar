export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return `Updated on ${formattedDate}`;
  };