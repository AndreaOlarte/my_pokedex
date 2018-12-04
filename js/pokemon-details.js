$(document).ready(function(){
  const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';
  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
  }
  
  var pokename = getUrlVars()['pokemon'];
  console.log(pokename);

  function setPokemonDetails(pokename) {
    $.ajax({
      url: pokeAPI + pokename +'/',
      type: 'GET',
      success: function(pokemon){
        console.log(pokemon);
        loadPokemon(pokemon); 
      },
      error: function(error){
        console.log(error);
      }
    }); 
  
    function loadPokemon(pokemon){
      $('#pokename').text(pokemon.name);
      $('#pokepic').attr('src', pokemon.sprites.front_default);
      $('#weight').text(pokemon.weight);
      $('#height').text(pokemon.height);
      loadAbilities(pokemon.abilities);
      loadTypes(pokemon.types);
    }  
  }

  function loadAbilities(abilities){
    var container = $('#abilities');
    for(var i = 0; i < abilities.length; i++){
      var ability = document.createElement('p');
      console.log(abilities[i].ability.name);
      ability.innerHTML = abilities[i].ability.name;
      container.append(ability);
    }
  }

  function loadTypes(types){
    var container = $('#types');
    for(var i = 0; i < types.length; i++){
      var type = document.createElement('p');
      console.log(types[i].type.name);
      type.innerHTML = types[i].type.name;
      container.append(type);
    }
  }

  const search = (event) => {
    event.preventDefault();
    var pokename = document.getElementById("pokenumber").value
    setPokemonDetails(pokename);
  }

  function unloadPokemon(){
    $('#pokecontainer').empty();
  }

  document.getElementById("pokeform").addEventListener('submit', search);
  setPokemonDetails(pokename);
});