/*--------------------------------------------------
ONLY FOR TEST PURPOSES
----------------------------------------------------*/
//Example fetch using pokemonapi.co
/* document.querySelector('button').addEventListener('click', getFetch)
document.querySelector('h2').innerText = localStorage.getItem('books')

function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)
  const url = `https://openlibrary.org/isbn/${choice}.json`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.title)
        if(!localStorage.getItem('books')){
          localStorage.setItem('books', data.title)
        }else{
        let books = localStorage.getItem('books') + " ; " + data.title
        localStorage.setItem('books', books)
        }
        
       
        document.querySelector('h2').innerText = localStorage.getItem('books') 
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
} */
if(!localStorage.getItem('newBooks')){
  localStorage.setItem('newBooks', JSON.stringify([])) //browser can't hold array, with stringyfy arrays are converted to string
}
document.querySelector('button').addEventListener('click', getFetch)



function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://openlibrary.org/isbn/${choice}.json`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if(data.title){ 
        let newBooks = JSON.parse(localStorage.getItem('newBooks')) // convert stringify array to real array
        let bookIndex = newBooks.findIndex(book => book.title === data.title)
        if(bookIndex != -1){
          newBooks[bookIndex].count += 1
        }else{
          /* newBooks.push(data.title) */
          newBooks.push({ title: data.title, count: 1 }) 
        }
        
        localStorage.setItem('newBooks', JSON.stringify(newBooks))
        updateList() //we called this func even it's bulid later!!!!
        }
        //localStorage.setItem('books', newBooks)
        //console.log(newBooks);
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
      //updateList();
     // location.reload(); // Reload the page
}
function updateList() {
  let ul = document.querySelector('ul')
  ul.innerHTML = ''
  let newBooks = JSON.parse(localStorage.getItem('newBooks'))
  if (newBooks !== null) {
    for (let i = 0; i < newBooks.length; i++) {
      let li = document.createElement('li')
      if (newBooks[i].count > 1) {
        li.textContent = `${newBooks[i].title} (${newBooks[i].count})`
      } else {
        li.textContent = newBooks[i].title
      }
      ul.appendChild(li)
    }
  }
}
