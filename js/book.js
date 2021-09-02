// console.log("hi")
// spinner
const toggleSpinner = dispayStyle => {
    document.getElementById("spinner").style.display = dispayStyle
}
const toggleSearch = (dispayStyle1, dispayStyle2) => {
    document.getElementById("card_main_div").style.display = dispayStyle1
    document.getElementById("total_book").style.display = dispayStyle2
}

// load onClick
const LoadAll = () => {
    const search_txt = document.getElementById("Search_txt")

    const books = search_txt.value
    if (books.length === 0) {
        search_txt.value = ""
        search_txt.setAttribute("placeholder", "You Didn't search for anything!")
    } else {
        toggleSpinner("block")
        toggleSearch("none", "none")
        search_txt.setAttribute("placeholder", "Search For the Books..")
        const url = `http://openlibrary.org/search.json?q=${books}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data))

        search_txt.value = ""

    }
}

// book display

const displayBooks = datas => {
    console.log(datas.numFound)
    const book_data = datas.docs
        // console.log(book_data.length)
    const card_main_div = document.getElementById("card_main_div")
    card_main_div.innerHTML = ""

    const total_book = document.getElementById("total_book")
    total_book.innerHTML = ""
    const p_book = document.createElement("div")
    p_book.innerHTML = `
    <h5 class="m-auto">Total ${datas.numFound} books found</h5>
    `
    total_book.appendChild(p_book)
    toggleSpinner("none")
    toggleSearch("flex", "block")
        // alert if no books 
    if (datas.numFound === 0) {

        const alert = document.getElementById("alert")
        alert.innerHTML = ""
        const div = document.createElement("div")

        div.innerHTML =
            `
<div class="alert alert-primary d-flex align-items-center" role="alert">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
  <div>
    Sorry ,no book found!!
  </div>
</div>
    `
        alert.appendChild(div)
        toggleSpinner("none")
        toggleSearch("flex", "block")
    } else {
        const alert = document.getElementById("alert")
        alert.innerHTML = ""

        book_data.forEach(element => {
            const card_div = document.createElement("div")
            card_div.classList.add("col")

            if (element.cover_i === undefined) {
                card_div.innerHTML =
                    `     
                    
              <div class="card mb-3 ">
                <img src="images/no_images.jpg" class="card-img-top" alt="..." height="500px" width="500px"> 
                <div class="card-body h11 overflow-hidden">
                    <h4 class="card-title"><span style="font-weight: 900; color: black;">${element.title}</span></h4>
                    <p class="card-text"><span style="font-weight: 700; color: darkslategray;">BY</span> ${element.author_name}</p>
                    <p class="card-text"><span style="font-weight: 700; color: darkslategray;">Published By</span> ${(element.publisher)}</p>
                    <p class="card-text"><span style="font-weight: 700; color: darkslategray;">Publishing year</span> ${element.first_publish_year}</p>
                    
                </div>
            </div>
             `
            } else {
                card_div.innerHTML =
                    `      
              <div class="card mb-4 ">

                <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-L.jpg" class="card-img-top" alt="..." height="500px" width="500px"> 
                <div class="card-body h11 overflow-hidden">
                    <h5 class="card-title"><span style="font-weight: 900; color: black;">${element.title}</span></h5>
                    <p class="card-text"><span style="font-weight: 700; color: darkslategray;">BY</span> ${element.author_name}</p>
                    <p class="card-text"><span style="font-weight: 700; color: darkslategray;">Published By</span> ${element.publisher}</p>
                    <p class="card-text"><span style="font-weight: 700; color: darkslategray;">Publishing year</span> ${element.first_publish_year}</p>
                </div>
            </div>
             `
            }

            card_main_div.appendChild(card_div)
            toggleSpinner("none")
            toggleSearch("flex", "block")




        });

    }

}