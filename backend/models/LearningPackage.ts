export interface LearningPackage {
    id: number;               // Unique identifier
    title: string;            // Title of the package
    description: string;      // Description of the package
    category: string;         // Category of the package (e.g., Programming, Data Science, etc.)
    targetAudience: string;   // Target audience (e.g., prerequisites or age)
    difficulty: number;       // Difficulty level (from 1 to 20)
}
