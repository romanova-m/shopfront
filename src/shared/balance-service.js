import Configuration from './configuration';

class BalanceService {
    constructor() {
        this.config = new Configuration();
    }
    async retrieveBalance() {
        return fetch(this.config.BALANCE_COLLECTION_URL + "/1", {
            method: "GET",
            mode: "cors",
            headers: {
            }
        })
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            })
            .then(json => {
                console.log("Balance retrieved items:");
                console.log(json);
                const items = [];
                for (let i = 0; i < json.length; i++) {
                    //json[i].link.self.href= json[i].id;
                    items.push(json[i]);
                }
                console.log("Balance retrieved val:", json.val);

                return json.val;
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }
    handleError(error) {
        console.log(error.message);
    }
}

export default BalanceService;