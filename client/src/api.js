import axios from "axios";

const generateErrorOutput = (error) => {
    if (error.response)
        return {
            error: error,
            title: error.response.statusText,
            code: error.response.status,
            message: error.response.data.message
        }
    else
        return {
            error: error,
            title: error.message,
            code: 1,
            message: "Cannot connect to the server"
        }
}

export const postRequest = async (query, index) => {
    try {
        let response = await axios.post("http://localhost:5000", {query, index});
        return response.data;
    } catch (error) {
        return generateErrorOutput(error);
    }
};

