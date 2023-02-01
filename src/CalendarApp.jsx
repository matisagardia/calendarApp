import { AppRouter } from "./Router/AppRouter"
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store/store";


export const CalendarApp = () => {
  return (
    <>
      <Provider store={store}>

            <HashRouter>
                <AppRouter />
            </HashRouter>

        </Provider>
    </>
  )
}
