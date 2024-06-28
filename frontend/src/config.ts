const port="8787"
const url=`http://localhost:${port}`
const isOfline:boolean=true
const netUrl = "https://backend.kumashravan5.workers.dev";
export const BACKEND_URL = isOfline?url:netUrl;
