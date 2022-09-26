import ReactDOM from "react-dom/client";
import { App } from "./main";
import reportWebVitals from "./reportWebVitals";

import { loadFonts } from "libs/ui";
import { AuthModule } from "shared/auth";

import "libs/ui/styles/index.scss";

loadFonts();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthModule>
    <App />
  </AuthModule>
);

reportWebVitals();
