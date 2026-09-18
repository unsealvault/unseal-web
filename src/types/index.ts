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
    _id: string;
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
    paymentId?: string;
  };
}

export interface UserLetter {
  _id: string;
  recipientEmail: string;
  encryptedContent: string;
  status: string;
  deliverAt: string;
  createdAt: string;
  audience?: string;
  visibility?: string;
  authorName?: string;
  images?: string[];
  audio?: string[];
  videos?: string[];
  files?: string[]; 
  paymentId?: string;
}
