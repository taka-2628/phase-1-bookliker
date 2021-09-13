document.addEventListener("DOMContentLoaded", () => {
    getFetch()
});

function getFetch(){
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(bookArr => handleBookArr(bookArr))
}

function handleBookArr(bookArr){
    for (let book of bookArr){
        renderTitle(book)
    }
}

function renderTitle(book){
    let listUl = document.getElementById('list');

    let titleLi = document.createElement('li');
    titleLi.textContent = book['title']
    
    listUl.appendChild(titleLi)

    makeTitleInteractive(book, titleLi)
}

function makeTitleInteractive(book, titleLi){
    titleLi.addEventListener('click', () => {
        renderDetail(book)
    })
}

function renderDetail(book){
    let detailDiv = document.getElementById('show-panel')
        detailDiv.textContent = ''

        let img = document.createElement('img');
        let author = document.createElement('h4');
        let desc = document.createElement('p');
        let likeBtn = document.createElement('button');
        let usersLikedUl = document.createElement('ul');
        
        img.src = book['img_url'];
        author.textContent = `Author: ${book['author']}`;
        desc.innerHTML = `<strong>Description:</strong><br>${book['description']}`;
        usersLikedUl.textContent = 'Liked by:';
        likeBtn.textContent = 'LIKE';

        book['users'].forEach(user => {
            let userLi = document.createElement('li')
            userLi.textContent = user['username']
            usersLikedUl.appendChild(userLi)
        })

        detailDiv.textContent = ''
        detailDiv.appendChild(img);
        detailDiv.appendChild(author)
        detailDiv.appendChild(desc);
        detailDiv.appendChild(likeBtn)
        detailDiv.appendChild(usersLikedUl);

        makeLikeBtnInteractive(book, likeBtn)
}

function makeLikeBtnInteractive(book, likeBtn){
    let updatedUserArr = [
        ...book['users'], 
        {
            id: 5, 
            username: 'feels-like-summer'
        }
    ];
    likeBtn.addEventListener('click', () => {
        // console.log(book['users'])
        // console.log(updatedUserArr)
        fetch(`http://localhost:3000/books/${book['id']}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({users: updatedUserArr})
        })
        .then(res => res.json())
        .then(updatedBookObj => renderDetail(updatedBookObj))
    })   
}