interface DataObj {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  photoUrl?: string;
  password?: string;
  uid?: string;
}
export class User {
  public firstname: string;
  public lastname: string;
  public password?: string;
  public role: string;
  public email: string;
  public photoUrl?: string;
  public uid: string;
  constructor(obj: DataObj) {
    this.firstname  = obj && obj.firstname || null;
    this.lastname   = obj && obj.lastname || null;
    this.password   = obj && obj.password || null;
    this.email   = obj && obj.email || null;
    this.photoUrl   = obj && obj.photoUrl || null;
    this.role   = obj && obj.role || null;
    this.uid     = obj && obj.uid || null;
  }
}
