import axios from "axios";

import { baseConfig } from "./config";
import { attachErrorInterceptor } from "./errors";
import {
  attachAuthRequestInterceptor,
  attachAuthResponseInterceptor,
} from "./interceptors";

export const publicApi = attachErrorInterceptor(axios.create(baseConfig));

export const authApi = axios.create(baseConfig);

attachAuthRequestInterceptor(authApi);
attachAuthResponseInterceptor(authApi);
attachErrorInterceptor(authApi);
