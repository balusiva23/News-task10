
    function fetchTopStories(category) {
        const apiKey = 'pC5ZxyJGZfZkFqI2XOjs4X2z2kVEtPyW'; 
      const apiUrl = `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  
 
  
    document.addEventListener('DOMContentLoaded', function() {
        fetchTopStories('home');
        fetchTopStories('world');
        fetchTopStories('politics');
        fetchTopStories('magazine'); 
        fetchTopStories('technology'); 
        fetchTopStories('science');
        fetchTopStories('health');
        fetchTopStories('sports');
        fetchTopStories('arts'); 
        fetchTopStories('fashion'); 
        fetchTopStories('food'); 
        fetchTopStories('travel');

        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        const dateElement = document.getElementById('date');
        dateElement.textContent = formattedDate;
    });

    function formatDate(date) {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }

     //backToTopBtn
     const backToTopBtn = document.getElementById('backToTopBtn');

        
        window.onscroll = function() {
        scrollFunction();
        };

        function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
        }

  
        backToTopBtn.addEventListener('click', function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        });