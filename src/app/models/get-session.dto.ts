export type GetSessionDto = {
  session: Session;
  user: User;
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
