import { TAbout } from "./about.interface";
import { AboutRepositories } from "./about.repository";

const upsertAbout = async (data: TAbout) => {
    const firstItem = await AboutRepositories.findFirstElementId();
    let result;

    if (!firstItem) {
        result = await AboutRepositories.create(data);
    } else {
        result = await AboutRepositories.update(firstItem.id, data);
    }

    return result;
};
const getAbout = async () => {
    const result = await AboutRepositories.findFirst();
    return result
}

export const AboutServices = {
    upsertAbout,
    getAbout
};