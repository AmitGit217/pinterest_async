export interface UserProfile {
    name: string;
    username: string;
    profile_image: {
        medium: string;
    };
}

export interface ImageUrls {
    small: string;
    raw: string;
}

export interface ImageLinks {
    html: string;
}

export interface ImageResult {
    created_at: string;
    description?: string;
    urls: ImageUrls;
    user: UserProfile;
    links: ImageLinks;
}