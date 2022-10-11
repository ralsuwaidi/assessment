// images
import userAvatar from '../../../assets/images/users/avatar-7.jpg';

export interface UserInfoTypes {
    userName?: string;
    avatar?: string;
    designation?: string;
    location?: string;
    profileProgress: number;
    about?: string;
    email?: string;
    phone?: string;
    address?: string;
    skills?: string[];
}

const userInfo: UserInfoTypes = {
    userName: 'Rashed AlSuwaidi',
    designation: 'User Experience Specialist',
    location: 'San Francisco, CA',
    avatar: userAvatar,
    profileProgress: 60,
    about: "Hi I'm Shreyu. I am user experience and user interface designer. I have been working on UI & UX since last 10 years.",
    email: 'xyz123@gmail.com',
    phone: '(123) 123 1234',
    address: '1975 Boring Lane, San Francisco, California, United States - 94108',
    skills: ['UI design', 'UX', 'Sketch', 'Photoshop', 'Frontend'],
};

export interface UserPortfolioTypes {
    userName: string;
    first_name: string;
    last_name: string;
    about?: string;
    is_seeking_job?: boolean;
    is_working?: boolean;
    employer?: string;
    nationality?: string;
    country_residence?: string;
    mobile_number?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    gender?: string;
    fav_language?: string;
    employment_time?: string;
    personal_site?: string;
    proud_project?: string;
    email?: string;
    academic_qualification?: string;
    profile_image?: string;
    jobTitle?: string;
    years_experience?: number;
}

const userPortfolio: UserPortfolioTypes = {
    userName: "rashed.alsuwaidi",
    first_name: "Rashed",
    last_name: "AlSuwaidi",
    about: "Apart from counting words and characters, our online editor can help you to improve word choice and writing style, and, optionally, help you to detect grammar mistakes and plagiarism. To check word count, simply place your cursor into the text box above and start typing. You'll see the number of characters and words increase or decrease as you type, delete, and edit them. You can also copy and paste text from another program over into the online editor above. The Auto-Save feature will make sure you won't lose any changes while editing, even if you leave the site and come back later. Tip: Bookmark this page now.",
    is_seeking_job: true,
    is_working: true,
    employer: "AI Office",
    nationality: "UAE",
    country_residence: "UAE",
    mobile_number: "506569080",
    github: "https://github.com/ralsuwaidi",
    linkedin: "http://linkedin.com",
    twitter: "https://twitter.com",
    gender: "Male",
    email: "rashed.alsuwaidi@ai.gov.ae",
    fav_language: "Python",
    employment_time: "Full-Time",
    personal_site: "https://example.com",
    proud_project: "Apart from counting words and characters, our online editor can help you to improve word choice and writing style, and, optionally, help you to detect grammar mistakes and plagiarism. To check word count, simply place your cursor into the text box above and start typing. You'll see the number of characters and words increase or decrease as you type, delete, and edit them. You can also copy and paste text from another program over into the online editor above. The Auto-Save feature will make sure you won't lose any changes while editing, even if you leave the site and come back later. Tip: Bookmark this page now.",
    academic_qualification: "Masters in Data Science",
    jobTitle: "User Experience Specialist San Fransico, CA",
    profile_image: userAvatar,
    years_experience: 7,
}

export { userInfo, userPortfolio };
