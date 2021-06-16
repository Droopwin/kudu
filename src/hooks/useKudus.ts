import Kudu from "../types/Kudu";
import KuduFilters from "../types/KuduFilters";

const useKudus = (kudus: Kudu[], filters: KuduFilters): Kudu[] => {
    return kudus.reduce<Kudu[]>((acc, kudu) => {
        // not in selected continent
        if (filters?.continent && filters.continent !== kudu.continent) {
            return acc;
        }
        // not in selected horns type
        if (filters.horns.length && !filters.horns.find(hornType => hornType === kudu.horns)) {
            return acc;
        }
        // not in selected heigth range
        if (filters.heights.max < kudu.height || filters.heights.min > kudu.height) {
            return acc;
        }
        // not in selected weight range
        if (filters.weights.max < kudu.weight || filters.weights.min > kudu.weight) {
            return acc;
        }
        return acc.concat([kudu]);
    }, []);
}

export default useKudus;