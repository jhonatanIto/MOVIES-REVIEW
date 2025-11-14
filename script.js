const input = document.getElementById('input');
const boxContainer = document.getElementById('boxContainer');
const body = document.getElementById('body')

const savedMovies = JSON.parse(localStorage.getItem('movies')) || []

const movies = [];
movies.push(...savedMovies);

movies.forEach(movie =>createCards(movie));


  input.addEventListener('keydown', function(e){
    if(e.key ==='Enter' && input.value !== "") {
      createModal()
    } else if(e.key ==='Enter' && input.value === ""){
      alert('Insert movie name')
    }
  })




function createModal(){
    const modalBody = document.createElement('div');
    const modalContainer = document.createElement('div');
    const modalHeader = document.createElement('div');
    const modalExitLeft = document.createElement('div');
    const modalName = document.createElement('div');
    const modalExit = document.createElement('div');


    const modalMain = document.createElement('div');
    const mainLeft = document.createElement('div');
    const modalStars = document.createElement('div');
    const star1 = document.createElement('div');
    const star2 = document.createElement('div');
    const star3 = document.createElement('div');
    const star4 = document.createElement('div');
    const star5 = document.createElement('div');
    const mainRight = document.createElement('div');
    const modalNotes = document.createElement('textarea');
    const modalDone = document.createElement('div');
    const imageUrl = document.createElement('input');
    const modalImageBox = document.createElement('div');
    const modalImage = document.createElement('img');

    modalName.innerHTML = input.value
    modalExit.innerHTML = 'X';
    star1.innerHTML = '☆';
    star2.innerHTML = '☆';
    star3.innerHTML = '☆';
    star4.innerHTML = '☆';
    star5.innerHTML = '☆';
    modalDone.innerHTML = 'DONE';
    imageUrl.placeholder = 'Insert image adress'

    modalBody.classList.add('modalBody');
    modalContainer.classList.add('modalContainer');
    modalHeader.classList.add('modalHeader');
    modalExitLeft.classList.add('modalExitLeft');
    modalName.classList.add('modalName');
    modalExit.classList.add('modalExit');

    modalMain.classList.add('modalMain');
    mainLeft.classList.add('mainLeft');
    modalStars.classList.add('modalStars');
    star1.classList.add('star');
    star2.classList.add('star');
    star3.classList.add('star');
    star4.classList.add('star');
    star5.classList.add('star');
    modalNotes.classList.add('modalNotes');
    modalDone.classList.add('modalDone');

    mainRight.classList.add('mainRight');
    imageUrl.classList.add('imageUrl');
    modalImageBox.classList.add('modalImageBox');
    modalImage.classList.add('modalImage');

    body.appendChild(modalBody);
    modalBody.appendChild(modalContainer);
    modalContainer.appendChild(modalHeader);
    modalContainer.appendChild(modalMain);

    modalHeader.appendChild(modalExitLeft);
    modalHeader.appendChild(modalName);
    modalHeader.appendChild(modalExit);

    modalMain.appendChild(mainLeft);
    modalMain.appendChild(mainRight);

    mainLeft.appendChild(modalStars);
    modalStars.appendChild(star1);
    modalStars.appendChild(star2);
    modalStars.appendChild(star3);
    modalStars.appendChild(star4);
    modalStars.appendChild(star5);
    
    mainLeft.appendChild(modalNotes);
    mainLeft.appendChild(modalDone);

    mainRight.appendChild(imageUrl);
    mainRight.appendChild(modalImageBox);
    modalImageBox.appendChild(modalImage);

    let rating = 0
    let imageAdress = ''
    
    modalExit.addEventListener('click', function(){
        modalBody.style.display = 'none'
        input.value = ''
    })

    imageUrl.addEventListener('keydown', function(e){
      if(e.key ==='Enter' && imageUrl.value !== ""){
        modalImage.src = imageUrl.value
        modalImage.style.display = 'flex'
        imageAdress = imageUrl.value
        console.log(imageUrl.value)
      }
    })

    function starRate(){
      star1.addEventListener('mouseenter', ()=>{
        star1.style.color =   'yellow';
      })
      star1.addEventListener('mouseleave', ()=>{
        star1.style.color =   'black';
      })
      star1.addEventListener('click', ()=>{
        star1.innerHTML =   '⭐';
        star2.innerHTML =   '☆';
        star3.innerHTML =   '☆';
        star4.innerHTML =   '☆';
        star5.innerHTML =   '☆';
        rating = 1;
        const all = document.querySelectorAll('.star')
        all.forEach(el =>{
          el.style.fontSize = '30px'
        })
      })
      

// ONE STAR

      star2.addEventListener('mouseenter', ()=>{
        star1.style.color =   'yellow';
        star2.style.color =   'yellow';
      })
      star2.addEventListener('mouseleave', ()=>{
        star1.style.color =   'black';
        star2.style.color =   'black';
      })
       star2.addEventListener('click', ()=>{
        star1.innerHTML =   '⭐';
        star2.innerHTML =   '⭐';
        star3.innerHTML =   '☆';
        star4.innerHTML =   '☆';
        star5.innerHTML =   '☆';
        rating = 2;
        const all = document.querySelectorAll('.star')
        all.forEach(el =>{
          el.style.fontSize = '30px'
        })
      })
     

// TWO STARS
      star3.addEventListener('mouseenter', ()=>{
        star1.style.color =   'yellow';
        star2.style.color =   'yellow';
        star3.style.color =   'yellow';
      })
      star3.addEventListener('mouseleave', ()=>{
        star1.style.color =   'black';
        star2.style.color =   'black';
        star3.style.color =   'black';
      })
      star3.addEventListener('click', ()=>{
        star1.innerHTML =   '⭐';
        star2.innerHTML =   '⭐';
        star3.innerHTML =   '⭐';
        star4.innerHTML =   '☆';
        star5.innerHTML =   '☆';
        rating = 3;
        const all = document.querySelectorAll('.star')
        all.forEach(el =>{
          el.style.fontSize = '30px'
        })
      })
// THREE STARS

        star4.addEventListener('mouseenter', ()=>{
        star1.style.color =   'yellow';
        star2.style.color =   'yellow';
        star3.style.color =   'yellow';
        star4.style.color =   'yellow';
      })
      
        star4.addEventListener('mouseleave', ()=>{
        star1.style.color =   'black';
        star2.style.color =   'black';
        star3.style.color =   'black';
        star4.style.color =   'black';
      })
       star4.addEventListener('click', ()=>{
        star1.innerHTML =   '⭐';
        star2.innerHTML =   '⭐';
        star3.innerHTML =   '⭐';
        star4.innerHTML =   '⭐';
        star5.innerHTML =   '☆';
        rating = 4;
        const all = document.querySelectorAll('.star')
        all.forEach(el =>{
          el.style.fontSize = '30px'
        })
      })
//  FOUR STARS

        star5.addEventListener('mouseenter', ()=>{
        star1.style.color =   'yellow';
        star2.style.color =   'yellow';
        star3.style.color =   'yellow';
        star4.style.color =   'yellow';
        star5.style.color =   'yellow';
      })
      star5.addEventListener('mouseleave', ()=>{
        star1.style.color =   'black';
        star2.style.color =   'black';
        star3.style.color =   'black';
        star4.style.color =   'black';
        star5.style.color =   'black';
      })
        star5.addEventListener('click', ()=>{
        star1.innerHTML =   '⭐';
        star2.innerHTML =   '⭐';
        star3.innerHTML =   '⭐';
        star4.innerHTML =   '⭐';
        star5.innerHTML =   '⭐';
        rating = 5
        const all = document.querySelectorAll('.star')
        all.forEach(el =>{
          el.style.fontSize = '30px'
        })
      })
 // FIVE STARS     
      
    }
    starRate()

    modalDone.addEventListener('click', ()=>{
        movies.push({
          name: input.value,
          rate: rating,
          review: modalNotes.value,
          img: imageAdress
        });

        localStorage.setItem('movies', JSON.stringify(movies));

        const thisMovie = movies.find(film => film.name ===input.value);
        createCards(thisMovie)

        modalBody.style.display ='none'
        input.value = ''
      })


}

