export const getUpcomingOrders = () => {
    return fetch("https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming")
        .then((response) => response.json())
        .then((resp) => {
            if(resp.status === 200 && resp.result) {
                return resp.result;
            } else {
                return [];
            }
        })
        .catch((error) => console.error(error))
}

export const getOrderDetail = () => {
    return fetch("https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders")
        .then((response) => response.json())
        .then((resp) => {
            if(resp.status === 200 && resp.result) {
                return resp.result;
            } else {
                return [];
            }
        })
        .catch((error) => console.error(error))
}