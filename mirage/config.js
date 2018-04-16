export default function() {
  this.passthrough('https://swapi.co/api/**');

  //simulate formatting error
  //this.get('https://swapi.co/api/people', () => {
    //return '{';
  //});

  //simulate network error
  //this.get('https://swapi.co/api/people', {}, 500);
}
