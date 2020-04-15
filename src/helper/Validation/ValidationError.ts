
export default class ValidationError extends Error {
    constructor(message: string) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message);
    
        this.name = 'ValidationError';
      }
}
