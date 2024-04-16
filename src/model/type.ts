export interface Genres{
  description:string
  id:string
  name:string 
}

export interface Trending{
  comics:{
    id:string
    title:string
    thumbnail:string
    is_trending:boolean
    updated_at:string
    genres:[],
    short_description:string
    other_name:[]
    status:string
    total_views:number
    followers:number
    last_chapter:{}
  }[]
}

export interface IComicDetail{
  average: number;
  chapters: {
    id: any;
    name: string;
  }[];
  description: string;
  followers: number;
  genres: {
    id: string;
    name: string;
  }[];
  is_adult: boolean;
  other_names: string[];
  rating_count: number;
  id: string;
  title: string;
  thumbnail: string;
  status: string;
  total_views: number | string;
  authors: string | string[];
};

export interface IChapters{
  chapter_name:string
  chapters:[]
  comic_name:string
  images:{
    backup_src:string
    page:number
    src:string
  }[]
}

export interface IComics{
  comics:IComicDetail[]
  current_page:number
  total_pages:number
}