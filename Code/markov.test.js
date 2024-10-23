const MarkovMachine = require('./markov');

describe('makeChains method', () => {
    test('maps each word to its possible followers', () => {
        // Instantiate the MarkovMachine with some text
        const text = "the cat in the hat";
        const mm = new MarkovMachine(text);

        // `makeChains` is called within the constructor, so no need to call it again
        // Access the `chains` directly from the instance
        const chains = mm.chains; 

        // Define the expected result
        const expectedChains = {
            'the': ['cat', 'hat'],
            'cat': ['in'],
            'in': ['the'],
            'hat': [null]  // Using null to represent the end of a chain if that's your design.
        };

        // Assert that the output matches the expected result
        expect(chains).toEqual(expectedChains);
    });
});
