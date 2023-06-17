import cors from "cors";

export default (app) => {
    // setup the cors
    /*cors handling*/
    app.use(
        cors({
            origin: true,
            credentials: true,
        })
    );
    app.options("*", cors());
};
