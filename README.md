# **Información:**

## **Pokemons (endpoint)**
**GET**

https://pokemon-pi-production-6a8f.up.railway.app/pokemons 

```json 
[
  {
    "id": 1,
    "name": "bulbasaur",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png",
    "hp": 45,
    "attack": 49,
    "defense": 49,
    "speed": 45,
    "height": 7,
    "weight": 69,
    "types": "grass, poison",
    "created": false
  },
  {
    "id": "33558f8f-e206-443d-bef3-9d7ca33f7799",
    "name": "poki",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/2.png",
    "hp": 60,
    "attack": 62,
    "defense": 63,
    "speed": 60,
    "height": 10,
    "weight": 130,
    "Types": [
      {
        "name": "normal"
      },
      {
        "name": "ghost"
      }
    ],
    "created": true
  }
  ]
```

https://pokemon-pi-production-6a8f.up.railway.app/pokemons/{ id }
```json
[
  {
    "id": 3,
    "name": "venusaur",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/3.png",
    "hp": 80,
    "attack": 82,
    "defense": 83,
    "speed": 80,
    "height": 20,
    "weight": 1000,
    "types": "grass, poison",
    "created": false
  }
]
```

**POST**

https://pokemon-pi-production-6a8f.up.railway.app/pokemons

Datos requeridos: 
```json
 {
    "name": "",
    "image": "https:/../img.png",
    "hp": 0,
    "attack": 0,
    "defense": 0,
    "speed": 0,
    "height": 0,
    "weight": 0,
    "types": ["grass", "poison"]
  }
```


## **Types (endpoint)**
**GET**

https://pokemon-pi-production-6a8f.up.railway.app/types

```json
 [
  {
    "id": "53c33180-ed6e-11ed-bc16-e39cf8cb1ea3",
    "name": "fighting"
  },
  {
    "id": "53c30a70-ed6e-11ed-bc16-e39cf8cb1ea3",
    "name": "normal"
  }
  ]
```