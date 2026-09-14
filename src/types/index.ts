export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePhoto: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SealLetterData {
  sealLetter: {
    id: string;
    userId: string;
    recipientEmail: string;
    encryptedContent: string;
    deliverAt: string;
    audience: string;
    visibility: string;
    authorName: string;
    images: string[];
    audio: string[];
    videos: string[];
    files: string[];
  };
}