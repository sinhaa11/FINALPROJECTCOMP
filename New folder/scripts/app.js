new Vue({
    el: '#app',
    data: {
      fact: '',
      city: 'London, Ontario',
      weather: {
        temperature: '',
        wind: '',
        description: ''
      },
      word: '',
      definition: {
        word: '',
        phonetic: '',
        partOfSpeech: '',
        definition: ''
      }
    },
    mounted() {
      this.getNewFact();
      this.getWeather();
    },
    methods: {
      getNewFact() {
        fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
          .then(response => response.json())
          .then(data => {
            this.fact = data.text;
          });
      },
      getWeather() {
        fetch(`https://goweather.herokuapp.com/weather/${encodeURIComponent(this.city)}`)
          .then(response => response.json())
          .then(data => {
            this.weather.temperature = data.temperature;
            this.weather.wind = data.wind;
            this.weather.description = data.description;
          });
      },
      getDefinition() {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
          .then(response => response.json())
          .then(data => {
            if (data && data.length > 0) {
              this.definition.word = data[0].word;
              this.definition.phonetic = data[0].phonetic;
              this.definition.partOfSpeech = data[0].meanings[0].partOfSpeech;
              this.definition.definition = data[0].meanings[0].definitions[0].definition;
            }
          });
      }
    }
  });
  