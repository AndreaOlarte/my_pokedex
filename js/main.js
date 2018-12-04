$(document).ready(function(){
  const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
  const MAX_POKEMONS = 40;

  const POKE_QUANTITY = 949;
  var page = 1;
  var pokeName = [];
  var pokeUrl = [];
  var pokeAll = [];

  function getPokemonByName(pokemon){
    $.ajax({
      url: pokeAPI + pokemon.name +'/',
      type: 'GET',
      success: function(pokemon){
        loadPokemon(pokemon); 
      },
      error: function(error){
        console.log(error);
      }
    }); 
  }

  function unloadPokemon(){
    $('#pokecontainer').empty();
  }

  function loadPokemon(pokemon){
    var container = document.createElement("div");
    container.setAttribute("class", "pokecard");

    var pname = document.createElement("p");
    pname.innerHTML = pokemon.name;
    pname.setAttribute("class", "pokename");

    var img = document.createElement("img")
    img.src = pokemon.sprites.front_default;

    container.appendChild(pname);
    container.appendChild(img);
    $("#pokecontainer").append(container);
  }

  function loadPage(value){
    var li = document.createElement("li");
    li.setAttribute("class", "page-item");
    var anchor = document.createElement("a");
    anchor.innerHTML = value + 1;
    anchor.setAttribute("class", "page-link");
    li.appendChild(anchor);
    $("#pagination").append(li);
  }

  // function loadEdgePage(icon, srtext){
  //   var li = document.createElement("li");
  //   li.setAttribute("class", "page-item");
  //   li.setAttribute("id", srtext);
  //   var anchor = document.createElement("a");
  //   anchor.setAttribute("class", "page-link");
  //   anchor.setAttribute("aria-label", srtext);
  //   var span1 = document.createElement("span");
  //   span1.innerHTML = icon;
  //   span1.setAttribute("aria-hidden", true);
  //   var span2 = document.createElement("span");
  //   span2.innerHTML = srtext;
  //   span2.setAttribute("class", "sr-only");
  //   li.appendChild(anchor);
  //   $("#pagination").append(li);
  // }

  function getAll(){
    $.ajax({
      url: pokeAPI,
      type: 'GET',
      success: function(pokemons){
        var pokemons = pokemons.results;
        var currentPageLimit = MAX_POKEMONS*page;

        for(var i=(currentPageLimit-MAX_POKEMONS); i<currentPageLimit; i++){
          if(i < 949){
            let pokemon = {
              name: pokemons[i].name,
              url: pokemons[i].url
            }
            pokeAll.push(pokemon);
          }
        }

        pokeAll.map(pokemon => getPokemonByName(pokemon));
      },
      error: function(error){
        alert('Pokemon not found');
      }
    }); 
  }

  function nextPage(){
    if(page < (POKE_QUANTITY/MAX_POKEMONS)){
      page++;
      unloadPokemon();
      getAll();
    }
  }

  getAll();
  
  const search = (event) => {
    event.preventDefault();
    var pokename = document.getElementById("pokenumber").value
    goTo(pokename);
    // $.ajax({
    //   url: pokeAPI + pokename +'/',
    //   type: 'GET',
    //   success: function(pokemon){
    //     loadPokemon(pokemon); 
    //   },
    //   error: function(error){
    //     console.log(error);
    //   }
    // }); 
    // getPokemonByName(pokename);
  }

  function loadPagination() {
    // loadEdgePage('Previous', '&laquo;');
    for (var i = 0; i < (POKE_QUANTITY/MAX_POKEMONS); i++){
      loadPage(i);
    }
    // loadEdgePage('Next', '&raquo;');

    $('.page-link').on('click', function(){
      page = $(this).html();
      unloadPokemon();
      pokeAll = [];
      getAll();
    });

    // $("#Next").on('click', nextPage);
  }

  function goTo(pokename){
    window.open('single-pokemon-details.html?pokemon=' + (pokename), '_blank');
  }

  loadPagination();

  document.getElementById("pokeform").addEventListener('submit', search);
});