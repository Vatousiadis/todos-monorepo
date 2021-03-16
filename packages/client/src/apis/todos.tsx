import axios from "axios";

export default axios.create({
    baseURL:
        process.env.REACT_APP_ENV === "DEV"
            ? process.env.REACT_APP_DEV
            : process.env.REACT_APP_PROD,
});
