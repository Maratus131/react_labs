type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Review = {
  id: number | string;
  user: User;
  rating: number;
  comment: string;
  date: string;
};