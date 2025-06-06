// Question 1 ANSWER
// Time Complexity: O(n log n)
// Space Complexity: O(n)
function countMeetings(firstDay, lastDay) {
    const n = firstDay.length;

    // Step 1: Pair each investor's availability into an array of [start, end]
    const investors = [];
    for (let i = 0; i < n; i++) {
        investors.push([firstDay[i], lastDay[i]]);
    }

    // Step 2: Sort the investors by the last day they are available (end time)
    investors.sort((a, b) => a[1] - b[1]);

    let meetings = 0;      // Count of meetings scheduled
    let currentDay = 0;    // Tracks the last day the owner had a meeting

    // Step 3: Iterate over the sorted investors
    for (let i = 0; i < n; i++) {
        const [start, end] = investors[i];

        // Find the earliest available day to meet this investor
        // It must be at least one day after the last meeting and not before the investor's start day
        const meetingDay = Math.max(currentDay + 1, start);

        // If the chosen day is within the investor's availability, schedule the meeting
        if (meetingDay <= end) {
            meetings++;           // Increase count of meetings
            currentDay = meetingDay; // Update current day to the day this meeting is scheduled
        }
        // If not, skip this investor as we can't meet within their availability window
    }

    // Step 4: Return the total number of meetings scheduled
    return meetings;
}

// Question 2 ANSWER
// Time Complexity: O(n + m * k)
//  Space Complexity: O(n + m)
function substitutions(words, phrases) {
    const anagramGroups = new Map(); // Map to store anagram groups

    // Step 1: Group words by their sorted character form (the anagram key)
    for (const word of words) {
        // Sort the letters in the word to create a key that is the same for all anagrams
        const sorted = word.split('').sort().join('');

        // If this sorted form is not yet a key in the map, add it with a new Set
        if (!anagramGroups.has(sorted)) {
            anagramGroups.set(sorted, new Set());
        }

        // Add the word to the corresponding anagram group (Set avoids duplicates)
        anagramGroups.get(sorted).add(word);
    }

    const results = []; // To store the number of valid substitutions for each phrase

    // Step 2: For each phrase, calculate how many variations can be generated
    for (const phrase of phrases) {
        const wordsInPhrase = phrase.split(' '); // Split the phrase into individual words
        let totalWays = 1; // Start with 1 (multiplicative identity)

        for (const word of wordsInPhrase) {
            // Sort the current word to find its anagram group
            const sorted = word.split('').sort().join('');
            const anagrams = anagramGroups.get(sorted); // Get the group of anagrams

            // If no anagram group exists, or the original word isn't in the list, phrase is invalid
            if (!anagrams || !anagrams.has(word)) {
                totalWays = 0;
                break; // No need to continue if one word doesn't match
            }

            // Multiply by the number of anagrams (i.e., possible substitutions)
            totalWays *= anagrams.size;
        }

        // Add the result for this phrase to the results array
        results.push(totalWays);
    }

    // Step 3: Return the array of results, one per phrase
    return results;
}
