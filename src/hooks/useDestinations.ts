import { useState, useEffect } from "react"
import { DestinationType } from '../types/DestinationType';

const useDestinations = ( destinations : DestinationType[] ) => {
    const [destinationsFrom, setDestinationsFrom] = useState<String[]>([]);
    const [destinationsTo, setDestinationsTo] = useState<String[]>([]);

    useEffect(() => {
        if(destinations != null) {
            const _destinationAddressFrom:string[] = [];
            const destinationAddressFromArray:any = destinations[0].address.split(",");
            _destinationAddressFrom.push(destinationAddressFromArray.toSpliced(0, 3).join(", "));
            _destinationAddressFrom.push(destinationAddressFromArray.toSpliced(3).join(", "));
            setDestinationsFrom(_destinationAddressFrom);
    
            const _destinationAddressTo:string[] = [];
            const destinationAddressToArray:any = destinations[1].address.split(",");
            _destinationAddressTo.push(destinationAddressToArray.toSpliced(0, 3).join(", "));
            _destinationAddressTo.push(destinationAddressToArray.toSpliced(3).join(", "));
            setDestinationsTo(_destinationAddressTo);    
        }
    }, [destinations])

    return [ destinationsFrom, destinationsTo ];
}

export default useDestinations;