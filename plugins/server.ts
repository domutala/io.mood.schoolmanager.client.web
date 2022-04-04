import { AxiosResponse, AxiosRequestConfig } from "axios";
import { Plugin } from "@nuxt/types";
import { ISession } from "~/models/Session";

declare module "@nuxt/types" {
  interface Context {
    $server: {
      request: (config?: AxiosRequestConfig) => Promise<AxiosResponse>;
    };
  }
}

const plugin: Plugin = (context) => {
  context.$axios.setBaseURL("http://localhost:6080");

  context.$axios.interceptors.request.use(
    async (config) => {
      config.headers = config.headers || {};
      const session = context.store.getters["session/get"] as ISession;

      const body = config.data;
      config.data = {};

      const params = config.params;
      config.params = {};

      if (!session.keys) {
        session.keys = context.$utils.rsa.generate();
        await context.store.dispatch("session/setKeys", session.keys);
      }

      if (session.server_keys) {
        if (session.uid) {
          const session_id = context.$utils.rsa.encrypt({
            key: session.server_keys.public,
            data: JSON.parse(JSON.stringify(session.uid)),
          });

          config.headers.session_id = JSON.stringify(session_id);
        }

        if (body) {
          config.data.data = context.$utils.rsa.encrypt({
            key: session.server_keys.public,
            data: JSON.stringify(body),
          });
        }

        config.headers.version = context.$utils.rsa.encrypt({
          key: session.server_keys.public,
          data: "0.0.0",
        });

        if (params) {
          for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
              const k = context.$utils.rsa.encrypt({
                key: session.server_keys.public,
                data: key,
              });

              if (params[key]) {
                const v = context.$utils.rsa.encrypt({
                  key: session.server_keys.public,
                  data: JSON.stringify(params[key]),
                });
                config.params[JSON.stringify(k)] = v;
              }
            }
          }
        }
      }

      const public_key = session.keys.public.replace(/\n/gm, "--n--");
      config.headers.public_key = public_key;

      return config;
    },
    (error) => Promise.reject(error)
  );

  context.$axios.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        const session = context.store.getters["session/get"] as ISession;

        if (session.keys) {
          const body = context.$utils.rsa.decrypt({
            key: session.keys.private,
            data: response.data,
          });

          if (body) return JSON.parse(body);
        }
      }

      return null;
    },
    (error) => {
      if (error.response) {
        if (error.response) {
          const session = context.store.getters["session/get"] as ISession;

          if (session.keys) {
            const body = context.$utils.rsa.decrypt({
              key: session.keys.private,
              data: error.response.data,
            });

            if (body) return Promise.reject(JSON.parse(body));
          }
        }
      }

      return Promise.reject(error);
    }
  );

  const request = (config: AxiosRequestConfig = {}): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
      if (config.data && config.data.files) {
        const formData = new FormData();
        const files: File[] = config.data.files;

        if (!config.headers) {
          config.headers = {};
        }

        config.headers["Content-Type"] = "multipart/form-data";

        for (const file of files) {
          formData.append("files", file);
        }

        delete config.data.files;

        for (const key of Object.keys(config.data)) {
          formData.append(key, config.data[key]);
        }

        context.$axios
          .post(config.url as string, formData, config)
          .then((response: AxiosResponse) => resolve(response))
          .catch((err) => reject(err));
      } else {
        context.$axios
          .request(config)
          .then((response: AxiosResponse) => resolve(response))
          .catch((err) => reject(err));
      }
    });
  };

  context.$server = { request };
};

export default plugin;