function createCards(movie){
  const box = document.createElement('div');
  const boxName = document.createElement('div');
  const movieImage = document.createElement('img');
  const starsContainer = document.createElement('div');
  const stars = document.createElement('div')
  const notes = document.createElement('div')

  boxContainer.appendChild(box)
  box.appendChild(boxName)
  box.appendChild(movieImage)
  box.appendChild(starsContainer)
  starsContainer.appendChild(stars)
  starsContainer.appendChild(notes)

  box.classList.add('box')
  boxName.classList.add('boxName')
  movieImage.classList.add('movieImage')
  starsContainer.classList.add('stars')
  notes.classList.add('notes')

  boxName.innerHTML = movie.name
  movieImage.src = movie.img
  notes.innerHTML = 'Review notes'
  switch(movie.rate){
    case 1 : stars.innerHTML = '⭐';
    break;
    case 2 : stars.innerHTML = '⭐⭐';
    break;
    case 3 : stars.innerHTML = '⭐⭐⭐';
    break;
    case 4 : stars.innerHTML = '⭐⭐⭐⭐';
    break;
    case 5 : stars.innerHTML = '⭐⭐⭐⭐⭐';
    break;
    default: console.log('erro')
  }

  notes.addEventListener('click', ()=>{
    createModal(movie)
  })

}

console.log(movies)