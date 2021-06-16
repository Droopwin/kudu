import {HornsType} from "./Kudu";

type KuduFilters = {
    continent?: string;
    weights: { min: number; max: number };
    heights: { min: number; max: number };
    horns: HornsType[];
}

export default KuduFilters;