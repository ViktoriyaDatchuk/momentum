export class QuoteOfDayView {
    constructor() {
        this.quote = document.querySelector('.quote');
        this.author = document.querySelector('.author');
        this.buttonChange = document.querySelector('.change-quote');
    }

    async getQuotes(lang) {
        const quotes = './src/json/data.json';
        const res = await fetch(quotes);
        const data = await res.json();

        const numberOfQuote = Math.floor(Math.random() * data.length)
        
        this.quote.textContent = `"${data[numberOfQuote][lang].text}"`;
        this.author.textContent = data[numberOfQuote][lang].author;
    }

    addButtonChangeQuoteHandler(lang) {
        this.buttonChange.addEventListener('click', () => {
            this.getQuotes(lang);
        });
    }
}