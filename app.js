document.addEventListener('DOMContentLoaded', () => {
    const mainPage = document.getElementById('mainPage');
    const addBookSection = document.getElementById('addBookSection');
    const listBooksSection = document.getElementById('listBooksSection');
    const completedBooksSection = document.getElementById('completedBooksSection');
    const borrowHistorySection = document.getElementById('borrowHistorySection');

    // Navigation Links
    const mainPageLink = document.getElementById('mainPageLink');
    const addBookLink = document.getElementById('addBookLink');
    const listBooksLink = document.getElementById('listBooksLink');
    const completedBooksLink = document.getElementById('completedBooksLink');
    const borrowHistoryLink = document.getElementById('borrowHistoryLink');

    // Hide all sections except main page
    function hideAllSections() {
        mainPage.classList.remove('active');
        addBookSection.classList.remove('active');
        listBooksSection.classList.remove('active');
        completedBooksSection.classList.remove('active');
        borrowHistorySection.classList.remove('active');
    }

    // Show the selected section
    function showSection(section) {
        hideAllSections();
        section.classList.add('active');
    }

    // Event listeners for navigation
    mainPageLink.addEventListener('click', () => showSection(mainPage));
    addBookLink.addEventListener('click', () => showSection(addBookSection));
    listBooksLink.addEventListener('click', () => showSection(listBooksSection));
    completedBooksLink.addEventListener('click', () => showSection(completedBooksSection));
    borrowHistoryLink.addEventListener('click', () => showSection(borrowHistorySection));

    // Show main page by default
    showSection(mainPage);
});

