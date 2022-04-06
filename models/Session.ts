import { User } from "./User";

export interface ISession {
  uid?: string;
  user?: User;
  keys?: { public: string; private: string };
  server_keys?: { public: string };
}

export interface ISessionState {
  session: ISession;
}
