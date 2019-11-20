const baseurl  = 'http://www.omdbapi.com/?'
const apikey = 'apikey=2602bde5&'
let movieId = []

async function search() {
    var movieInput = document.getElementById('movieSearch').value
    if(movieInput != '' && movieInput != null){
       
        try{
            searchTerm = movieInput.replace(' ', '+');
            let movieResponse  = await getMoviesUrl(searchTerm)
            console.log(movieResponse)
                printRespons(movieResponse)
        }
        catch {
            console.log("err")
        }
        
    }
}



function getMoviesUrl(movieInput){
    let url = new URL(baseurl + apikey +'s=' + movieInput)

    return makeRequest(url)
}

async function makeRequest(url) {
    console.log(url)
    let response = await fetch(url)
    if(response.status != 200){
        throw new Error(response.status + ': ' + response.statusText)
    }else{
        console.log("sucsess")
        return await response.json()
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
    /*     $(this).click(function() {
            swal({
                title: 'Oops...',
                text: 'Something went wrong!',
                showClass: {
                    popup: 'animated fadeInDown faster'
                  },
                  hideClass: {
                    popup: 'animated fadeOutUp faster'
                  }
            });
        }); */
        textholder.append(title)
        textholder.append(year)
        textholder.append(type)
        movieCard.append(textholder)
        movieHolder.append(movieCard)
    });
}
