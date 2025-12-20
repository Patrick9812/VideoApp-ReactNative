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
        date: '2024-08-15', 
        channel: "Test1",
        views: 100,
        likes: 2,
        description: "sadasdasdasdasd"
      },
      { 
        id: 'v2', 
        videoTitle: 'Zarządzanie stanem', 
        date: '2024-08-20', 
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
        date: '2024-08-12', 
        channel: "Test3",
        views: 153,
        likes: 2,
        description: "sadasdasdasdasd"
      },
      { 
        id: 'v4', 
        videoTitle: 'Generic Types', 
        date: '2024-08-05', 
        channel: "Test4",
        views: 80,
        likes: 2,
        description: "sadasdasdasdasd"
      }
    ]
  },
];