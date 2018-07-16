(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

      fetch('https://api.unsplash.com/search/photos?page=1&query=' + searchedForText, {
        headers: {
          Authorization: 'Client-ID c317071980658d0800e2ba3f633bd5bcdf3a6d9bab61527ce3cd65eb723015a3'
        }
      }).then(resp => resp.json()).then(addImage).catch(e => console.log(e));

      fetch('http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchedForText + '&api-key=ff9b67cdcef449528c40fe593b7af9bc').then(resp => resp.json()).then(addArticles).catch(e => console.log(e));

      function addImage(images) {
        let htmlContent;
        if(images && images.results && images.results[0]) {
          const firstImg = images.results[0];
          htmlContent = `<figure>
            <img src="${firstImg.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImg.user.name}</figcaption>
          </figure>`;
        } else {
          htmlContent = '<div class="error-no-image">No images available</div>';
        }
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);   
      };
      
      function addArticles(artData) {
        let artHtml;
        if(artData) {
          artHtml = artData.response.docs.map(article => `<li>
            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
          </li>`
          );
        } else {
          artHtml = '<div class="error">No Articles Found</div>';
        }
        responseContainer.insertAdjacentHTML('beforeend', `<ul>${artHtml.join('')}</ul>`);
      };
;
    });
})();
