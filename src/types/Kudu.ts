export type HornsType = 'Twisted' | 'Straight' | 'Spiky' | 'Spiraled' | 'Curved' | 'Lyre-shaped';

type Kudu = {
    name: string;
    continent: string;
    weight: number;
    height: number;
    horns: HornsType;
    picture: string;
}

export default Kudu;