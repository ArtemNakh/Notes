import INote from "../Note/note.interface";

 interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  notes: INote[];
  isVerified: boolean;
  created_at: Date;
  updated_at: Date;
}

export default IUser;
