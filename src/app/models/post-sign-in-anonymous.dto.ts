export type PostSignInAnonymousDto = {
  user: User;
  session: Session;
};

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  isAnonymous: boolean;
  role: string;
  banned: boolean;
  banReason: string;
  banExpires: string;
};

type Session = {
  id: string;
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  userAgent: string;
  userId: string;
  impersonatedBy: string;
};
