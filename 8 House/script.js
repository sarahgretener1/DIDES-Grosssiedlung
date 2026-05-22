// Toggle dropdown function
function toggleDropdown(contentId, rowId) {
    const content = document.getElementById(contentId);
    const row = document.getElementById(rowId);
    content.classList.toggle('open');
    row.classList.toggle('open');
}

// 8-house page interactions - wobble content, not UI elements
(function(){
  const wrapper = document.querySelector('.content-wrapper');
  
  if(wrapper) {
    // Initialize transform
    wrapper.style.transform = 'translate(0, 0)';
    
    document.addEventListener('mousemove', (e) => {
      // Calculate normalized mouse position (-1 to 1 on both axes)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      
      // Apply wobble effect to content wrapper only
      const wobbleAmount = 25; // pixels
      const offsetX = x * wobbleAmount;
      const offsetY = y * wobbleAmount;
      
      // Apply transform to content wrapper
      wrapper.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  }

  // Expose video control hook if needed later
  window.mainVideo = document.querySelector('.video video');
})();



// Home page interactions - wobble content vertically, not UI elements
(function(){
  const wrapper = document.querySelector('.home');
  
  if(wrapper) {
    // Initialize transform
    wrapper.style.transform = 'translate(0, 0)';
    
    document.addEventListener('mousemove', (e) => {
      // Calculate normalized mouse position (-1 to 1 on both axes)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      
      // Apply wobble effect to content wrapper only
      const wobbleAmount = 25; // pixels
      const offsetX = x * wobbleAmount;
      const offsetY = y * wobbleAmount;
      
      // Apply transform to content wrapper
      wrapper.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  }
})();