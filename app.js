document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');
    const resetButton = document.getElementById('resetButton');
  
    // Event listener for the search button
    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();  // Prevent the form from submitting
  
      const searchTerm = searchInput.value.trim().toLowerCase();
  
      // Fetch data from the JSON file
      fetch('./travel_recommendation.json')
        .then(response => response.json())
        .then(data => {
          let recommendations = [];
  
          // Check the search term and fetch relevant data
          if (searchTerm.includes('beach')) {
            recommendations = data.beaches.slice(0, 2);  // Get 2 beach recommendations
          } else if (searchTerm.includes('temple')) {
            recommendations = data.temples.slice(0, 2);  // Get 2 temple recommendations
          } else if (searchTerm.includes('country')) {
            recommendations = data.country.cities.slice(0, 2);  // Get 2 country recommendations
          }
  
          // Display the recommendations
          displayRecommendations(recommendations);
        })
        .catch(error => console.error('Error fetching data:', error));
    });
  
    // Function to display the recommendations
    function displayRecommendations(recommendations) {
      resultsContainer.innerHTML = '';  // Clear previous results
  
      if (recommendations.length === 0) {
        resultsContainer.innerHTML = '<p>No results found. Try searching for "beach", "temple", or "country".</p>';
      } else {
        resultsContainer.style.display = 'block';

        recommendations.forEach(item => {
          const recommendationDiv = document.createElement('div');
          recommendationDiv.classList.add('recommendation-item');
          recommendationDiv.classList.add('recommendation');
          recommendationDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="recommendation-img">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          `;
          resultsContainer.appendChild(recommendationDiv);
        });
      }
    }
  
    // Event listener for the reset button
    resetButton.addEventListener('click', function() {
      searchInput.value = '';  // Clear the search input
      resultsContainer.innerHTML = '';  // Clear the results
    });
  });
  
  