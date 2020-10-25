export const getData = {
  url: 'products.json',
  get(process) {
    fetch(this.url)
      .then((response) => response.json())
      .then(process)
  },
  // product(callback) {
  //   this.get((data) => {
  //     return callback(data)
  //   })
  // },
}
