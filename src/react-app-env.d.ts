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

interface DocID {
  _id: string;
}

interface PostData {
  title: string;
  date: number;
  content: string;
  imageUrl: string;
}

type Post = PostData & DocID;

interface ResidentData {
  firstName: string;
  lastName: string;
  gender: string;
  isVisible: boolean;
  age: number;
}

type Resident = ResidentData & DocID;

interface ReportData {
  date: Date;
  mood: number;
  health: number;
  sad: boolean;
  angry: boolean;
  rested: boolean;
  wellFed: boolean;
  lonely: boolean;
  comments: string;
}

type Report = ReportData & DocID;

interface SuccessMessage {
  success: boolean;
}

interface NotFoundError {
  notFound: boolean;
}

type ValidationErrors = string[];
