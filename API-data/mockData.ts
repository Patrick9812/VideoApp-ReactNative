export interface Video {
  id: string;
  videoTitle: string;
  date?: string;
  channel: string;
  views: number;
  likes: number;
  description: string;
  thumbnail?: string;
}

export interface Category {
  id: string;
  title: string;
  data: Video[];
}

export const CATEGORIES: Category[] = [
  { 
    id: '1', 
    title: 'React Native', 
    data: [
      { 
        id: 'v1', 
        videoTitle: 'Kurs od podstaw asdasdas dasd asd asd asd asd asd asd asd asasd asd asd sda', 
        date: '12.08.2024', 
        channel: "Test1",
        views: 123,
        likes: 2,
        description: "sadasdasdasdasd"
      },
      { 
        id: 'v2', 
        videoTitle: 'Zarządzanie stanem', 
        date: '15.08.2024', 
        channel: "Test2",
        views: 123,
        likes: 2,
        description: "sadasdasdasdasd"
      }
    ]
  },
  { 
    id: '2', 
    title: 'Typescript', 
    data: [
      { 
        id: 'v3', 
        videoTitle: 'Typowanie propsów', 
        date: '20.08.2024', 
        channel: "Test3",
        views: 123,
        likes: 2,
        description: "sadasdasdasdasd"
      },
      { 
        id: 'v4', 
        videoTitle: 'Generic Types', 
        date: '22.08.2024', 
        channel: "Test4",
        views: 123,
        likes: 2,
        description: "sadasdasdasdasd"
      }
    ]
  },
];