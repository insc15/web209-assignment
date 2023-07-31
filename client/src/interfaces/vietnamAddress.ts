export interface ICity {
    id:        string;
    code:      string;
    name:      string;
    districts: IDistrict[];
}

export interface IDistrict {
    id:       string;
    name:     string;
    wards:    IStreet[];
    streets:  IStreet[];
    projects: IProject[];
}

export interface IProject {
    id:   string;
    name: string;
    lat:  string;
    lng:  string;
}

export interface IStreet {
    id:     string;
    name:   string;
    prefix: IPrefix;
}

export enum IPrefix {
    Phường = "Phường",
    Phố = "Phố",
    PrefixPhố = "phố",
    PrefixĐường = "đường",
    ThịTrấn = "Thị trấn",
    Xã = "Xã",
    Đường = "Đường",
}
