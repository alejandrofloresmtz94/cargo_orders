import classNames from "classnames";
import { CargoType } from "../../types/CargoType";
import './TabSelector.css';

const TabSelector = ({ selectedType, setSelectedType } : any ) => {
    const cargoTypes:CargoType[] = [ {key: 1, desc: ["Upc", "oming"]}, {key: 2, desc: ["Comp", "leted"]}, {key: 3, desc: ["Pas", "t"]} ];
    
    return (
        <div className="flex flex-row justify-between min-w-full mt-12 text-white">
            {
                cargoTypes.map((cargoType:CargoType) =>
                    <button key={cargoType.key} className={classNames({ "btn-active" : cargoType.key === selectedType })} onClick={() => setSelectedType(cargoType.key)}>
                        <span>{cargoType.desc[0]}</span>
                        {cargoType.desc[1]}
                    </button>
                )
            }
        </div>
    );
}

export default TabSelector;