document.addEventListener('DOMContentLoaded', () => {
        const bookForm = document.getElementById('bookForm');
        const bookList = document.getElementById('bookList');
        const completedBooks = document.getElementById('completedBooks');
        const borrowHistory = document.getElementById('borrowHistory');

        let books = [];
        let borrowRecords = [];

    // Add new book event
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = document.getElementById('year').value;
        const totalPages = document.getElementById('totalPages').value;
        const pagesRead = document.getElementById('pagesRead').value;
        const borrowedFrom = document.getElementById('borrowedFrom').value;
        const borrowedDate = document.getElementById('borrowedDate').value;
        const borrower = document.getElementById('borrower').value;
        const borrowerDate = document.getElementById('borrowerDate').value;

        const newBook = {
            title,
            author,
            year,
            totalPages: parseInt(totalPages),
            pagesRead: parseInt(pagesRead),
            borrowedFrom,
            borrowedDate,
            borrower,
            borrowerDate
        };

        books.push(newBook);
        recordBorrowing(newBook); // Add to borrowing history
        renderBooks();
        renderHistory();
        bookForm.reset();
    });


    function recordBorrowing(book) {
        let record;
        if (book.borrowedFrom) {
            record = `I borrowed "${book.title}" from ${book.borrowedFrom} on ${book.borrowedDate}`;
        } else {
            
            record = `${book.borrower} borrowed "${book.title}" on ${book.borrowerDate}`;
        }
        borrowRecords.push(record);
    }

    // Render book list and completed books
    function renderBooks() {
        bookList.innerHTML = '';
        completedBooks.innerHTML = '';

        books.forEach((book, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.year}</td>
                <td>${book.totalPages}</td>
                <td>${book.pagesRead}</td>
                <td>${book.borrowedFrom}</td>
                <td>${book.borrowedDate}</td>
                <td>${book.borrower}</td>
                <td>${book.borrowerDate}</td>
                <td>
                    <button onclick="editBook(${index})">Edit</button>
                    <button onclick="deleteBook(${index})">Delete</button>
                </td>
            `;
            bookList.appendChild(row);

            // Move to completed if pages read equals total pages
            if (book.pagesRead >= book.totalPages) {
                const li = document.createElement('li');
                li.textContent = `${book.title} by ${book.author} (Year: ${book.year})`;
                completedBooks.appendChild(li);
            }
        });
    }

    // Render borrowing history
    function renderHistory() {
        borrowHistory.innerHTML = '';
        borrowRecords.forEach(record => {
            const li = document.createElement('li');
            li.textContent = record;
            borrowHistory.appendChild(li);
        });
    }

    window.editBook = function (index) {
        const book = books[index];  // Get the book details
    
        // Populate the form with the book details
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('year').value = book.year;
        document.getElementById('totalPages').value = book.totalPages;
        document.getElementById('pagesRead').value = book.pagesRead;
        document.getElementById('borrowedFrom').value = book.borrowedFrom;
        document.getElementById('borrowedDate').value = book.borrowedDate;
        document.getElementById('borrower').value = book.borrower;
        document.getElementById('borrowerDate').value = book.borrowerDate;
    
        // Remove the book from the array temporarily for editing
        books.splice(index, 1);
    
        // Redirect to the Add Book page
        hideAllSections();  // Hide all other sections
        document.getElementById('addBookSection').classList.add('active');  // Show the Add Book section
    };
// Function to hide all sections
function hideAllSections() {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
}

// Event listeners for navigation
mainPageLink.addEventListener('click', () => showSection(mainPage));
addBookLink.addEventListener('click', () => showSection(addBookSection));
listBooksLink.addEventListener('click', () => showSection(listBooksSection));
completedBooksLink.addEventListener('click', () => showSection(completedBooksSection));
borrowHistoryLink.addEventListener('click', () => showSection(borrowHistorySection));

// Function to show a specific section
function showSection(section) {
    hideAllSections();
    section.classList.add('active');
}

// Show main page by default
showSection(mainPage);
    

// Render book list and completed books
function renderBooks() {
    bookList.innerHTML = '';
    completedBooks.innerHTML = '';
    
    books.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>${book.totalPages}</td>
            <td>${book.pagesRead}</td>
            <td>${book.borrowedFrom}</td>
            <td>${book.borrowedDate}</td>
            <td>${book.borrower}</td>
            <td>${book.borrowerDate}</td>
            <td>
                <button onclick="editBook(${index})" action="Edit">Edit</button>
                <button onclick="deleteBook(${index})">Delete</button>
            </td>
        `;
        bookList.appendChild(row);
        
        // Move to completed if pages read equals total pages
        if (book.pagesRead >= book.totalPages) {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author} (Year: ${book.year})`;
            completedBooks.appendChild(li);
        }
    });
}

// Add new book event
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const totalPages = document.getElementById('totalPages').value;
    const pagesRead = document.getElementById('pagesRead').value;
    const borrowedFrom = document.getElementById('borrowedFrom').value;
    const borrowedDate = document.getElementById('borrowedDate').value;
    const borrower = document.getElementById('borrower').value;
    const borrowerDate = document.getElementById('borrowerDate').value;

    const newBook = {
        title,
        author,
        year,
        totalPages: totalPagesInt,
        pagesRead: pagesReadInt,
        borrowedFrom,
        borrowedDate,
        borrower,
        borrowerDate
    };
    
    books.push(newBook);
    if (borrowedFrom || borrower) {
        recordBorrowing(newBook); // Add to borrowing history
    }
    renderBooks();
    renderHistory();
    bookForm.reset();
});

function renderHistory() {
    borrowHistory.innerHTML = '';
    borrowRecords.forEach(record => {
        const li = document.createElement('li');
        li.textContent = record;
        borrowHistory.appendChild(li);
    });
}

// Record borrowing
function recordBorrowing(book) {
    let record;
    if (book.borrowedFrom && book.borrowedDate) {
        record = `I borrowed "${book.title}" from ${book.borrowedFrom} on ${book.borrowedDate}`;
    } else if (book.borrower && book.borrowerDate) {
        record = `${book.borrower} borrowed "${book.title}" on ${book.borrowerDate}`;
    }
    if (record) {
        borrowRecords.push(record);
    }
}
// Function to delete a book
window.deleteBook = function(index) {
    // Remove the book from the array
    books.splice(index, 1);
    
    // Re-render the book list and history after deletion
    renderBooks();
    renderHistory();
};

});


