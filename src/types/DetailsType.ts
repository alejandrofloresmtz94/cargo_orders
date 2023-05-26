export type DetailsType = {
    reference_number: string;
    order_number: string;
    destinations: any
    driver: DriverType;
    status_list: StatusList;
    status: number;
}

export type DriverType = {
    telephone: string;
    email: string;
    thumbail: string;
}

export type StatusList = {
    pickup: Status[],
    dropoff: Status[]
}

export type Status = {
    active: boolean;
    status: string;
}