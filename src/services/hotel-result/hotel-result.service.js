import axios from 'axios';

class HotelResultService {
    get() {
        return axios
            .get('https://homework-app.rocketmiles.com/fe-homework/rates')
            .then(response => response.data)
            .catch((error) => {
                let statusCode = error.response.data.status;
                let errorStatus = error.response.data.error;
                let message = error.response.data.message;

                console.error(`${message} Server responded with error code: ${statusCode} (${errorStatus}).`);

                return error.response.data;
            })
    }
}

const hotelResultService = new HotelResultService();

export default hotelResultService;