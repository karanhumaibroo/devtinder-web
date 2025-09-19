//for production

//const BASE_URL="/api";
//export default BASE_URL;


//for local testing
const BASE_URL=  location.hostname==="localhost"  ? "http://localhost:8000" : "/api";
export default BASE_URL;