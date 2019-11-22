async function search() {
    var movieInput = document.getElementById('movieSearch').value
    if(movieInput != ""){
        searchTerm = movieInput.replace(' ', '+');
        url = '/movie/' + searchTerm
        let res = await fetch(url)
        if(res.status != 200){
            throw new Error(response.status + ': ' + response.statusText)
        }else{
            let data =  await res.json();
            printRespons(data)
        }
    }
}

async function printRespons(data) {
  
    var movieHolder = document.getElementById('movieHolder');
    movieHolder.innerHTML = '';

    data.Search.forEach(function(movie){
        var movieCard = document.createElement('div')
        var title  = document.createElement('h3');
        var year = document.createElement('p');
        var type = document.createElement('p');
        var textholder = document.createElement('div');

        
        movieCard.style.backgroundImage = "url("+ movie.Poster +")";
        title.innerHTML = movie.Title    
        year.innerHTML = movie.Year
        type.innerHTML = movie.Type
        textholder.classList.add('movie-text-holder')
        movieCard.classList.add("movie-card");
        movieCard.classList.add("clearfix");
        title.classList.add("movie-title");
        year.classList.add("movie-year");
        type.classList.add("movie-type");
    
        textholder.append(title)
        textholder.append(year)
        textholder.append(type)
        movieCard.append(textholder)
        movieHolder.append(movieCard)
    });
}



