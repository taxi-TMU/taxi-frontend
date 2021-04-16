let serverUrl;

const { NODE_ENV, REACT_APP_SERVER_URL, REACT_APP_LOCAL_SERVER_URL  } = process.env

if (NODE_ENV === 'production') {
    serverUrl = REACT_APP_SERVER_URL
} else {
    serverUrl = REACT_APP_LOCAL_SERVER_URL
}

export default serverUrl;