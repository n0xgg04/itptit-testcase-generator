export function isPrimeNumber(num: number): boolean {
    // Check if the number is less than 2 (not a prime number)
    if (num < 2) {
        return false;
    }

    // Check for factors from 2 to the square root of the number
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            // If there is a factor, the number is not prime
            return false;
        }
    }

    // If no factors were found, the number is prime
    return true;
}
