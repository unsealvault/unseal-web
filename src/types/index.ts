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
}

export interface Capsule {
  _id: string;
  fingerprint: string;
  title: string;
  recipientEmail: string;
  audience: 'self' | 'someone_else';
  visibility: 'private' | 'public_anonymous';
  createdAt: string;
  deliverAt: string;
  targetTimestamp: number;
  totalDurationDays: number;
  remainingDays: number;
  status: 'locked' | 'unsealed';
  hasAttachments: boolean;
  cipherSize: string;
}