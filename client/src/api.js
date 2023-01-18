import axios from "axios";

const generateSuccessOutput = (response) => {
    console.log(response);
    return {
        data: response.data.results,
        message: response.data.message,
    }
}

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

export const postRequest = async (query) => {
    try {
        let response = await axios.post("http://localhost:5000", {query});
        return generateSuccessOutput(response);
    } catch (error) {
        return generateErrorOutput(error);
    }
};

