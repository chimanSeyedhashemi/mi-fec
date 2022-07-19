
interface Config {
    documentTitle: string;
    DocumentVersion:string
}

const config :Config= {
  documentTitle:  process.env.REACT_APP_NAME||"VManager Demo",
  DocumentVersion: process.env.REACT_APP_VERSION||"",
};


export default config;