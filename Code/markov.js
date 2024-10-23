class MarkovMachine {
  // Constructor takes a block of text as input
  constructor(text) {
    // Splits the text into an array of words, handling multiple spaces and new lines
    let words = text.split(/[ \r\n]+/);
    // Filters out any empty strings from the array to ensure no empty words are processed
    this.words = words.filter(c => c !== "");
    // Calls makeChains method to organize the words into a Markov chain
    this.makeChains();
  }

  // Method to create a Markov chain from the list of words
  makeChains() {
    // Initializes the chains object which will store the mapping of each word to its possible followers
    this.chains = {};

    // Loops over the words array to build the chains
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i]; // Current word
      let nextWord = this.words[i + 1] || null; // Next word or null if current word is the last word

      // If the current word isn't already a key in chains, initialize it with an empty array
      if (!this.chains[word]) {
        this.chains[word] = [];
      }
      // Append the next word to the chain for the current word
      this.chains[word].push(nextWord);
    }
  }

  // Method to generate random text based on the Markov chains
  makeText(numWords = 100) {
    // Selects a random word from the words array to start
    let currentWord = this.words[Math.floor(Math.random() * this.words.length)];
    let output = []; // Initializes the output array to build the generated text

    // Continues to add words until reaching the specified number of words or a null word
    while (output.length < numWords && currentWord !== null) {
      output.push(currentWord); // Adds the current word to the output
      let nextWords = this.chains[currentWord]; // Fetches possible next words from the chain
      currentWord = nextWords[Math.floor(Math.random() * nextWords.length)]; // Randomly selects the next word from the possible next words
    }

    // Joins the output array into a single string with spaces between words
    return output.join(" ");
  }
}

// Exports the MarkovMachine class to make it available for use in other files
module.exports = MarkovMachine;
