function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getCoupleId(): string {
  const urlParams = new URLSearchParams(window.location.search);
  let coupleId = urlParams.get('coupleId');

  if (!coupleId) {
    coupleId = localStorage.getItem('coupleId');
    if (!coupleId) {
      coupleId = generateId();
      localStorage.setItem('coupleId', coupleId);
    }
    
    // Update URL without reloading
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?coupleId=' + coupleId;
    window.history.pushState({path:newurl}, '', newurl);
  } else {
    // If URL has it, make sure we save it to local storage for returning visits
    localStorage.setItem('coupleId', coupleId);
  }

  return coupleId;
}
