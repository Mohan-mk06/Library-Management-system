// Mock Books Data
export const mockBooks = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        isbn: "978-0-7432-7356-5",
        description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
        available: true,
        coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
        publishedYear: 1925,
        totalCopies: 5,
        availableCopies: 3
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Classic",
        isbn: "978-0-06-112008-4",
        description: "A gripping tale of racial injustice and childhood innocence in the American South.",
        available: true,
        coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
        publishedYear: 1960,
        totalCopies: 4,
        availableCopies: 2
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Science Fiction",
        isbn: "978-0-452-28423-4",
        description: "A dystopian social science fiction novel and cautionary tale about totalitarianism.",
        available: false,
        coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
        publishedYear: 1949,
        totalCopies: 3,
        availableCopies: 0
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        isbn: "978-0-14-143951-8",
        description: "A romantic novel of manners that critiques the British landed gentry at the end of the 18th century.",
        available: true,
        coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
        publishedYear: 1813,
        totalCopies: 6,
        availableCopies: 4
    },
    {
        id: 5,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Classic",
        isbn: "978-0-316-76948-0",
        description: "A story about teenage rebellion and alienation narrated by Holden Caulfield.",
        available: true,
        coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
        publishedYear: 1951,
        totalCopies: 4,
        availableCopies: 1
    },
    {
        id: 6,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        genre: "Fantasy",
        isbn: "978-0-439-70818-8",
        description: "The first novel in the Harry Potter series, following a young wizard's journey.",
        available: true,
        coverImage: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop",
        publishedYear: 1997,
        totalCopies: 8,
        availableCopies: 5
    },
    {
        id: 7,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        isbn: "978-0-547-92822-7",
        description: "A fantasy novel about the quest of home-loving Bilbo Baggins.",
        available: false,
        coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
        publishedYear: 1937,
        totalCopies: 5,
        availableCopies: 0
    },
    {
        id: 8,
        title: "The Da Vinci Code",
        author: "Dan Brown",
        genre: "Mystery",
        isbn: "978-0-307-47492-1",
        description: "A mystery thriller novel exploring an alternative religious history.",
        available: true,
        coverImage: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop",
        publishedYear: 2003,
        totalCopies: 4,
        availableCopies: 2
    }
];

// Mock Users Data
export const mockUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "student@library.com",
        password: "password123",
        role: "student",
        active: true,
        joinedDate: "2024-01-15"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "faculty@library.com",
        password: "password123",
        role: "faculty",
        active: true,
        joinedDate: "2023-09-01"
    },
    {
        id: 3,
        name: "Admin User",
        email: "admin@library.com",
        password: "admin123",
        role: "librarian",
        active: true,
        joinedDate: "2023-01-01"
    }
];

// Mock Reservations Data
export const mockReservations = [
    {
        id: 1,
        userId: 1,
        bookId: 3,
        bookTitle: "1984",
        reservationDate: "2024-02-01",
        dueDate: "2024-02-15",
        status: "active",
        returnDate: null
    },
    {
        id: 2,
        userId: 1,
        bookId: 7,
        bookTitle: "The Hobbit",
        reservationDate: "2024-01-20",
        dueDate: "2024-02-03",
        status: "overdue",
        returnDate: null
    },
    {
        id: 3,
        userId: 2,
        bookId: 1,
        bookTitle: "The Great Gatsby",
        reservationDate: "2024-01-25",
        dueDate: "2024-02-08",
        status: "returned",
        returnDate: "2024-02-05"
    }
];

// Mock Notifications Data
export const mockNotifications = [
    {
        id: 1,
        userId: 1,
        message: "Your reservation for '1984' is due in 3 days",
        type: "reminder",
        read: false,
        createdAt: "2024-02-03T10:00:00"
    },
    {
        id: 2,
        userId: 1,
        message: "Your reservation for 'The Hobbit' is overdue",
        type: "warning",
        read: false,
        createdAt: "2024-02-04T09:00:00"
    },
    {
        id: 3,
        userId: 1,
        message: "New book added to catalog: 'The Midnight Library'",
        type: "info",
        read: true,
        createdAt: "2024-02-01T14:30:00"
    }
];

// Genre options for filters
export const genres = [
    "All Genres",
    "Classic",
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Mystery",
    "Thriller",
    "Non-Fiction"
];

// Statistics data for admin dashboard
export const mockStatistics = {
    totalBooks: 150,
    availableBooks: 98,
    activeReservations: 52,
    totalUsers: 245,
    overdueBooks: 8,
    newBooksThisMonth: 12
};

// Chart data for reports
export const mockChartData = {
    monthlyReservations: [
        { month: 'Jan', reservations: 45 },
        { month: 'Feb', reservations: 52 },
        { month: 'Mar', reservations: 48 },
        { month: 'Apr', reservations: 61 },
        { month: 'May', reservations: 55 },
        { month: 'Jun', reservations: 67 }
    ],
    genreDistribution: [
        { genre: 'Classic', count: 35 },
        { genre: 'Fiction', count: 42 },
        { genre: 'Science', count: 28 },
        { genre: 'Fantasy', count: 25 },
        { genre: 'Mystery', count: 20 }
    ]
};
