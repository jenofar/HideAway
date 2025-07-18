class BookstoreChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
        this.setupEventListeners();
        this.loadBookDatabase();
    }

    init() {
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.chatbotContainer = document.getElementById('chatbot-container');
        this.minimizeBtn = document.getElementById('minimize-btn');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.messageInput = document.getElementById('message-input');
        this.sendBtn = document.getElementById('send-btn');
        this.notificationDot = document.getElementById('notification-dot');
        
        // Show notification dot initially
        this.showNotification();
    }

    setupEventListeners() {
        // Toggle chatbot
        this.chatbotToggle.addEventListener('click', () => this.toggleChat());
        this.minimizeBtn.addEventListener('click', () => this.toggleChat());

        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Quick actions
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });

        // Simulate cart updates for demo
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.updateCartCount();
                this.showCartNotification();
            });
        });

        // Book Club join functionality
        document.querySelectorAll('.join-club-btn').forEach(button => {
            button.addEventListener('click', function() {
                const clubType = this.getAttribute('data-club');
                const clubNames = {
                    'mystery': 'Mystery Readers Circle',
                    'scifi': 'Sci-Fi Explorers', 
                    'romance': 'Romance Book Club',
                    'biography': 'Biography Enthusiasts'
                };
                
                this.textContent = 'Joined!';
                this.style.background = '#28a745';
                this.disabled = true;
                
                // Trigger chatbot notification
                if (window.bookstoreChatbot && !window.bookstoreChatbot.isOpen) {
                    setTimeout(() => {
                        window.bookstoreChatbot.addMessage(`🎉 Welcome to the ${clubNames[clubType]}! I've added you to the club. You'll receive updates about upcoming meetings and discussions. Would you like to know what the club is currently reading?`, 'bot');
                        window.bookstoreChatbot.showNotification();
                    }, 2000);
                }
            });
        });
    }

    loadBookDatabase() {
        // Simulated book database
        this.books = [
            {
                id: 1,
                title: "The Great Adventure",
                author: "John Smith",
                genre: "Adventure",
                price: 19.99,
                rating: 4.5,
                description: "An epic tale of courage and discovery in uncharted lands."
            },
            {
                id: 2,
                title: "Mystery in the Dark",
                author: "Jane Doe",
                genre: "Mystery",
                price: 24.99,
                rating: 4.7,
                description: "A gripping mystery that will keep you guessing until the end."
            },
            {
                id: 3,
                title: "Science Fiction Tales",
                author: "Alex Johnson",
                genre: "Science Fiction",
                price: 22.99,
                rating: 4.3,
                description: "Mind-bending stories from the future and beyond."
            },
            {
                id: 4,
                title: "Romance Under Stars",
                author: "Emily Brown",
                genre: "Romance",
                price: 18.99,
                rating: 4.6,
                description: "A heartwarming love story that transcends time."
            },
            {
                id: 5,
                title: "Historical Chronicles",
                author: "Michael Wilson",
                genre: "Historical Fiction",
                price: 26.99,
                rating: 4.4,
                description: "Vivid tales from history's most fascinating periods."
            },
            {
                id: 6,
                title: "Fantasy Realms",
                author: "Sarah Davis",
                genre: "Fantasy",
                price: 21.99,
                rating: 4.8,
                description: "Magical worlds filled with wonder and adventure."
            },
            {
                id: 7,
                title: "Mein Kampf",
                author: "jenofar",
                genre: "Biography",
                price: 21.99,
                rating: 4.8,
                description: "This is the autobiographical and political manifesto by Nazi Party leader Adolf Hitler."
            },
            {
                id: 8,
                title: "Steve Jobs",
                author: "Walter Isaacson",
                genre: "Biography",
                price: 28.99,
                rating: 4.6,
                description: "The exclusive biography of Apple's co-founder, based on more than forty interviews."
            },
            {
                id: 9,
                title: "Becoming",
                author: "Michelle Obama",
                genre: "Biography",
                price: 24.99,
                rating: 4.9,
                description: "The deeply personal memoir from the former First Lady of the United States."
            }
        ];

        this.genres = ["Adventure", "Mystery", "Science Fiction", "Romance", "Historical Fiction", "Fantasy", "Thriller", "Biography", "Autobiography", "Self-Help", "Cooking", "Memoir"];
        
        this.orders = [
            { id: "ORD001", status: "Shipped", books: ["The Great Adventure"], total: 19.99 },
            { id: "ORD002", status: "Processing", books: ["Mystery in the Dark", "Fantasy Realms"], total: 46.98 },
            { id: "ORD003", status: "Delivered", books: ["Science Fiction Tales"], total: 22.99 }
        ];

        // Book Clubs Data
        this.bookClubs = [
            {
                id: 1,
                name: "Mystery Readers Circle",
                icon: "🔍",
                members: 247,
                currentBook: "Mystery in the Dark by Jane Doe",
                description: "Dive deep into mysteries, thrillers, and crime novels. Weekly discussions every Tuesday.",
                nextMeeting: "Jan 23",
                discussions: 45,
                genre: "Mystery",
                benefits: ["10% discount on mystery books", "Access to exclusive mystery author events", "Monthly mystery book box"]
            },
            {
                id: 2,
                name: "Sci-Fi Explorers",
                icon: "🚀",
                members: 189,
                currentBook: "Science Fiction Tales by Alex Johnson",
                description: "Explore the future, space, and technology through the best sci-fi literature.",
                nextMeeting: "Jan 25",
                discussions: 38,
                genre: "Science Fiction",
                benefits: ["Early access to new sci-fi releases", "Virtual reality book experiences", "Author Q&A sessions"]
            },
            {
                id: 3,
                name: "Romance Book Club",
                icon: "❤️",
                members: 312,
                currentBook: "Romance Under Stars by Emily Brown",
                description: "Share the love for romantic stories, from contemporary to historical romance.",
                nextMeeting: "Jan 24",
                discussions: 52,
                genre: "Romance",
                benefits: ["Romance book recommendations", "Special Valentine's events", "Book signing opportunities"]
            },
            {
                id: 4,
                name: "Biography Enthusiasts",
                icon: "📖",
                members: 156,
                currentBook: "Becoming by Michelle Obama",
                description: "Discover inspiring life stories and learn from remarkable individuals.",
                nextMeeting: "Jan 26",
                discussions: 29,
                genre: "Biography",
                benefits: ["Biography book discounts", "Meet inspiring speakers", "Historical site visits"]
            }
        ];
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatbotContainer.classList.add('active');
            this.hideNotification();
            this.messageInput.focus();
        } else {
            this.chatbotContainer.classList.remove('active');
        }
    }

    showNotification() {
        this.notificationDot.style.display = 'block';
    }

    hideNotification() {
        this.notificationDot.style.display = 'none';
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.messageInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Process message and get response
        setTimeout(async () => {
            this.hideTypingIndicator();
            const response = await this.processMessage(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000); // Simulate processing time
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas ${sender === 'bot' ? 'fa-robot' : 'fa-user'}"></i>
            </div>
            <div class="message-content">
                ${this.formatMessage(content)}
            </div>
            <div class="message-time">${timeString}</div>
        `;

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatMessage(content) {
        if (typeof content === 'string') {
            return `<p>${content}</p>`;
        }
        
        let html = '';
        if (content.text) {
            html += `<p>${content.text}</p>`;
        }
        
        if (content.books && content.books.length > 0) {
            html += '<div class="book-recommendations">';
            content.books.forEach(book => {
                html += `
                    <div class="book-rec">
                        <strong>${book.title}</strong> by ${book.author}<br>
                        <span class="genre">${book.genre}</span> - <span class="price">$${book.price}</span><br>
                        <span class="rating">${'★'.repeat(Math.floor(book.rating))} ${book.rating}</span><br>
                        <small>${book.description}</small>
                    </div>
                `;
            });
            html += '</div>';
        }

        if (content.orders && content.orders.length > 0) {
            html += '<div class="order-info">';
            content.orders.forEach(order => {
                html += `
                    <div class="order-item">
                        <strong>Order #${order.id}</strong><br>
                        Status: <span class="status">${order.status}</span><br>
                        Items: ${order.books.join(', ')}<br>
                        Total: $${order.total}
                    </div>
                `;
            });
            html += '</div>';
        }

        if (content.clubs && content.clubs.length > 0) {
            html += '<div class="clubs-info">';
            content.clubs.forEach(club => {
                html += `
                    <div class="club-item">
                        <strong>${club.icon} ${club.name}</strong><br>
                        <span class="members">${club.members} members</span><br>
                        <span class="current-read">Currently reading: ${club.currentBook}</span><br>
                        <small>${club.description}</small><br>
                        <span class="next-meeting">Next meeting: ${club.nextMeeting}</span>
                    </div>
                `;
            });
            html += '</div>';
        }

        return html;
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingMessage = this.messagesContainer.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    async processMessage(message) {
        const lowerMessage = message.toLowerCase();

        // Book clubs handling
        if (lowerMessage.includes('book club') || lowerMessage.includes('reading club') || lowerMessage.includes('club') || lowerMessage.includes('discussion') || lowerMessage.includes('book community')) {
            return this.handleBookClubs(message);
        }

        // Special handling for biography/autobiography searches
        if (lowerMessage.includes('biography') || lowerMessage.includes('autobiography') || lowerMessage.includes('autobiographical') || lowerMessage.includes('memoir')) {
            return this.getBooksByGenre('Biography');
        }

        // Book search
        if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('book') || lowerMessage.includes('looking for')) {
            return this.searchBooks(message);
        }

        // Recommendations
        if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('what should i read')) {
            return this.getRecommendations(message);
        }

        // Order tracking
        if (lowerMessage.includes('order') || lowerMessage.includes('track') || lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
            return this.trackOrder(message);
        }

        // Greeting
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! 👋 Great to see you at HideAway! I'm here to help you find your next great read. What kind of books are you interested in today?";
        }

        // Genres
        if (this.genres.some(genre => lowerMessage.includes(genre.toLowerCase()))) {
            const genre = this.genres.find(g => lowerMessage.includes(g.toLowerCase()));
            return this.getBooksByGenre(genre);
        }

        // Help
        if (lowerMessage.includes('help')) {
            return this.getHelpMessage();
        }

        // Default response
        return this.getContextualResponse(lowerMessage);
    }

    searchBooks(query) {
        const searchTerms = query.toLowerCase().split(' ');
        
        // Handle biography/autobiography synonyms
        const biographyTerms = ['biography', 'autobiography', 'autobiographical', 'memoir', 'life story'];
        const hasBiographyTerm = biographyTerms.some(term => query.toLowerCase().includes(term));
        
        const results = this.books.filter(book => {
            const matchesSearch = searchTerms.some(term => 
                book.title.toLowerCase().includes(term) ||
                book.author.toLowerCase().includes(term) ||
                book.genre.toLowerCase().includes(term) ||
                book.description.toLowerCase().includes(term)
            );
            
            // Special handling for biography searches
            if (hasBiographyTerm && book.genre.toLowerCase() === 'biography') {
                return true;
            }
            
            return matchesSearch;
        });

        if (results.length > 0) {
            return {
                text: `I found ${results.length} book${results.length > 1 ? 's' : ''} that match your search:`,
                books: results.slice(0, 3) // Show top 3 results
            };
        } else {
            return {
                text: "I couldn't find any books matching your search. Could you try different keywords? Or would you like me to recommend some popular books?",
                books: []
            };
        }
    }

    getRecommendations(query = '') {
        const lowerQuery = query.toLowerCase();
        let filteredBooks = this.books;

        // Filter by genre if mentioned
        const mentionedGenre = this.genres.find(genre => lowerQuery.includes(genre.toLowerCase()));
        if (mentionedGenre) {
            filteredBooks = this.books.filter(book => book.genre === mentionedGenre);
        }

        // Sort by rating and get top 3
        const sortedBooks = [...filteredBooks].sort((a, b) => b.rating - a.rating);
        const recommendations = sortedBooks.slice(0, 3);

        return {
            text: mentionedGenre 
                ? `Here are my top ${mentionedGenre} recommendations for you:` 
                : "Based on our bestsellers and high ratings, here are my recommendations:",
            books: recommendations
        };
    }

    getBooksByGenre(genre) {
        const books = this.books.filter(book => book.genre === genre);
        if (books.length > 0) {
            return {
                text: `Here are our ${genre} books:`,
                books: books
            };
        } else {
            return {
                text: `We don't currently have any ${genre} books in stock, but I can recommend some similar genres. Would you like to see our Adventure or Fantasy books?`,
                books: []
            };
        }
    }

    trackOrder(message) {
        const orderIdMatch = message.match(/ORD\d+/i);
        
        if (orderIdMatch) {
            const orderId = orderIdMatch[0].toUpperCase();
            const order = this.orders.find(o => o.id === orderId);
            
            if (order) {
                return {
                    text: `Here's the status of your order:`,
                    orders: [order]
                };
            } else {
                return {
                    text: `I couldn't find an order with ID ${orderId}. Please check your order number and try again.`,
                    orders: []
                };
            }
        } else {
            return {
                text: "Here are your recent orders:",
                orders: this.orders.slice(0, 2)
            };
        }
    }

    getHelpMessage() {
        return `I'm here to help you with:

📚 **Book Search** - Just tell me what you're looking for
🎯 **Recommendations** - Ask for suggestions by genre or mood  
📦 **Order Tracking** - Check your order status with order ID
🛒 **Shopping Help** - Get information about books and pricing
💬 **General Questions** - Ask me anything about our bookstore

Try saying things like:
• "Find me some mystery books"
• "Recommend fantasy novels"
• "Track order ORD001"
• "What's popular in romance?"

How can I assist you today?`;
    }

    getContextualResponse(message) {
        const responses = [
            "I'd be happy to help you find the perfect book! Could you tell me more about what you're looking for?",
            "That's interesting! Are you looking for books on that topic, or would you like recommendations in a specific genre?",
            "I'm here to help with all your book needs! Try asking me about book recommendations, searching for specific titles, or tracking your orders.",
            "Let me help you discover your next great read! What genre or type of book interests you most?",
            "I understand you're looking for something specific. Could you give me more details about what kind of book you'd like?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    handleQuickAction(action) {
        switch (action) {
            case 'recommend':
                this.addMessage('Get Recommendations', 'user');
                setTimeout(() => {
                    this.showTypingIndicator();
                    setTimeout(() => {
                        this.hideTypingIndicator();
                        const response = this.getRecommendations();
                        this.addMessage(response, 'bot');
                    }, 1000);
                }, 100);
                break;

            case 'search':
                this.addMessage('Search Books', 'user');
                setTimeout(() => {
                    this.showTypingIndicator();
                    setTimeout(() => {
                        this.hideTypingIndicator();
                        this.addMessage("What kind of book are you looking for? You can search by title, author, or genre. For example, try 'mystery books' or 'books by Jane Doe'.", 'bot');
                    }, 1000);
                }, 100);
                break;

            case 'clubs':
                this.addMessage('Book Clubs', 'user');
                setTimeout(() => {
                    this.showTypingIndicator();
                    setTimeout(() => {
                        this.hideTypingIndicator();
                        const response = this.handleBookClubs('book clubs');
                        this.addMessage(response, 'bot');
                    }, 1000);
                }, 100);
                break;

            case 'track':
                this.addMessage('Track Order', 'user');
                setTimeout(() => {
                    this.showTypingIndicator();
                    setTimeout(() => {
                        this.hideTypingIndicator();
                        const response = this.trackOrder('');
                        this.addMessage(response, 'bot');
                    }, 1000);
                }, 100);
                break;

            case 'help':
                this.addMessage('Help', 'user');
                setTimeout(() => {
                    this.showTypingIndicator();
                    setTimeout(() => {
                        this.hideTypingIndicator();
                        const response = this.getHelpMessage();
                        this.addMessage(response, 'bot');
                    }, 1000);
                }, 100);
                break;
        }
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;
    }

    showCartNotification() {
        if (!this.isOpen) {
            setTimeout(() => {
                this.addMessage("📦 I notice you added a book to your cart! Would you like me to help you find similar books or check out more recommendations?", 'bot');
                this.showNotification();
            }, 2000);
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    handleBookClubs(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check if asking about a specific genre club
        const genreClub = this.bookClubs.find(club => 
            lowerMessage.includes(club.genre.toLowerCase()) || 
            lowerMessage.includes(club.name.toLowerCase().split(' ')[0])
        );
        
        if (genreClub) {
            return {
                text: `Here's information about the ${genreClub.name}:`,
                clubs: [genreClub]
            };
        }
        
        // Check if asking about joining clubs
        if (lowerMessage.includes('join') || lowerMessage.includes('how to join') || lowerMessage.includes('membership')) {
            return {
                text: "Great! Here are our active book clubs you can join:",
                clubs: this.bookClubs
            };
        }
        
        // Check if asking about club benefits
        if (lowerMessage.includes('benefit') || lowerMessage.includes('advantage') || lowerMessage.includes('perks')) {
            return {
                text: `📌 **Book Club Benefits:**

🎯 **Member Exclusive Perks:**
• 10% discount on club books
• Priority access to author events  
• Monthly book surprises
• Connect with fellow readers
• Early access to new releases
• Virtual book discussions
• Author Q&A sessions

To join any club, just let me know which genre interests you most!`,
                clubs: []
            };
        }
        
        // Check if asking about current books
        if (lowerMessage.includes('current') || lowerMessage.includes('reading now') || lowerMessage.includes('what are they reading')) {
            let response = "Here's what our book clubs are currently reading:\n\n";
            this.bookClubs.forEach(club => {
                response += `${club.icon} **${club.name}**: ${club.currentBook}\n`;
            });
            response += "\nWould you like to join any of these discussions?";
            return {
                text: response,
                clubs: []
            };
        }
        
        // Check if asking about meetings
        if (lowerMessage.includes('meeting') || lowerMessage.includes('when') || lowerMessage.includes('schedule')) {
            return {
                text: "Here are the upcoming book club meetings:",
                clubs: this.bookClubs
            };
        }
        
        // General book clubs inquiry
        return {
            text: "Welcome to HideAway's Reading Community! 📚 We have several active book clubs:",
            clubs: this.bookClubs
        };
    }
}

// Add custom styles for formatted messages
const style = document.createElement('style');
style.textContent = `
    .book-recommendations {
        margin-top: 10px;
    }
    
    .book-rec {
        background: rgba(102, 126, 234, 0.1);
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 8px;
        border-left: 3px solid #667eea;
    }
    
    .book-rec:last-child {
        margin-bottom: 0;
    }
    
    .genre {
        background: #667eea;
        color: white;
        padding: 2px 6px;
        border-radius: 10px;
        font-size: 0.8rem;
    }
    
    .price {
        font-weight: bold;
        color: #667eea;
    }
    
    .rating {
        color: #ffa500;
    }
    
    .order-info {
        margin-top: 10px;
    }
    
    .order-item {
        background: rgba(102, 126, 234, 0.1);
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 8px;
        border-left: 3px solid #667eea;
    }
    
    .order-item:last-child {
        margin-bottom: 0;
    }
    
    .status {
        font-weight: bold;
        color: #28a745;
    }
`;
document.head.appendChild(style);

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new BookstoreChatbot();
    // Store reference globally if needed for debugging
    window.bookstoreChatbot = chatbot;
});

