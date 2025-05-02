function estimatePriority(text) {
    const highPriorityWords = ['urgent', 'asap', 'important', 'now', 'today'];
    const lowPriorityWords = ['later', 'next week', 'when possible'];
  
    text = text.toLowerCase();
  
    const isHigh = highPriorityWords.some(word => text.includes(word));
    const isLow = lowPriorityWords.some(word => text.includes(word));
  
    if (isHigh) return 'High';
    if (isLow) return 'Low';
    return 'Normal';
  }
  