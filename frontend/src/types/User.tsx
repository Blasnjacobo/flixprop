export interface User {
    id: string;
    name: string;
    username: string;
    photos: Photo[];
    provider: string;
}

interface Photo {
    value: string;
}