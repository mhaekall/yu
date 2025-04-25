// cross-browser-fix.js
(function() {
  // Fix untuk masalah storage di beberapa browser
  try {
    // Test localStorage
    window.localStorage.setItem('test', 'test');
    window.localStorage.removeItem('test');
    
    // Test sessionStorage
    window.sessionStorage.setItem('test', 'test');
    window.sessionStorage.removeItem('test');
  } catch (e) {
    console.error('Storage API not available or blocked:', e);
  }
  
  // Tambahkan event listener untuk menangkap error
  window.addEventListener('error', function(e) {
    console.log('Window error caught:', e.message);
    // Jika terkait dengan storage atau cookies, mungkin perlu refresh
    if (e.message.includes('storage') || e.message.includes('cookie')) {
      console.log('Storage/cookie error detected, reloading page...');
      window.location.reload();
    }
  });
})();
