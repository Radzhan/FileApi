export interface Api{
    _id: string;
    message: string;
    author: string;
    datetime: string;
}

export interface ApiWithOutIdAndDate {
    message: string;
    author: string; 
}