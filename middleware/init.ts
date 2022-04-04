import { Middleware } from "@nuxt/types";
import { ISession } from "~/models/Session";

const myMiddleware: Middleware = (context) => {
  if (!["index", "login"].includes(context.route.name as string)) {
    const session = context.store.getters["session/get"] as ISession;

    if (!session.uid) {
      return context.redirect({ name: "index", replace: true });
    }
  }
};

export default myMiddleware;
