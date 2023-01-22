export const StringFunctions = {
    /**
     * Is the string null or empty?
     */
    isFalseyOrEmpty: (str: string) => {
        return !str || 0 === str.length;
    }
}