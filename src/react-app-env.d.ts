/// <reference types="react-scripts" />

interface PostParams {
  postID: string;
}

interface ResidentParams {
  residentID: string;
}

interface ReportParams extends ResidentParams {
  reportID: string;
}

interface Post {
  _id: string;
  title: string;
  createdAt: number;
  content: string;
  imageUrl: string;
}

interface Resident {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  isVisible: boolean;
  age: number;
}

interface Report {
  _id: string;
  residentID: string;
  date: number;
  mood: number;
  health: number;
  sad: boolean;
  angry: boolean;
  rested: boolean;
  wellFed: boolean;
  lonely: boolean;
  comments: string;
}
