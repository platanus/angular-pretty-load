angular
  .module('prettyLoadDemo', ['platanus.prettyLoad'])

angular
  .module('prettyLoadDemo')
  .controller('DemoController', DemoController);

function DemoController() {
  this.images = [
    {
      width: 1032,
      height: 774,
      color: '#DB9C49',
      url: 'https://i.ytimg.com/vi/m8rVErdtODA/maxresdefault.jpg'
    },
    {
      width: 680,
      height: 200,
      color: '#E3CCBA',
      url: 'http://thedaoofdragonball.com/wp-content/uploads/2013/01/google-glass-dbz-scouter-goku-vegeta.jpg'
    },
    {
      width: 535,
      height: 301,
      color: '#0F31DC',
      url: 'http://www.filmofilia.com/wp-content/uploads/2012/11/dragonball-z-kai.jpg'
    },
    {
      width: 640,
      height: 360,
      color: '#5E94A0',
      url: 'http://i.ytimg.com/vi/EA27-QHe7MA/maxresdefault.jpg'
    },
    {
      width: 300,
      height: 450,
      color: '#2C2529',
      url: 'http://cdn.fontmeme.com/images/Dragon-Ball-Z-TV-Series.jpg'
    }
  ];
}
