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

interface PostData {
  title: string;
  date: Date;
  content: string;
  imageUrl: string;
}

type Post = PostData & PostParams;

interface ResidentData {
  firstName: string;
  lastName: string;
  gender: string;
  isVisible: boolean;
  birthDate: Date;
  telephone: string;
}

type Resident = ResidentData & ResidentParams;

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

type Report = ReportData & ReportParams;

interface SuccessMessage {
  success: boolean;
  url: string;
}

interface NotFoundError {
  notFound: boolean;
}

type ValidationErrors = string[];

type FirebaseCollection = firebase.firestore.CollectionReference<
  firebase.firestore.DocumentData
>;
