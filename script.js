

    async function fetchTopStories(category) {
      const apiKey = 'pC5ZxyJGZfZkFqI2XOjs4X2z2kVEtPyW';
      const apiUrl = `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`;
  
      try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          const results = data.results;
          const section = category.toUpperCase();
          const container = document.getElementById(category);
  
          results.forEach(story => {
              const { title, abstract, byline, created_date, url, multimedia } = story;
  
              if (!title || !abstract || !byline || !created_date || !url || !multimedia) {
                  return;
              }
              const imageUrl = multimedia && multimedia.length > 0 ? multimedia[1]?.url : null;
  
              const card = `
                  <div class="card">
                      <div class="card-body">
                          <div class="row">
                              <div class="col-md-6 mb-4">
                                  <h5 class="card-title">${title}</h5>
                                  <p class="card-text">${abstract}</p>
                                  <p class="card-text">By ${byline}</p>
                                  <p class="card-text">${created_date}</p>
                                  <a href="${url}" class="" target="_blank">Continue Reading</a>
                              </div>
                              <div class="col-md-6 mb-4">
                                  ${imageUrl ? `<img src="${imageUrl}" alt="${title}" style="width: 400px;margin: 0 auto;display: flex;" class="card-img-top img-thumbnail">` : '<div class="img-thumbnail"></div>'}
                              </div>
                          </div>
                      </div>
                  </div>
              `;
  
              container.insertAdjacentHTML('beforeend', card);
          });
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
  
  async function fetchTopStoriesWithDelay(category, delay) {
      await new Promise(resolve => setTimeout(resolve, delay));
      await fetchTopStories(category);
  }
  

  async function fetchAllTopStories() {
    try {
      //const value = getQueryParamValue('value');
      const value = getQueryParamValue('value', 'home');
   
       if (value) {
     
        await fetchTopStories(value);
       
        const container = document.getElementById(value);
        container.classList.remove('hidden-section');
      } else {
        await fetchTopStories('home');
        // If no section is specified in the URL, hide all sections with the "hidden-section" class
        const hiddenSections = document.querySelectorAll('.hidden-section');
        hiddenSections.forEach(section => {
          section.style.display = 'none';
        });
      }
        // await fetchTopStories('world');
        // await fetchTopStories('politics');
        // await fetchTopStories('magazine'); 
        // await fetchTopStories('technology'); 
        // await fetchTopStories('science');
        // await fetchTopStories('health');
        // await fetchTopStories('sports');
        // await fetchTopStories('arts'); 
        // await fetchTopStories('fashion'); 
        // await fetchTopStories('food'); 
        // await fetchTopStories('travel'); 
        const currentDate = new Date();
      const formattedDate = formatDate(currentDate);
      const dateElement = document.getElementById('date');
      dateElement.textContent = formattedDate;
    } catch (error) {
        console.error('Error fetching top stories:', error);
    }
}


function getQueryParamValue(paramName, defaultValue) {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(paramName);
  return paramValue ? paramValue : defaultValue;
}



fetchAllTopStories();
  function formatDate(date) {
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
  }
  
  // Back to Top button
  const backToTopBtn = document.getElementById('backToTopBtn');
  
  window.onscroll = function () {
      scrollFunction();
  };
  
  function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          backToTopBtn.style.display = 'block';
      } else {
          backToTopBtn.style.display = 'none';
      }
  }
  
  backToTopBtn.addEventListener('click', function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  });
  