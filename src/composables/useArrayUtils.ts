export function useArrayUtils() {
    /**
     * Picks a random element from an array.
     * @param array The array to pick from.
     * @returns A random element from the array, or undefined if the array is empty.
     */
    const pickRandom = <T>(array: T[]): T | undefined => {
        if (!array.length) return undefined;
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };

    /**
     * Shuffles an array using the Fisher-Yates algorithm.
     * @param array The array to shuffle.
     * @returns A new array that is shuffled.
     */
    const shuffleArray = <T>(array: T[]): T[] => {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    };

    return { pickRandom, shuffleArray };
}
