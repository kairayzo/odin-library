const myLibrary = [];
const form = document.getElementById('form')
const cards = document.getElementById('cards')
const readBtn = document.querySelector('.read-btn')
const addBtn = document.getElementById('add-btn')
const closeBtn = document.getElementById('close')
const removeBtn = document.querySelectorAll('.remove-btn')
const submitBtn = document.getElementById('submit')

const dragArea = document.querySelector('.cards')
new Sortable(dragArea, {
    animation: 350
})

function Book(title, author, pages, read) {
    // the constructor...
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id

    this.toggleRead = function(button){
        switch (button.firstChild.innerHTML) {
            case 'Read':
                this.read = 'unread'
                button.firstChild.innerHTML = 'Unread'
                updateLibrary(this.id, read, 'unread')
                break
                case 'Unread':
                    this.read = 'read'
                    button.firstChild.innerHTML = 'Read'
                    updateLibrary(this.id, read, 'read')
                break
        }
    }
    
    this.remove = function(button) {
        const card = button.parentNode.parentNode.parentNode
        cards.removeChild(card)
        updateLibrary(this.id, 'remove')
    }
}

function generateRandom(maxLimit = 100000){
    let rand = Math.random() * maxLimit;  
    rand = Math.floor(rand);
    return rand;
  }

function updateLibrary(id, prop, val=null) {
    const idx = myLibrary.findIndex((book)=> {return book.id == id})
    if (prop == 'remove') {
        myLibrary.splice(idx,1)
    } else {
        myLibrary[idx][prop] = val
    }
    console.log(myLibrary)
}

function toggleRead() {
    switch (readBtn.value) {
        case 'read':
            readBtn.value = 'unread'
            readBtn.style.backgroundColor = '#E5E5E5'
            readBtn.style.color = 'black'
            readBtn.style.borderWidth = '1px'
            break
        case 'unread':
            readBtn.value = 'read'
            readBtn.style.backgroundColor = '#e40924'
            readBtn.style.color = 'white'
            break
    }
}

function addBookToLibrary(book) {
    // do stuff here
    const card = document.createElement('div')
    card.classList.add('card')
    const title = document.createElement('div')
    title.classList.add('title')
    title.innerHTML= book.title

    const subheading = document.createElement('div')
    subheading.classList.add('subheading')
    const author = document.createElement('div')
    author.classList.add('author')
    author.innerHTML= 'by ' + book.author
    const pages = document.createElement('div')
    pages.classList.add('pages')
    pages.innerHTML= book.pages + ' pages'
    subheading.appendChild(author)
    subheading.appendChild(pages)

    const cardBottom = document.createElement('div')
    cardBottom.classList.add('card-bottom')
    const cover = document.createElement('div')
    cover.classList.add('cover')
    cover.style.backgroundImage = `url(https://source.unsplash.com/random?sig=${generateRandom()})`
    const buttons = document.createElement('div')
    buttons.classList.add('buttons')

    const readBtn = document.createElement('button')
    readBtn.classList.add('read')
    const unreadSpan = document.createElement('span')
    unreadSpan.innerHTML = 'Unread'
    const unreadImg = document.createElement('img')
    unreadImg.src = '/images/book.svg'
    readBtn.appendChild(unreadSpan)
    readBtn.appendChild(unreadImg)
    readBtn.addEventListener('click', () => book.toggleRead(readBtn))

    const removeBtn = document.createElement('button')
    removeBtn.classList.add('remove')
    const removeSpan = document.createElement('span')
    removeSpan.innerHTML = 'Remove'
    const removeImg = document.createElement('img')
    removeImg.src = '/images/delete.svg'
    removeBtn.appendChild(removeSpan)
    removeBtn.appendChild(removeImg)
    removeBtn.addEventListener('click',() => book.remove(removeBtn))

    const rearrangeBtn = document.createElement('button')
    rearrangeBtn.classList.add('rearrange')
    const rearrangeSpan = document.createElement('span')
    rearrangeSpan.innerHTML = 'Rearrange'
    const rearrangeImg = document.createElement('img')
    rearrangeImg.src = '/images/swap.svg'
    rearrangeBtn.appendChild(rearrangeSpan)
    rearrangeBtn.appendChild(rearrangeImg)
    
    buttons.appendChild(readBtn)
    buttons.appendChild(removeBtn)
    buttons.appendChild(rearrangeBtn)

    cardBottom.appendChild(cover)
    cardBottom.appendChild(buttons)
    
    card.appendChild(title)
    card.appendChild(subheading)
    card.appendChild(cardBottom)

    cards.appendChild(card)

    book.id = Date.now()
    myLibrary.push(book)
    console.log(myLibrary)
}

function submitHandler(e) {
    e.preventDefault()
    let title, author, pages, read
    const inputs = form.elements
    for (let i=0; i<inputs.length; i++) {
        console.log(inputs[i].name)
        switch (inputs[i].name) {
            case 'title':
                title = inputs[i].value
                inputs[i].value = ''
                break
            case 'author':
                author = inputs[i].value
                inputs[i].value = ''
                break
            case 'pages':
                pages = inputs[i].value
                inputs[i].value = ''
                break
            case 'read':
                read = inputs[i].value  
                inputs[i].value = 'unread' 
                inputs[i].style.backgroundColor = '#E5E5E5'
                inputs[i].style.color = 'black'
                inputs[i].style.borderWidth = '1px'
                break  
            }
            }
    const newBook = new Book(title, author, pages, read)
    addBookToLibrary(newBook)
    console.log(myLibrary)
}

function handleOpen() {
    modal.style.display = 'flex'
}

function handleClose() {
    modal.style.display = 'none'
}

modal.addEventListener('submit', submitHandler)
readBtn.addEventListener('click', toggleRead)
addBtn.addEventListener('click',handleOpen)
closeBtn.addEventListener('click',handleClose)