// Add some demo functionality for the main website
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add to cart animation
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            this.textContent = 'Added!';
            this.style.background = '#28a745';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '#667eea';
            }, 2000);
        });
    });
});

// YouTube Shorts-style Carousel functionality
class BookCarousel {
    constructor() {
        this.currentIndex = 0;
        this.items = document.querySelectorAll('.carousel-item');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.isAutoPlaying = true;
        this.autoPlayInterval = null;
        this.touchStartY = 0;
        this.touchEndY = 0;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startAutoPlay();
        this.updateNavigation();
    }
    
    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.goToPrevious());
        this.nextBtn.addEventListener('click', () => this.goToNext());
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/swipe functionality
        const carousel = document.getElementById('book-carousel');
        carousel.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        carousel.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Mouse events for desktop
        carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') this.goToPrevious();
            if (e.key === 'ArrowDown') this.goToNext();
        });
        
        // Action buttons
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleLike(e));
        });
        
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleShare(e));
        });
        
        document.querySelectorAll('.cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAddToCart(e));
        });
    }
    
    goToNext() {
        this.pauseAutoPlay();
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateCarousel();
        this.startAutoPlay();
    }
    
    goToPrevious() {
        this.pauseAutoPlay();
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateCarousel();
        this.startAutoPlay();
    }
    
    goToSlide(index) {
        this.pauseAutoPlay();
        this.currentIndex = index;
        this.updateCarousel();
        this.startAutoPlay();
    }
    
    updateCarousel() {
        this.items.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next');
            
            if (index === this.currentIndex) {
                item.classList.add('active');
            } else if (index === this.currentIndex - 1 || (this.currentIndex === 0 && index === this.items.length - 1)) {
                item.classList.add('prev');
            } else {
                item.classList.add('next');
            }
        });
        
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        this.updateNavigation();
    }
    
    updateNavigation() {
        this.prevBtn.disabled = false;
        this.nextBtn.disabled = false;
    }
    
    startAutoPlay() {
        if (this.isAutoPlaying) {
            this.autoPlayInterval = setInterval(() => {
                this.goToNext();
            }, 5000); // Change slide every 5 seconds
        }
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    handleTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
    }
    
    handleTouchEnd(e) {
        this.touchEndY = e.changedTouches[0].clientY;
        this.handleSwipe();
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = this.touchStartY - this.touchEndY;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swiped up - go to next
                this.goToNext();
            } else {
                // Swiped down - go to previous
                this.goToPrevious();
            }
        }
    }
    
    handleLike(e) {
        e.stopPropagation();
        const btn = e.currentTarget;
        const icon = btn.querySelector('i');
        const count = btn.querySelector('span');
        
        icon.classList.toggle('fas');
        icon.classList.toggle('far');
        
        if (icon.classList.contains('fas')) {
            icon.style.color = '#ff3b5c';
            btn.style.background = 'rgba(255, 59, 92, 0.3)';
            // Increment like count
            const currentCount = parseInt(count.textContent.replace('K', '')) * 1000;
            const newCount = currentCount + 1;
            count.textContent = newCount > 999 ? (newCount/1000).toFixed(1) + 'K' : newCount;
            
            // Add heart animation
            this.createHeartAnimation(btn);
        } else {
            icon.style.color = 'white';
            btn.style.background = 'rgba(255, 255, 255, 0.2)';
        }
    }
    
    handleShare(e) {
        e.stopPropagation();
        const bookTitle = e.currentTarget.closest('.carousel-item').querySelector('h4').textContent;
        
        if (navigator.share) {
            navigator.share({
                title: `Check out ${bookTitle}`,
                text: `I found this amazing book on HideAway!`,
                url: window.location.href
            });
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(`Check out "${bookTitle}" on HideAway! ${window.location.href}`);
            this.showToast('Link copied to clipboard!');
        }
    }
    
    handleAddToCart(e) {
        e.stopPropagation();
        const btn = e.currentTarget;
        const bookTitle = btn.closest('.carousel-item').querySelector('h4').textContent;
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        const currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;
        
        // Visual feedback
        btn.innerHTML = '<i class="fas fa-check"></i><span>Added</span>';
        btn.style.background = 'rgba(52, 199, 89, 0.8)';
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-shopping-cart"></i><span>Add</span>';
            btn.style.background = 'rgba(255, 255, 255, 0.2)';
        }, 2000);
        
        this.showToast(`"${bookTitle}" added to cart!`);
        
        // Trigger chatbot notification if available
        if (window.bookstoreChatbot && !window.bookstoreChatbot.isOpen) {
            setTimeout(() => {
                window.bookstoreChatbot.addMessage(`📚 Great choice! "${bookTitle}" has been added to your cart. Would you like me to recommend similar books or help you find more books in this genre?`, 'bot');
                window.bookstoreChatbot.showNotification();
            }, 1000);
        }
    }
    
    createHeartAnimation(button) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
            pointer-events: none;
            animation: heartFloat 1s ease-out forwards;
            z-index: 1000;
        `;
        
        button.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
    
    showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            z-index: 10000;
            font-size: 0.9rem;
            backdrop-filter: blur(10px);
            animation: toastSlideUp 0.3s ease-out;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'toastSlideDown 0.3s ease-in forwards';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
}

// Add CSS animations for heart and toast
const carouselAnimations = document.createElement('style');
carouselAnimations.textContent = `
    @keyframes heartFloat {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -150%) scale(1.5);
            opacity: 0;
        }
    }
    
    @keyframes toastSlideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes toastSlideDown {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
`;
document.head.appendChild(carouselAnimations);

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BookCarousel();
});
