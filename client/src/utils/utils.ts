export class Utils {
  /**
   * Generates a random color in hexadecimal format.
   * @returns {string} - Random hexadecimal color string.
   */
  static getRandomColor(): string {
    const letters: string = "0123456789ABCDEF";
    let color: string = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /**
   * Formats file size into human-readable format.
   * @param {number} sizeInBytes - File size in bytes.
   * @returns {string} - Formatted file size (e.g., "2.50 MB").
   */
  static formatFileSize = (sizeInBytes: number) => {
    if (sizeInBytes < 1024) return `${sizeInBytes} B`;
    if (sizeInBytes < 1024 * 1024)
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    if (sizeInBytes < 1024 * 1024 * 1024)
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  /**
   * Gets a random item from an array.
   * @param {T[]} arr - Array of items.
   * @returns {T} - Randomly selected item from the array.
   */
  static getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Generates a random number up to a maximum value.
   * @param {number} max - Maximum number (inclusive).
   * @returns {number} - Random number between 1 and max.
   */
  static getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }
}
