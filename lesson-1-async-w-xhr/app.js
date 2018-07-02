(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    
    const imgRequest = new XMLHttpRequest();
    imgRequest.onload = addImage;
    imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    imgRequest.setRequestHeader('Authorization', 'Client-ID c317071980658d0800e2ba3f633bd5bcdf3a6d9bab61527ce3cd65eb723015a3');
    imgRequest.send();

    const artRequest = new XMLHttpRequest();
    });


  function addImage() {
    let htmlContent;
    const data = JSON.parse(this.responseText);
    console.log(data.results[0].urls.small);
    if(data && data.results && data.results[0]) {
      const firstImg = data.results[0];
      htmlContent = `<figure>
        <img src="${firstImg.urls.small}" alt="${searchedForText}">
        <figcaption>${searchedForText} by ${firstImg.user.name}</figcaption>
      </figure>`;
    } else {
      htmlContent = '<div class="error-no-image">No images available</div>';
    }
     responseContainer.insertAdjacentHTML('afterbegin', htmlContent);   
  };

})();
