export type userType = {
    token : null | string,
    user : null | User,
}
interface User {
    _id: string;                // Unique identifier for the user
    name: string;               // User's name
    email: string;              // User's email address
    dateOfBirth: string;        // User's date of birth in string format
    gender: 'male' | 'female';  // User's gender, can be 'male' or 'female'
    photo: string;              // URL to the user's photo
    createdAt: string;          // Timestamp of when the user was created
    passwordChangedAt: string;  // Timestamp of when the user's password was last changed
}
