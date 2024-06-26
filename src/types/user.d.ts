export type Account = {
  email: string;
  photo: string;
  name: string;
  photoBase64?: bool;
  achievements: Array<{
    title: string;
    description: string;
    date: Date;
  }>;
};
