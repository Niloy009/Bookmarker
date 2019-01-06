document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {

    //get form value
    var siteName = document.getElementById('siteName').value
    var siteUrl = document.getElementById('siteUrl').value

    //validate form
    validateForm(siteName, siteUrl)

    //save data on the object
    var bookmark = {

        name: siteName,
        url: siteUrl
    }
    //prevent default 
    e.preventDefault()
    
    //clearForm
    document.getElementById('myForm').reset()

    //check the bookmark empty 
    if (localStorage.getItem('fvrtwebs') === null) {

        //init bookmarks array
        var bookmarksArray = []

        //add items
        bookmarksArray.push(bookmark)

        //set to the localStorage
        localStorage.setItem('fvrtwebs', JSON.stringify(bookmarksArray))
    } else {
        //get the va;lue from local storage
        var bookmarksArray = JSON.parse(localStorage.getItem('fvrtwebs'))

        //push to the array new bookmrk
        bookmarksArray.push(bookmark)

        //re-set to nthe local storage
        localStorage.setItem('fvrtwebs', JSON.stringify(bookmarksArray))
    }

    //    //how to work local storage
    //    localStorage.setItem('test', 'Hello World')
    //    console.log(localStorage.getItem('test'))
    //    localStorage.removeItem('test')
    //    console.log(localStorage.getItem('test'))


    //re-call the showbookmark function
    showBookmarks()
}

//delete the bookmark
function deleteBookmark(url) {
    //fetch the bookmark from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('fvrtwebs'));

    //iterate the bookmark and check the valid url

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {

            //remove the bookmark
            bookmarks.splice(i, 1)
        }
    }

    //re-set the bokkmark to the local Storage
    localStorage.setItem('fvrtwebs', JSON.stringify(bookmarks))

    //re-call the showbookmark function
    showBookmarks()

}

//show the bookmarks on the page
function showBookmarks() {

    //get the bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('fvrtwebs'));

    //get the result id
    var showBookmark = document.getElementById('bookmarkResult');

    showBookmark.innerHTML = ''

    //iterate the bookmarks
    for (var i = 0; i < bookmarks.length; i++) {

        var name = bookmarks[i].name
        var url = bookmarks[i].url

        showBookmark.innerHTML += '<div class="card card-body br-light text-center">' +
            '<h3>' + name +
            '<a class="btn btn-outline-success ml-3"  target="_blank" href="' + url + '">Visit</a><a onclick="deleteBookmark(\'' + url + '\')"class="btn btn-danger ml-3" href="#">Delete</a></h3></div>'
    }
}

//validate the form

function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert("Please fill the form")
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)){
        alert("Please Enter The Valid URL Address!!!!")
        return false;
    }
    return true
}